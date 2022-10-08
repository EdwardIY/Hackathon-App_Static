/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

import styles from '../CSS/store.css';
import "./kit.js"

// UTIL. and initialization
(function () {
  const popTemplate = {
    template: document.getElementById('pPU'),
    backGround: document.getElementById('PU-bg'),
    img: document.getElementById('pImg'),
    name: document.getElementById('pName'),
    price: document.getElementById('pPrice'),
    options: document.getElementById('pOptions'),
    qty: document.getElementById('qty'),
    qtyCount: 1,
    inc: document.getElementById('inc'),
    dec: document.getElementById('dec'),
    add: document.getElementById('add'),
    close: document.getElementById('closepPU'),
  };

  // Open item
  const openTemplate = function (imgSrc, name, price, options) {
    popTemplate.template.classList.add('popTemplate_open');
    popTemplate.backGround.classList.add('popTemplate_active');

    popTemplate.img.src = imgSrc;
    popTemplate.name.textContent = name;
    popTemplate.price.textContent = price;
    popTemplate.options.innerHTML = options;
    popTemplate.qty.textContent = popTemplate.qtyCount;
  };

  // Close Item
  popTemplate.close.addEventListener('click', () => {
    popTemplate.template.classList.remove('popTemplate_open');
    popTemplate.backGround.classList.remove('popTemplate_active');
    popTemplate.qtyCount = 1;
  });

  // Quantity toggle
  (function () {
    popTemplate.inc.addEventListener('click', () => {
      popTemplate.qtyCount += 1;
      popTemplate.qty.textContent = popTemplate.qtyCount;
    });

    popTemplate.dec.addEventListener('click', () => {
      if (popTemplate.qtyCount > 1) {
        popTemplate.qtyCount -= 1;
        popTemplate.qty.textContent = popTemplate.qtyCount;
      }
    });
  }());

  premiumInventory(openTemplate, popTemplate);
  regularInventory(openTemplate, popTemplate);
  cartItems(popTemplate);
}());

// PREMIUM FUNCTIONALITY
async function premiumInventory(openTemplate) {
  const pItems = document.getElementById('pItemsDisplay');

  // Get premiums
  const inventory = await fetch('https://hackathon-store-default-rtdb.firebaseio.com/.json')
    .then((res) => res.json())
    .then((data) => data.premiums);

  // Fill premiums on page load
  (() => {
    Object.keys(inventory).forEach((x) => {
      pItems.innerHTML += `<div id = ${inventory[x].id}>
            <img src="${inventory[x].img}" alt="">
            <span id="itemName">${inventory[x].name}</span>
            <span id="itemprice">${inventory[x].price}</span>
        </div>`;
    });
  })();

  // View premium item
  pItems.addEventListener('click', (e) => {
    const item = e.target.parentElement;
    const selectedItem = Object.keys(inventory).filter((x) => inventory[x].id === item.id);
    openTemplate(
      item.children[0].src,
      item.children[1].textContent,
      item.children[2].textContent,
      inventory[selectedItem].options,
    );
  });
}

