
import "./kit.js"

// UTIL. and initialization
(function () {
  const popTemplate = {
    template: document.getElementById('pPU') as HTMLElement,
    backGround: document.getElementById('PU-bg') as HTMLElement,
    img: document.getElementById('pImg') as HTMLImageElement,
    name: document.getElementById('pName') as HTMLElement,
    price: document.getElementById('pPrice') as HTMLElement,
    options: document.getElementById('pOptions') as HTMLSelectElement,
    qty: document.getElementById('qty')as HTMLSelectElement,
    qtyCount: 1,
    inc: document.getElementById('inc')as HTMLSelectElement,
    dec: document.getElementById('dec')as HTMLSelectElement,
    add: document.getElementById('add')as HTMLSelectElement,
    close: document.getElementById('closepPU')as HTMLSelectElement,
  };

  // Open item
  function openTemplate(imgSrc:string, name:string, price:string, options:string) {
    popTemplate.template.classList.add('popTemplate_open');
    popTemplate.backGround.classList.add('popTemplate_active');

    popTemplate.img.src = imgSrc;
    popTemplate.img.alt = name;
    popTemplate.name.textContent = name;
    popTemplate.price.textContent = price;
    popTemplate.options.innerHTML = options;
    popTemplate.qty.textContent = popTemplate.qtyCount.toString();
  }

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
      popTemplate.qty.textContent = popTemplate.qtyCount.toString();
    });

    popTemplate.dec.addEventListener('click', () => {
      if (popTemplate.qtyCount > 1) {
        popTemplate.qtyCount -= 1;
        popTemplate.qty.textContent = popTemplate.qtyCount.toString();
      }
    });
  }());

  premiumInventory(openTemplate);
  regularInventory(openTemplate);
  cartItems(popTemplate);
}());

// PREMIUM FUNCTIONALITY
async function premiumInventory(openTemplate: { (imgSrc: string, name: string, price: string, options: string): void; (arg0: any, arg1: any, arg2: any, arg3: any): void; }) {
  const pItems = document.getElementById('pItemsDisplay') as HTMLElement;

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
  pItems.addEventListener('click', (e:any) => {
    const item = e.target.parentElement;
    const selectedItem = Object.keys(inventory).filter((x) => inventory[x].id === item.id);
    openTemplate(
      item.children[0].src,
      item.children[1].textContent,
      item.children[2].textContent,
      inventory[selectedItem[0]].options,
    );
  });
}

// REGULAR INVENTORY FUNCTIONALITY
function regularInventory(openTemplate:any) {
  const regItemsDisplay = document.getElementById('regInventoryDisplay') as HTMLElement;
  const regItems = document.getElementById('regItems') as HTMLElement;
  const gender = document.getElementById('gender') as HTMLElement;
  const genderOptionDisplay = document.getElementById('pickGender') as HTMLElement;
  const closeGender = document.getElementById('closeGender') as HTMLElement;

  // Fill Inventory on gender selection
  genderOptionDisplay.addEventListener('click', (e:any) => {
    if (e.target.parentElement.id == 'mens' || e.target.id == 'mens') {
      fillInventory('mens', 'Mens');
      viewItem('mens');
    }
    if (e.target.parentElement.id == 'womans' || e.target.id == 'womans') {
      fillInventory('womans', 'Womans');
      viewItem('womans');
    }
  });

  function fillInventory(pickedGender:string, cat:string) {
    fetch('https://hackathon-store-default-rtdb.firebaseio.com/.json')
      .then((res) => res.json())
      .then((data) => {
        genderOptionDisplay.style.display = 'none';
        regItemsDisplay.style.display = 'block';
        gender.textContent = cat;
        Object.keys(data[pickedGender]).forEach((x) => {
          regItems.innerHTML += `<div id = ${data[pickedGender][x].id}>
        <img src="${data[pickedGender][x].img}" alt=${data[pickedGender][x].name}>
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
  async function viewItem(cat:string) {
    const inventory = await fetch('https://hackathon-store-default-rtdb.firebaseio.com/.json')
      .then((res) => res.json())
      .then((data) => data[cat]);

    regItems.addEventListener('click', (e:any) => {
      const item = e.target.parentElement;
      const selectedItem = Object.keys(inventory).filter((x) => inventory[x].id === item.id);
      openTemplate(
        item.children[0].src,
        item.children[1].textContent,
        item.children[2].textContent,
        inventory[selectedItem[0]].options,
      );
    });
  }
}

// CART FUNCTIONALITY
interface PopTemplateFormat {
    template: HTMLElement;
    backGround:HTMLElement;
    img: HTMLImageElement;
    name:HTMLElement;
    price:HTMLElement;
    options:HTMLSelectElement;
    qty:HTMLElement;
    qtyCount: number,
    inc:HTMLElement;
    dec:HTMLElement;
    add:HTMLElement;
    close: HTMLElement;
  }

function cartItems(popTemplate:PopTemplateFormat) {
  const template = popTemplate;
  const cartContainer = document.getElementById('cartContainer') as HTMLElement;
  const cart = document.getElementById('cart') as HTMLElement;
  const cartCountInput = document.getElementById('cartCountInput') as HTMLElement;
  const openCart = document.getElementById('openCart') as HTMLElement;
  const closeCart = document.getElementById('closeCart') as HTMLElement;
  const checkoutContainer = document.getElementById('checkoutContainer') as HTMLElement;
  let cartCount = 0;
  const checkoutTotal = document.getElementById('checkoutTotal') as HTMLElement;
  const addedMsg = document.getElementById('addedMsg') as HTMLElement;
  const emptyMsg = document.getElementById('emptyMsg') as HTMLElement;
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
    cartCountInput.textContent = cartCount.toString();
    emptyMsg.style.opacity = '0';
    // LOCAl MEM---------------------
    cart.innerHTML += `
    <div class="detailsContainer">
    <img src="${template.img.src}"alt=${template.name.textContent}>
    <div>
        <div class="n">${template.name.textContent}</div>
        <div class="s">${template.options.value}</div>
        <div class="p">$${(+template.price.textContent!.slice(1) * template.qtyCount).toFixed(2)}</div>
        <div class="q">Qty: ${popTemplate.qtyCount} </div>
    </div>
    <button class="remove">REMOVE</button>
</div>`;
  });

  // Remove Item
  template.add.addEventListener('click', () => {
    document.querySelectorAll('.remove').forEach((x) => {
      x.addEventListener('click', () => {
        cartCount -= 1;
        if (cartCount > 0) cartCountInput.textContent = cartCount.toString();
        else {
          emptyMsg.style.opacity = '.3';
          cartCountInput.textContent = '';
        }
        price -= +x.previousElementSibling!.children[2].textContent!.slice(1);
        checkoutTotal.textContent = `Total: $${price.toFixed(2)}`;
        x.parentElement!.remove();
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
    price += +cart.children[cart.children.length - 1].children[1].children[2].textContent!.slice(1);
    if(price.toString()[0] === '-') price *= -1;
    checkoutTotal.textContent = `Total: $${price.toFixed(2)}`;
  });
}
