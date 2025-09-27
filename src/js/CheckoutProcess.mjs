import { getLocalStorage, qs } from "./utils.mjs";

//Variables for the calculations
const TAX_RATE = 0.06;
const SHIPPING_BASE = 10;
const SHIPPING_ADDITIONAL_ITEM = 2;
const CART_KEY = 'so-cart';

export default class CheckoutProcess {
    constructor(outputSelector) {
        this.list = getLocalStorage(CART_KEY) || [];
        this.outputSelector = 0;
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    calculateAndDisplaySubtotal() {
        if (!this.list || this.list.length === 0) {
            this.itemTotal = 0;
        } else {
            this.itemTotal = this.list.reduce((acc, item) => 
            acc + (parseFloat(item.FinalPrice) * parseInt(item.Quantity || 1)), 0);
        }
        qs('#subtotal').textContent = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateAndDisplayTotals() {
        const totalItems = this.list.reduce((acc, item) => acc + parseInt(item.Quantity || 1), 0);
        if (totalItems > 0) {
            this.shipping = SHIPPING_BASE + (totalItems - 1) * SHIPPING_ADDITIONAL_ITEM;
        } else {
            this.shipping = 0;
        }

        this.tax = this.itemTotal * TAX_RATE;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        qs('#tax').textContent = `$${this.tax.toFixed(2)}`;
        qs('#shipping').textContent = `$${this.shipping.toFixed(2)}`;
        qs('#orderTotal').textContent = `$${this.orderTotal.toFixed(2)}`;
    }

    init() {
        this.calculateAndDisplaySubtotal();
        this.calculateAndDisplayTotals();
        qs('#zip').addEventListener('blur', this.calculateAndDisplayTotals.bind(this));
    }
}