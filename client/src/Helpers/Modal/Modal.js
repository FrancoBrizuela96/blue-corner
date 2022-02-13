import { useState } from 'react';
import './Modal.css';

export const Modal = ({isVisible, setIsvisible}) => {

    const [input, setInput] = useState({
        name: '',
        category: ['hola','television', 'computacion', 'computacion', 'computacion', 'computacion', 'computacion', 'computacion']
    })

    const handleInputCategory = (e) => {
        if(!input.category.includes(e.target.value)) {
            setInput({
              ...input,
              diets: [...input.category, e.target.value]
            })
          }
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleDeleteCategory = (e) => {

    }

    const closeModal = () => {
        setIsvisible(!isVisible)
    }
    const stopPropagationClick = e => e.stopPropagation()
    
    return (
        <div className={`modal ${isVisible && "is-open"}`} onClick={closeModal}>
            <div className='modal__container' onClick={stopPropagationClick}>
                <button className='modal__close' onClick={closeModal}>X</button>
                <h1>Agregar un Producto</h1>
                <div className='form__container'>
                    <form>
                        <div>
                            <label className='label__nombre'>Nombre del producto:</label>
                            <input 
                                className='input__nombre' 
                                type='text' 
                                value={input.name} 
                                name='name' 
                                onChange={handleInputChange} 
                                placeholder='Nombre del producto...'
                            />
                        </div>
                        <div>
                            <label className='label__nombre'>Añadir categoria:</label>
                            <input 
                                className='input__nombre' 
                                type='text' 
                                // value={input.category} 
                                name='category' 
                                onChange={handleInputCategory} 
                                placeholder='Escribe la categoria...'
                            />
                            <button className='save__product'>Guardar Producto</button>
                        </div>
                    </form>
                    <div className='categ'>
                        {
                            input.category.length > 0 && input.category.map(category => {
                                return (
                                    <div className='category__container'>
                                            <ul>{category}<button className='button__delete' onClick={handleDeleteCategory}>X</button></ul>
                                    </div>
                                )
                            }) 
                        }
                    </div>
                </div>
            </div>    
        </div>
        
    )
}
