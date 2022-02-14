import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Modal.css';

export const Modal = ({isVisible, setIsvisible, setProductos, ProductContext}) => {
    const {Id_producto, Nombre, Etiquetas} = useContext(ProductContext);
    const [input, setInput] = useState({
        name: Nombre || '',
        categories: []
    });
    const [category, setCategory] = useState('');

    useEffect(() => {
        if(Nombre) {
            setInput({
                name: Nombre,
                categories: Etiquetas.map( etiqueta => etiqueta.etiquetaNombre)
            })
        }
    }, [Id_producto, Nombre, Etiquetas]);
    
    const handleSubmitCategory = (event) => {
        event.preventDefault();
        setInput({
            ...input,
            categories: [...input.categories, category]
        });
        setCategory('');
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    const handleDeleteCategory = async (name) => {
            setInput({
                ...input,
                categories: input.categories.filter(category => category !== name)
            })
    }

    const addProductWithCategories = async () => {
        let newProduct = {};

        if (!input.name) {
            alert('Debes ingresar el nombre del Producto');
            return
        } 
        if(Id_producto > 0) {
            console.log('Entrando con idProducto: ')
            const {data} = await axios.put(`http://localhost:3001/api/productos/${Id_producto}`, {
                newName: input.name,
                etiquetas: input.categories 
            });
            console.log(data)
            newProduct = {
                Nombre: data.Nombre,
                Id_producto: data.Id_producto
            };
        } else {
            console.log('Entrando sin idProducto')
            const {data} = await axios.post('http://localhost:3001/api/productos/', {
                Nombre: input.name,
                etiquetas: input.categories
            });
            console.log(data)
            const {Nombre, Id_producto} = data;
            newProduct = {
                Nombre,
                Id_producto
            };
            setProductos(allProducts => [...allProducts, newProduct ]);
        }
        setIsvisible(!isVisible)
        setInput({
            name: '',
            categories: []
        }); 
        setCategory('');
    }

    const closeModal = () => {
        setIsvisible(!isVisible);
        setInput({
            name: '',
            categories: []
        });
        setCategory('');
    }
    const stopPropagationClick = e => e.stopPropagation();
    
    return (
        <div className={`modal ${isVisible && "is-open"}`} onClick={closeModal}>
            <div className='modal__container' onClick={stopPropagationClick}>
                <button className='modal__close' onClick={closeModal}>X</button>
                <h1>Agregar un Producto</h1>
                <div className='form__container'>
                        <div>
                            <label className='labels '>Nombre del producto:</label>
                            <input 
                                className='inputs ' 
                                type='text' 
                                value={input.name} 
                                name='name' 
                                onChange={handleInputChange} 
                                placeholder='Nombre del producto...'
                            />
                        </div>
                        <div>
                            <form onSubmit={handleSubmitCategory}>
                                <label className='labels '>Añadir categoria:</label>
                                <input 
                                    className='inputs'
                                    value={category}
                                    onChange={handleCategoryChange}
                                    type='text' 
                                    name='categories' 
                                    placeholder='Escribe la categoria...'
                                />
                                <button className='add__category' type='submit'>Agregar</button>
                            </form>
                        </div>
                    <div className='categories__section'>
                        {
                            input.categories.length > 0 && input.categories.map( (category, index) => {
                                return (
                                    <div className='category__container' key={index}>
                                            <ul>{category}<button className='button__delete' onClick={() => handleDeleteCategory(category)}>X</button></ul>
                                    </div>
                                )
                            }) 
                        }
                    </div>
                    <div style={{height: 60, padding: 10, position: 'relative'}}>
                        <button className='save__product' onClick={addProductWithCategories}>Guardar Producto</button>
                    </div>
                </div>
            </div>    
        </div>
        
    )
}
