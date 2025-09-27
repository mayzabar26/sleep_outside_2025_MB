import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

/*loadHeaderFooter();*/
loadHeaderFooter('../partials/');

//Get product ID
const productId = getParam('product');

const dataSource = new ExternalServices();

//Create instance from the ProductDetails class
const product = new ProductDetails(productId, dataSource);
product.init();