// REGULAR INVENTORY FUNCTIONALITY
function regularInventory(openTemplate) {
  const regItemsDisplay = document.getElementById('regInventoryDisplay');
  const regItems = document.getElementById('regItems');
  const gender = document.getElementById('gender');
  const genderOptionDisplay = document.getElementById('pickGender');
  const closeGender = document.getElementById('closeGender');

  // Fill Inventory on gender selection
  genderOptionDisplay.addEventListener('click', (e) => {
    if (e.target.parentElement.id == 'mens' || e.target.id == 'mens') {
      fillInventory('mens', 'Mens');
      viewItem('mens');
    }
    if (e.target.parentElement.id == 'womans' || e.target.id == 'womans') {
      fillInventory('womans', 'Womans');
      viewItem('womans');
    }
  });

  function fillInventory(pickedGender, cat) {
    fetch('https://hackathon-store-default-rtdb.firebaseio.com/.json')
      .then((res) => res.json())
      .then((data) => {
        genderOptionDisplay.style.display = 'none';
        regItemsDisplay.style.display = 'block';
        gender.textContent = cat;
        Object.keys(data[pickedGender]).forEach((x) => {
          regItems.innerHTML += `<div id = ${data[pickedGender][x].id}>
        <img src="${data[pickedGender][x].img}" alt="">
        <span id="itemName">${data[pickedGender][x].name}</span>
        <span id="itemprice">${data[pickedGender][x].price}</span>
    </div>`;
        });
      });
  }

  // Close Inventory
  closeGender.addEventListener('click', () => {
    genderOptionDisplay.style.display = 'flex';
    regItemsDisplay.style.display = 'none';
    regItems.innerHTML = '';
  });

  // View reg item
  async function viewItem(cat) {
    const inventory = await fetch('https://hackathon-store-default-rtdb.firebaseio.com/.json')
      .then((res) => res.json())
      .then((data) => data[cat]);

    regItems.addEventListener('click', (e) => {
      const item = e.target.parentElement;
      console.log(item);
      const selectedItem = Object.keys(inventory).filter((x) => inventory[x].id === item.id);
      openTemplate(
        item.children[0].src,
        item.children[1].textContent,
        item.children[2].textContent,
        inventory[selectedItem].options,
      );
    });
  }
}

// CART FUNCTIONALITY
function cartItems(popTemplate) {
  const template = popTemplate;
  const cartContainer = document.getElementById('cartContainer');
  const cart = document.getElementById('cart');
  const cartCountInput = document.getElementById('cartCountInput');
  const openCart = document.getElementById('openCart');
  const closeCart = document.getElementById('closeCart');
  const checkoutContainer = document.getElementById('checkoutContainer');
  let cartCount = 0;
  const checkoutTotal = document.getElementById('checkoutTotal');
  const addedMsg = document.getElementById('addedMsg');
  const emptyMsg = document.getElementById('emptyMsg');
  let price = 0;

  // Add Item
  template.add.addEventListener('click', () => {
    template.add.style.display = 'none';
    addedMsg.style.display = 'initial';
    setTimeout(() => {
      template.add.style.display = 'initial';
      addedMsg.style.display = 'none';
    }, 1000);
    cartCount += 1;
    cartCountInput.textContent = cartCount;
    emptyMsg.style.opacity = 0;
    // LOCAl MEM---------------------
    cart.innerHTML += `
    <div class="detailsContainer">
    <img src="${popTemplate.img.src}"alt="">
    <div>
        <div class="n">${popTemplate.name.textContent}</div>
        <div class="s">${popTemplate.options.value}</div>
        <div class="p">$${(+popTemplate.price.textContent.slice(1) * popTemplate.qtyCount).toFixed(2)}</div>
        <div class="q">Qty: ${popTemplate.qtyCount} </div>
    </div>
    <div class="remove">REMOVE</div>
</div>`;
  });

  // Remove Item
  template.add.addEventListener('click', () => {
    document.querySelectorAll('.remove').forEach((x) => {
      x.addEventListener('click', () => {
        cartCount -= 1;
        if (cartCount > 0) cartCountInput.textContent = cartCount;
        else {
          emptyMsg.style.opacity = '.3';
          cartCountInput.textContent = '';
        }
        price -= +x.previousElementSibling.children[2].textContent.slice(1);
        // console.log(+x.previousElementSibling.children[2].textContent.slice(1));
        // console.log(price);
        checkoutTotal.textContent = `Total: $${price.toFixed(2)}`;
        x.parentElement.remove();
      });
    });
  });

  // Open Cart
  openCart.addEventListener('click', () => {
    cartContainer.style.right = '0px';
    checkoutContainer.style.right = '0px';
  });

  // Close Cart
  closeCart.addEventListener('click', () => {
    cartContainer.style.right = '-550px';
    checkoutContainer.style.right = '-550px';
  });

  // Update cart total
  template.add.addEventListener('click', () => {
    price += +cart.children[cart.children.length - 1].children[1].children[2].textContent.slice(1);
    checkoutTotal.textContent = `Total: $${price.toFixed(2)}`;
  });
}
