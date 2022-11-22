// Evento de carga del DOM.

document.addEventListener("DOMContentLoaded", () => {
    // Consultamos storage, y utilizamos la variable global carrito [].
    // carrito = obtenerCarritoStorage();
    // Actualizamos el numero de elementos del carrito.
    //localStorage.getItem('carrito');
    carritoContador(obtenerCarritoStorage().length);
})
