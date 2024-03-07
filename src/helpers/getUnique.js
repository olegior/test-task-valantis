export const getUnique = (products) => {
    const map = new Map();
    const filtered = products.filter(product => {
        const item = product?.id ? product.id : product;
        if (item === null)
            return false;
        if (map.get(item))
            return false;
        map.set(item, item);
        return true;
    })
    return filtered;
}