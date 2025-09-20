import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="../product_pages/index.html?product=${product.Id}&category=${product.Category}">
    <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p>
  </a>
</li>`;
}

//Export ProductList
export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement; 
    }
    
    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }

    //Method to render the list
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}