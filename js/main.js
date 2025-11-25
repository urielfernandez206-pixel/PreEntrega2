const productosArray = [
    {
        id: "zapatilla-1",
        titulo: "Zapatilla 01",
        imagen: "img/producto-1.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 1000
    }

     ,{
        id: "zapatilla-2",
        titulo: "Zapatilla 02",
        imagen: "img/producto-2.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 1000
    }

     ,{
        id: "zapatilla-3",
        titulo: "Zapatilla 03",
        imagen: "img/producto-3.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 1000
    }

     ,{
        id: "zapatilla-4",
        titulo: "Zapatilla 04",
        imagen: "img/producto-4.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 1000
    }

     ,{
        id: "zapatilla-5",
        titulo: "Zapatilla 05",
        imagen: "img/producto-5.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 1000
    }

     ,{
        id: "zapatilla-6",
        titulo: "Zapatilla 06",
        imagen: "img/producto-6.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 1000
    }

    ,{
        id: "remera-1",
        titulo: "remera 01",
        imagen: "img/remeras/remera-1.jpg",
        categoria: {
            nombre: "remeras",
            id: "remeras"
        },
        precio: 1000
    }

    ,{
        id: "remera-2",
        titulo: "remera 02",
        imagen: "img/remeras/remera-2.jpg",
        categoria: {
            nombre: "remeras",
            id: "remeras"
        },
        precio: 1000
    }

    ,{
        id: "remera-3",
        titulo: "remera 03",
        imagen: "img/remeras/remera-3.jpg",
        categoria: {
            nombre: "remeras",
            id: "remeras"
        },
        precio: 1000
    }

    ,{
        id: "pantalon-1",
        titulo: "pantalon 01",
        imagen: "img/pantalones/pantalon-1.jpg",
        categoria: {
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 1000
    }

    ,{
        id: "pantalon-2",
        titulo: "pantalon 02",
        imagen: "img/pantalones/pantalon-2.jpg",
        categoria: {
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 1000
    }

    ,{
        id: "pantalon-3",
        titulo: "pantalon 03",
        imagen: "img/pantalones/pantalon-3.jpg",
        categoria: {
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 1000
    }

    ,{
        id: "gorra-1",
        titulo: "gorra 01",
        imagen: "img/gorras/gorra-1.jpg",
        categoria: {
            nombre: "gorras",
            id: "gorras"
        },
        precio: 1000
    }

    ,{
        id: "gorra-2",
        titulo: "gorra 02",
        imagen: "img/gorras/gorra-2.jpg",
        categoria: {
            nombre: "gorras",
            id: "gorras"
        },
        precio: 1000
    }
    
    ,{
        id: "gorra-3",
        titulo: "gorra 03",
        imagen: "img/gorras/gorra-3.jpg",
        categoria: {
            nombre: "gorras",
            id: "gorras"
        },
        precio: 1000
    }

]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-productos");
const tituloPrincipal = document.querySelector(".titulo-principal") || document.querySelector(".titulo");
let botonesAgregar = document.querySelectorAll(".boton-agregar-carrito");
const numeroCarrito = document.querySelector("#numero-carrito");
 
function cargarProductos(productosElegidos) {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {  

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="imagen-producto" src="${producto.imagen}" alt="${producto.titulo}">
          <div class="detalles-producto">
            <h3 class="nombre-producto">${producto.titulo}</h3>
            <p class="precio-producto">$${producto.precio}</p>
            <button class="boton-agregar-carrito" id="${producto.id}">Agregar al carrito</button>
          </div>
          `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productosArray);

botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach(b => b.classList.remove("active"));
    const id = e.currentTarget.id;
    e.currentTarget.classList.add("active");

    if (id === "todos") {
      tituloPrincipal.innerText = "Todos nuestros productos";
      cargarProductos(productosArray);
      return;
    }

    const productosBoton = productosArray.filter(p => p.categoria.id === id);

    if (!productosBoton.length) {
      tituloPrincipal.innerText = "No hay productos";
      contenedorProductos.innerHTML = "<p>No hay productos en esta categoría.</p>";
      return;
    }

    tituloPrincipal.innerText = productosBoton[0].categoria.nombre;
    cargarProductos(productosBoton);
  });
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".boton-agregar-carrito");

    botonesAgregar.forEach(boton => {

        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

if (productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumeroCarrito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton= e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {

        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumeroCarrito && actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumeroCarrito() {
    let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumeroCarrito;
}

