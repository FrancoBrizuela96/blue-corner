import axios from 'axios';
import './Card.css';

export function Card({producto, setProductos, modalVisible}) {
    const {Id_producto, Nombre} = producto;

    const deleteProduct = async (id) => {
      const {status} = await axios.delete(`http://localhost:3001/api/productos/${id}`)
      if(status === 200) {
        setProductos( productos => productos.filter( product => product.Id_producto !== id))
      }
    }
    return (
      <div className='card__container' onClick={ () => {
          modalVisible(Id_producto, Nombre);
      }}>
          <div className='card'>
              <p 
                className='card__title'  
              >
                {Nombre}
              </p>
                <span 
                  className='boton__cerrar' 
                  onClick={(event) => {
                    event.stopPropagation()
                    deleteProduct(Id_producto)}
                  }
                >
                  X
                </span>
          </div>
      </div>
    )
  };
  
  export default Card;