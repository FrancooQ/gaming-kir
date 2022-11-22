const cantidadCarrito = document.getElementById("contador-carrito");
const desplegarCarrito = document.getElementById("cesta-carrito");


//Evento para desplegar el carrito.
desplegarCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    pintarCarrito(obtenerCarritoStorage());
});

// Funcion para eliminar los productos del carrito
const eliminarProducto = (id) => {
    // Recibe id, y filtramos buscando el id a eliminar.
    let carritoSinProductoEliminado = obtenerCarritoStorage().filter((p) => p.id !== id);
    guardarCarritoStorage(carritoSinProductoEliminado);
    // Quedaran los id no eliminados mientras que el eliminado desaparece.
    // Actualizamos carrito y pintamos.
    carritoContador(obtenerCarritoStorage().length);
    pintarCarrito(obtenerCarritoStorage());
};

// Funcion para que cuente items del carrito.
const carritoContador = (cantProductos) => {
    cantidadCarrito.style.display = "block";
    // Se inyecta la cantidad de veces que agrego un objeto.
    cantidadCarrito.innerText = cantProductos;
};

// Funcion para finalizar compra
const finalizaCompra = () => {
    // Condicion para que el boton finalizar compra funcione cuando hay items en carrito.
    if(obtenerCarritoStorage().length != 0) {
        Swal.fire({
            title: '¿Confirma la compra?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirmar compra',
            denyButtonText: `Seguir comprando`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // La compra finalizo con exito.
                Swal.fire(
                'Felicidades!',
                'La compra a sido efectiva!',
                'success'
                )
            // Cuando finalizo la compra vacio el carrito.
            // Igualo carrito a un vector vacio.
            guardarCarritoStorage([]);
            // Le paso el carrito vacio al contador y al modal.
            carritoContador(obtenerCarritoStorage().length);
            pintarCarrito(obtenerCarritoStorage());

            } else if (result.isDenied) {
                // El usuario puede seguir agregando productos.
                Swal.fire('Puede seguir comprando.')
            }
          })
    } else {
        // En caso de que no haya productos en el carrito el boton finalizar compra no se ejecuta y tira error.
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos en el carrito',
          })
    }
}



