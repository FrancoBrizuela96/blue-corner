import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Cards/Card';
import { getAllproducts } from './Helpers/getAllProducts.js';
import { getOneProduct } from './Helpers/getOneProduct';
import { Modal } from './Components/Modal/Modal';

const ProductContext = createContext()

function App() {
  const [productos, setProductos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentProducto, setCurrentProducto] = useState({})

  const modalVisible = (id, nombre) => {
    getOneProduct(id, nombre).then(product => setCurrentProducto(product))
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    getAllproducts().then( allProducts => {
      setProductos(allProducts)
    })
  }, [])

  return (
    <div className='container'>
      <div className='products__container'>
        <h1>Productos</h1>  
        <button onClick={() => modalVisible()}>Agregar Producto</button>
        <ProductContext.Provider value={currentProducto} >
          <div className='all__cards'>
            { productos && productos?.map( producto => {
              return (
                <Card 
                  key={producto.Id_producto} 
                  producto={producto} 
                  setProductos={setProductos} 
                  modalVisible={modalVisible}
                />
              )
              })}
              <Modal 
                isVisible={isVisible} 
                setIsvisible={setIsVisible} 
                setProductos={setProductos}
                ProductContext={ProductContext}
              />
          </div>
        </ProductContext.Provider>
      </div>
    </div>
  );
}

export default App;
