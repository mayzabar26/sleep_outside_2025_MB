import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter('../partials/');

//Start external service
const externalServices = new ExternalServices();

//Start checkout process
const checkoutProcess = new CheckoutProcess('.order-summary', externalServices);
checkoutProcess.init();

//Adding event listener to submit form
const checkoutForm = qs('#checkout-form');
checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await checkoutProcess.checkout(checkoutForm);
});