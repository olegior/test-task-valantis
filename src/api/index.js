import axios from "axios";
import md5 from "md5";

const password = import.meta.env.VITE_API_PASSWORD;
const baseURL = import.meta.env.VITE_BASE_URL;


const generatePassword = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return md5(`${password}_${date}`)
};

const api = axios.create({
    baseURL,
    headers: { 'X-Auth': generatePassword() }
})

export const getData = async (action, params) => {
    try {
        const response = await api.post('', { action, params })
        if (response.status === 200)
            return response.data.result;
        return []
    }
    catch (error) {
        if (error.response.status == 500) {
            console.log('Error ID:', error.response.data);
        }
    }
}

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