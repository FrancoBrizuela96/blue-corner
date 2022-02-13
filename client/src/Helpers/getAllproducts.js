import axios from 'axios';

export const getAllproducts = async () => {
    const {data} = await axios('http://localhost:3001/api/productos');
    return data;
}