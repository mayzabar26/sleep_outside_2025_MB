import { setLocalStorage, getLocalStorage } from './utils.mjs';

function productDetailsTemplate(product) {
  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetailsHtml();
  }

  renderProductDetailsHtml() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = productDetailsTemplate(this.product);

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCartHandler.bind(this));
  }

  /*addProductToCart(product) {
    let cart = getLocalStorage('so-cart');
    console.log(typeof(cart), cart)
    if (!cart) {
      cart = [];
    } else{
      cart.push(product);
    }
    setLocalStorage('so-cart', cart);
  }*/

  addProductToCart(product) {
    let cart = getLocalStorage('so-cart');
    console.log(typeof(cart), cart)
    if (!cart) {
      cart = [];
    } 
    product.FinalPrice = parseFloat(product.FinalPrice);

    product.Quantity = 1;
    cart.push(product);

    setLocalStorage('so-cart', cart);
  }

  addToCartHandler() {
    this.addProductToCart(this.product);

    const messageCart = document.createElement("p");
    messageCart.textContent = 'Item added to cart!';
    messageCart.classList.add('add-to-cart-message');

    document.getElementById('addToCart').after(messageCart);

    setTimeout(() => {
      messageCart.remove();
    }, 3000);
  }
}