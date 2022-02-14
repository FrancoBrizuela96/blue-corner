# blue-corner
Prueba técnica  

Insertar el .sql en su database y ejecutar la query  
Crear un file .env dentro de la ruta blue-corner/api con el siguiente formato:   
  
 DATABASE=bluecorner  
 DB_USER=*Nombre de usuario de la database*  
 PASSWORD=*Password de la database*  
 DB_HOST=*Hostname de la database*  
 PORT=*Puerto donde queremos que corra el backend*    
   
   
-Ingresar los datos de su database en .env  
-Ejecutar npm install al proyecto  

- Correr el comando npm start en:  
- blue-corner/api para el backend  
- blue-corner/client para el frontend  

- Al hacer click en Agregar Producto se abrirá un modal de creación, en el cual el único campo obligatorio sera su Nombre.  
- Al hacer click en un producto se abrirá un modal permitiendo modificarle cualquiera de sus propiedades, ya sea su nombre o agregar/sacar categorías.  
- Se pueden eliminar los productos y sus categorías haciendo click en su botón rojo con una X.  

