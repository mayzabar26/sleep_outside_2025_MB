import { getLocalStorage, qs, formDataToJSON } from "./utils.mjs";
import ExternalServices from './ExternalServices.mjs';

//Variables for the calculations
const TAX_RATE = 0.06;
const SHIPPING_BASE = 10;
const SHIPPING_ADDITIONAL_ITEM = 2;
const CART_KEY = 'so-cart';

//Week 04 assignment
export default class CheckoutProcess {
    constructor(outputSelector, externalServices) {
        this.list = getLocalStorage(CART_KEY) || [];
        this.outputSelector = outputSelector;
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.externalServices = externalServices;
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

    packageItems(items) {
        return items.map(item => ({
            id: item.Id,
            name: item.Name,
            price: parseFloat(item.FinalPrice),
            quantity: parseInt(item.Quantity || 1)
        }));
    }

    async checkout(form) {
        const jsonFormData = formDataToJSON(form);
        const orderPayload = {
            //form data
            ...jsonFormData,

            //Calculated data
            items: this.packageItems(this.list),
            orderTotal: this.orderTotal.toFixed(2),
            shipping: this.shipping.toFixed(2),
            tax: this.tax.toFixed(2),

            //fixed data
            orderDate: new Date().toISOString(),
        };

        orderPayload.items.forEach(item => {
        });

        //Send to ExternalServices
        try {
            const response = await this.externalServices.checkout(orderPayload);
            console.log('Request submitted successfully:', response);
            //NEXT ACTIVITY: HANDLE SUCCESS/FAIL HERE
            return response;
        } catch (error) {
            console.error('Checkout Error:', error);
            throw error;
        }
    }

    init() {
        this.calculateAndDisplaySubtotal();
        this.calculateAndDisplayTotals();
        qs('#zip').addEventListener('blur', this.calculateAndDisplayTotals.bind(this));
    }
}