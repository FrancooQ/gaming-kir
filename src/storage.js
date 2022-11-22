// Guardo el storage.
const guardarCarritoStorage = (carritoDeCompras) => {
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
};
// Obtengo el Storage.
const obtenerCarritoStorage = () => {
    // Lo parseo pq anteriormente lo converti en json
    // Ahora lo convierto en objeto.
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];   
    // Para usar esta variable fuera de esta funcion.
    return carritoStorage;
};
