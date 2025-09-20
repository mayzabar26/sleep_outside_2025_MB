import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

//Get product ID
const productId = getParam('product');

const dataSource = new ProductData();

//Create instance from the ProductDetails class
const product = new ProductDetails(productId, dataSource);
product.init();