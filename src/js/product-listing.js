import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

/*loadHeaderFooter('../partials/');*/
loadHeaderFooter('../partials/');

const category = getParam('category');
const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();
const heading = document.querySelector('h2');
heading.innerHTML = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

