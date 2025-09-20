import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

/*loadHeaderFooter();*/
loadHeaderFooter('../partials/');

const shoppingCart = new ShoppingCart('so-cart', '.product-list');
shoppingCart.init();