import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
       src='${item.Image}'
       alt='${item.Name}'
       />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: ${item.Quantity}</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
    constructor(key, cartElementSelector) {
        this.key = key;
        this.cartElement = document.querySelector(cartElementSelector);
        this.totalElement = document.querySelector('.cart-total');
        this.cartFooterElement = document.querySelector('.cart-footer');
    }

    init() {
        const list = getLocalStorage(this.key) || [];
        this.renderCart(list);
    }

    renderCart(list) {
        if(list.length > 0) {
            renderListWithTemplate(cartItemTemplate, this.cartElement, list);
            this.calculateAndDisplayTotal(list);
            this.cartFooterElement.classList.remove('hide');
        } else {
            this.cartElement.innerHTML = '<p>Your cart is empty.</p>';
            this.cartFooterElement.classList.add('hide');
        }
    }

    //week 04 - team activity
    calculateAndDisplayTotal(list) {
        const total = list.reduce((acc, item) => {
            const price = Number(String(item.FinalPrice).replace('$', '')) || 0;
            const quantity = Number(item.Quantity) || 0;
            return acc + price * quantity;
        }, 0);
        
        this.totalElement.textContent = `$${total.toFixed(2)}`;
    }
}