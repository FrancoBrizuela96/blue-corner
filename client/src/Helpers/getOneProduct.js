import axios from 'axios';

export const getOneProduct = async (id, nombre) => {
    if(nombre) {
        const {data} = await axios.get(`http://localhost:3001/api/productos/${id}/?Nombre=${nombre}`);
        return data;
    } else {
        const {data} = await axios.get(`http://localhost:3001/api/productos/${id}`)
        return data
    }
}