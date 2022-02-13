import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Helpers/Cards/Card';
import { getAllproducts } from './Helpers/getAllproducts.js';
import { Modal } from './Helpers/Modal/Modal';

function App() {
  const [productos, setProductos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getAllproducts().then( allProducts => {
      console.log(allProducts)
      setProductos(allProducts)
    })
  }, [])
  
  return (
    <div className='container'>
      <div className='products__container'>
        <h1>Productos</h1>  
        <button onClick={() => setIsVisible(!isVisible)}>Agregar Producto</button>
        <div>
          { productos && productos?.map( producto => {
            return (
              <Card key={producto.Id_producto} producto={producto}/>
            )
          })}
          <Modal isVisible={isVisible} setIsvisible={setIsVisible}/>
        </div>
      </div>
    </div>
  );
}

export default App;
