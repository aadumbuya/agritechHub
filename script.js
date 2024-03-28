let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let newProducts = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    

        
        if(products.length > 0) 
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2 style="font-size: 25px">${product.name}</h2>
                <div class="price">$${product.price}/1kg</div>
                <div class="description">${product.producer}</div>
                <input type="number" class="quantityInput" placeholder="Qnty" id="quantityInput-${product.id}" />
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
    const addToCart = (product_id) => {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        const quantityInput = document.getElementById(`quantityInput-${product_id}`);
        if(cart.length <= 0){
            cart = [{
                product_id: product_id,
                quantity: parseInt(quantityInput.value) || 1  
            }];
        } else if(positionThisProductInCart < 0){
            cart.push({
                product_id: product_id,
                quantity: parseInt(quantityInput.value) || 1  
            });
        } else {
            cart[positionThisProductInCart].quantity += parseInt(quantityInput.value) || 1;
        }
        addCartToHTML();
        addCartToMemory();
    }
    
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = calculateTotalPrice();
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
                <div class="remove">Remove</div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    } else if (positionClick.classList.contains('remove')) {
        let product_id = positionClick.parentElement.dataset.id;
        removeProductFromCart(product_id);
    }
});

const removeProductFromCart = (product_id) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        cart.splice(positionItemInCart, 1);
    }
    addCartToHTML();
    addCartToMemory();
}

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.getElementById('menuButton');
  const menuContent = document.getElementById('menuContent');

  // Toggle the 'show' class to display or hide the menu
  menuButton.addEventListener('click', function () {
    menuContent.classList.toggle('show');
  });

  // Close the menu if the user clicks outside of it
  window.addEventListener('click', function (event) {
    if (!event.target.matches('#menuButton')) {
      if (menuContent.classList.contains('show')) {
        menuContent.classList.remove('show');
      }
    }
  });
});


const initApp = () => {
   
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
            const totalPrice = calculateTotalPrice();
            localStorage.setItem('totalPrice', JSON.stringf)
        }
    })
    
}
initApp();

function redirectToPayment() {
    window.location.href = "payment.html";
    alert('Redirecting to payment page...');
}
const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            totalPrice += info.price * item.quantity;
        });
    }
    return totalPrice;
};

function cartCheckout() {    
    if (cart.length > 0) {
        var total = calculateTotalPrice();
        localStorage.removeItem('cart');
        localStorage.setItem('totalPrice', total);
        window.location.href = "payment.html";
        alert('Checkout successful!');
    }
    else {
        alert('Cart is empty!');
    }
}


function showNotification(message, type) {
    
    var notification = document.createElement("div");
    notification.className = "notification " + type;
    notification.innerHTML = message;
  
   
    document.getElementById("notifications-container").appendChild(notification);
  
   
    setTimeout(function () {
      notification.remove();
    }, 5000); 
  }
  
  
  function simulateNewProductArrival() {
   
    var productName = "Now Apples ";
    var message = productName + " has just arrived! Check it out now.";
    showNotification(message, "info");
  }
  
 
  function simulatePromotion() {
   
    var promotionMessage = "Limited-time offer: 20% off on all items!";
    showNotification(promotionMessage, "success");
  }
  
  
  function simulateSpecialEvent() {
   
    var eventMessage = "Join us for our exclusive in-store event tomorrow!";
    showNotification(eventMessage, "warning");
  }
  
 
  simulateNewProductArrival();
  simulatePromotion();
  simulateSpecialEvent();
 



document.addEventListener("DOMContentLoaded", function () {
    const userProfile = document.querySelector(".user-profile");
  
    function getUserInfo() {
      return {
        username: "Ruth Uwamahoro", 
      };
    }
  
    function updateProfile() {
      const userInfo = getUserInfo();
      userProfile.innerHTML = `
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <span>${userInfo.username}</span>
      `;
    }
  
    
    updateProfile();
  });
  

