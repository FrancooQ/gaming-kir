// Funcion para guardar el storage y pintar el carrito
// Tiene que recibir el array de objetos por parametros.

const pintarCarrito = (carrito) => {
    const modalContainer = document.getElementById("modal-container");
    // Limpio el carrito
    modalContainer.innerHTML = "";

    // Le paso un display para poder cerrar y abrir
    modalContainer.style.display = "flex";
    
    const modalHeader = document.createElement("div");
        
    // Creo la parte superior del modal
    modalHeader.className = "modal-header"
        
    // Le doy clase y luego inyecto HTML
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    
    // Coloco todo lo creado en el html bajo la clase modal-container  
    modalContainer.append(modalHeader);
    // Creo una cruz para cerrar el Modal
    const modalCerrar = document.createElement("a");
    modalCerrar.className = "bi bi-x-lg modal-header-button";

    
    // Cerramos el carrito
    modalCerrar.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
  
    modalHeader.append(modalCerrar);
    
    // Recorro el vector
    carrito = obtenerCarritoStorage();

    carrito.forEach((product) => {
        // Utilizo Desestructuración
        const {img,nombre,precio,cantidad,id} = product;
        // Creo el contenido del carrito
        let carritoContent = document.createElement("div");
        // Pinto el carrito
        carritoContent.className="modal-content";
        carritoContent.innerHTML= `
        <img src="${img}">
        <h3>${nombre}</h3>
        <p>Precio: $ ${precio}</p> 
        <p>Cantidad: ${cantidad}</p>
        `;
        
        modalContainer.append(carritoContent);
        
        let eliminar = document.createElement("span");
        eliminar.className = "bi bi-cart-x-fill delete-product";
        carritoContent.append(eliminar);

        // Funcion flecha para evitar que se autoejecute.
        // eliminarProducto tiene que recibir id para saber que producto eliminar.
        // Evento eliminar productos del carrito.
        eliminar.addEventListener("click", () => {
            Swal.fire({
                title: '¿Seguro quieres eliminar este producto?',
                text: "Este proceso no se puede revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
              }).then((result) => {
                // Si el resultado se confirma, se llama a la funcion.
                if (result.isConfirmed) {
                  Swal.fire(
                    'Eliminado!',
                    'El producto a sido eliminado.',
                    'success'
                  )
                //Cuando se confirme, el producto se elimina segun id.
                eliminarProducto(id)
                }
              })
        });
    });

    // Para saber el total de lo comprado
    // Le paso los dos parametros acumulador= y el .precio
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    // Creo la informacion del pago
    const totalComprado = document.createElement("div");
    totalComprado.className = "total-content";
    totalComprado.innerHTML = `total a pagar: $ ${total}`;
    modalContainer.append(totalComprado);
    
    // Boton para finalizar compra
    let finalizarCompra = document.createElement("button");
    finalizarCompra.className = "boton_comprar";
    finalizarCompra.innerHTML = `Finalizar Compra`
    modalContainer.append(finalizarCompra);

    //Evento para finalizar la compra
    finalizarCompra.addEventListener("click",finalizaCompra);
    // Guardo info en el storage junto al carrito contador.
    guardarCarritoStorage(carrito);
    carritoContador(obtenerCarritoStorage().length);
};






