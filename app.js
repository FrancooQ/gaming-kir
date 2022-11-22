// Tomo el id de donde quiero partir.
const contenedorProductos = document.querySelector("#producto-contenedor");
const contactForm = document.querySelector("#form_contact");
const userName= document.querySelector("#user_name");
const userEmail = document.querySelector("#user_email");
const message = document.querySelector("#message");
let seleccion = document.querySelector("#items");


//Array paralelo para los filtros.
const productos = [];

//Funcion para obtener el json de los productos.
const obtenerProductos = async () => {
  //Obtengo el json y su promesa
  const resp = await fetch("./src/stock.json");
  //Array de objetos parseado.
  let data = await resp.json();
  //Invoco mostrarProductos, la cual se lleva data.
  mostrarProductos(data);
  //Recorro el array y pusheo productos.
  data.forEach(p => productos.push(p));
}

//Invoco a la funcion para que se ejecute
obtenerProductos();

//Funciones de filtrado.
//Selecciono el formulario, y capturo el evento.
document.querySelector("#formulario").onsubmit = (e) => {
  e.preventDefault();
  console.log(items.value);
  //Cuando el value sea distinto a vacio, es decir tenga un filtro seleccionado.
  if (items.value != "") {
    //Filtro el nuevo array paralelo.
    const filtrados = productos.filter(p => p.tipo === items.value);
    console.log(filtrados);
    //Mostrar productos se lleva el array filtrados.
    mostrarProductos(filtrados);
  }
}

//Evento restableecer, solo va a mostrar productos.
document.querySelector("#reestablecer").onclick = () => {
  mostrarProductos(productos);
}

//Evento para filtrar de menor a mayor.
document.querySelector("#menor").onclick = () => {
  let copia = Object.assign([], productos);
  copia.sort((a,b) => a.precio - b.precio);
  mostrarProductos(copia);
}

//Evento para filtrar de mayor a menor.
document.querySelector("#mayor").onclick = () => {
  let copia = Object.assign([], productos);
  copia.sort((a,b) => b.precio - a.precio);
  mostrarProductos(copia);
}

//MOSTRAR PRODUCTOS
//Mostrar productos se va a llevar un array, dependiendo el filtro que tenga la pagina.
//Si tiene el array carrito, se lo lleva, al estar declarada de esta forma mostrar es reutilizable.
const mostrarProductos = (productos) => {
  let carrito = obtenerCarritoStorage();
  contenedorProductos.innerHTML = '';
  //Recorro el array.
  productos.forEach(post => {
    // Utilizo Desestructuración
    const { id, cantidad, img, nombre, precio, tipo } = post;
    const div = document.createElement('div');
    div.className = `${tipo}`

    // Les doy una clase a los div.
    div.classList.add('card');

    // Escribo el HTML.
    // Ahora puedo llamar a la direccion del objeto sin usar .
    div.innerHTML += `<div class="card-img">
                          <img src=${img}>                   
                        </div>
                        <div class="card-content">
                            <span class="card-title">${nombre}</span> 
                            <p>Precio: $ ${precio}</p>
                        </div>
                        `

    // Le digo que se empieze a escribir abajo del div creado.     
    contenedorProductos.appendChild(div);

    // Comprar
    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "boton_comprar"

    div.append(comprar)

    ///CARGO PRODUCTOS AL CARRITO
    comprar.addEventListener("click", () => {
      // Busco si hay productos repetidos.
      let carrito = obtenerCarritoStorage();
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === id);

      // Cuando haya repetidos
      if (repeat) {
        carrito.map((prod) => {
          // Sumo con Operator ++ y uso el And.
          prod.id === id && prod.cantidad++;
        });
      } else {
        carrito.push({
          id: id,
          img: img,
          nombre: nombre,
          precio: precio,
          cantidad: cantidad,
        });
      }
      ///Cada que se agregue un objeto al carrito se mostrara el carrito.
      guardarCarritoStorage(carrito);
      pintarCarrito(carrito);
      carritoContador(obtenerCarritoStorage().length);
    });
  });
}
    

//CONTACTO

//Funcion para mandar email.
const sendEmail = async (body) => {
    
  const config = {
      ///Debo especificar 3 cosas.
      //METODO
      method: 'POST',
      //HEADER Request Information
      headers: {
          'Content-Type':'application/json'
      },
      //BODY, y debe ser en formato json.
      body: JSON.stringify(body),
  }
  
  //La api utiliza el metodo POST, por lo tanto envio valores.
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", config);
  //No es necesario parsear la respuesta del fetch().
  //Devolvemos el respoinse.
  return response;
};

///Escucha el evento submit.
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const body= {
      service_id: 'service_8xs6c6m',//EmailServices
      template_id: 'template_13ijaer',//EmailTemplates
      user_id: 'F1ykso1TQVuvG2ASt',//PublicKey
      //Saco esta info de la api.
      template_params: {
          'to_name' : userName.value,
          'from_name': userEmail.value,
          'message': message.value
      }
  };

  sendEmail(body)
    .then((response) => {
        console.log(response.status);
        //Buscamos el status, si es 200 el mensaje se envio con exito.
        Swal.fire(
          'Gracias por contactarnos!',
          'Mensaje enviado con exito!',
          'success'
          )
    })
    .catch((error) => {
      console.log(error);
    })
})  

