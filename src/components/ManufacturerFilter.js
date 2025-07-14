import { CartContext } from "../context/CartContext.js";
import { getElementsFromDOM } from "../utils/getElementsFromDOM.js";
import { renderProducts } from "./Products.js";

export const createManufacturerFilter = () => {
    const { manufacturerSelect } = getElementsFromDOM();
    const { products } = CartContext;
    const manufacturers = [...new Set(products.map(product => product.manufacturer))].sort();

    manufacturers.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        manufacturerSelect.appendChild(option);
    });

    manufacturerSelect.value = new URL(window.location).searchParams.get('manufacturer') || '';

    manufacturerSelect.addEventListener('change', (event) => {
        const selected = event.target.value;
        const url = new URL(window.location);
        selected ? url.searchParams.set('manufacturer', selected) : url.searchParams.delete('manufacturer');
        window.history.replaceState({}, '', url);
        renderProducts();
    });
}