import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

/*loadHeaderFooter();*/
loadHeaderFooter('../partials/');

//Start checkout process
const checkoutProcess = new CheckoutProcess('.order-summary');
checkoutProcess.init();

//FUTURE EVENT LISTENER TO SUBMIT FORM
//qs('#checkout-form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     //shipping logic will be here
// });