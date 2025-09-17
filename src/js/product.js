import { getParam, setLocalStorage, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

//Get product ID
const productId = getParam('product');

function addProductToCart(product) {
  //step 1: Get cart with current localStorage
  let cart = getLocalStorage('so-cart');

  //step 2: Verify if cart alredy exists
  if (cart === null) {
    //If the cart doesn't have any product on it, create a new array and add product
    cart = [product];
  } else {
    //If the cart has product on it, add new product to the array
    cart.push(product);
  }

  //step 4: Save cart to the localStorage
  setLocalStorage('so-cart', cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);

  //Message when adding product to the cart
  const messageCart = document.createElement("p");
  messageCart.textContent = 'Item added to cart!';
  messageCart.classList.add('add-to-cart-message');

  //Add message to the page after adding item to the cart
  document.getElementById('addToCart').after(messageCart);

  //Remove message after 3 seconds
  setTimeout(() => {
    messageCart.remove();
  }, 3000);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);

loadHeaderFooter();