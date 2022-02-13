import './Card.css'

export function Card({producto}) {
    return (
      <div className='card__container'>
          <div className='card'>
              <p className='card__title'>{producto.Nombre}</p>
              <span className='boton__cerrar'>X</span>
          </div>
      </div>
    )
  };
  
  export default Card;