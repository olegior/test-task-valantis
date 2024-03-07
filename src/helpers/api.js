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
        return response.data.result;
    }
    catch (error) {
        if (error.response.status == 500) {
            console.log('Error ID:', error.response.data);
        }
    }
}

