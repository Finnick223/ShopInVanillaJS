// creating map from crat data to group products in cart by manufacturer
export const groupByManufacturer = (cartData) => {
    const map = new Map();
    for (const item of cartData) {
        const { manufacturer, ...rest } = item;
        if (!map.has(manufacturer)) {
            map.set(manufacturer, { manufacturer, items: [] });
        }
        map.get(manufacturer).items.push(rest);
    }
    return Array.from(map.values());
};