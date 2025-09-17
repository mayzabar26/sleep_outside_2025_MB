import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
       src='${item.Image}'
       src='${item.Name}'
       />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: 1</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
    constructor(key, cartElementSelector) {
        this.key = key;
        this.cartElement = document.querySelector(cartElementSelector);
    }

    init() {
        const list = getLocalStorage(this.key);
        this.renderCart(list);
    }

    renderCart(list) {
        if(list.length > 0) {
            renderListWithTemplate(cartItemTemplate, this.cartElement, list);
        } else {
            this.cartElement.innerHTML = '<p>Your cart is empty.</p>';
        }
    }
}