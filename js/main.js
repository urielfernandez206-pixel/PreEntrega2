// productos
const productosArray = [
  { 
    id: "zapatilla-1", 
    titulo: "Zapatilla 01", 
    imagen: "img/producto-1.jpg", 
    categoria: 
    { 
        nombre: "Zapatillas", 
        id: "zapatillas" 
    }, 
    precio: 1000 },
  
  { 
    id: "zapatilla-2", 
    titulo: "Zapatilla 02", 
    imagen: "img/producto-2.jpg", 
    categoria: 
    { 
        nombre: "Zapatillas", 
        id: "zapatillas" 
    }, 
        precio: 1000 },
  { 
    id: "zapatilla-3", 
    titulo: "Zapatilla 03", 
    imagen: "img/producto-3.jpg", 
    categoria: 
    { 
        nombre: "Zapatillas", 
        id: "zapatillas" 
    }, 
    precio: 1000 },
  { 
    id: "zapatilla-4", 
    titulo: "Zapatilla 04", 
    imagen: "img/producto-4.jpg", 
    categoria: 
     { 
        nombre: "Zapatillas", 
        id: "zapatillas" 
    },
         precio: 1000 },
  { 
    id: "zapatilla-5", 
    titulo: "Zapatilla 05", 
    imagen: "img/producto-5.jpg", 
    categoria: 
    { 
        nombre: "Zapatillas", 
        id: "zapatillas"
     }, 
        precio: 1000 },
  { 
    id: "zapatilla-6", 
    titulo: "Zapatilla 06", 
    imagen: "img/producto-6.jpg", 
    categoria: 
    { 
        nombre: "Zapatillas", 
        id: "zapatillas" 
    }, 
    precio: 1000 },
  { 
    id: "remera-1", 
    titulo: "Remera 01", 
    imagen: "img/remeras/remera-1.jpg", 
    categoria: 
    { 
        nombre: "Remeras", 
        id: "remeras" 

    }, 
    precio: 1000 },
  { 
    id: "remera-2", 
    titulo: "Remera 02", 
    imagen: "img/remeras/remera-2.jpg", 
    categoria: 
    { nombre: "Remeras", id: "remeras" }, precio: 1000 },
  { 
    id: "remera-3", 
    titulo: "Remera 03", 
    imagen: "img/remeras/remera-3.jpg", 
    categoria: 
    { 
        nombre: "Remeras", 
        id: "remeras" 

    }, 
    precio: 1000 },
  { 
    id: "pantalon-1", 
    titulo: "Pantalón 01", 
    imagen: "img/pantalones/pantalon-1.jpg", 
    categoria: 
    { 
        nombre: "Pantalones", 
        id: "pantalones" 

    }, 
    precio: 1000 },
  { 
    id: "pantalon-2", 
    titulo: "Pantalón 02", 
    imagen: "img/pantalones/pantalon-2.jpg", 
    categoria: 
    { 
        nombre: "Pantalones", 
        id: "pantalones" 

    }, 
    precio: 1000 },
  { 
    id: "pantalon-3", 
    titulo: "Pantalón 03", 
    imagen: "img/pantalones/pantalon-3.jpg", 
    categoria: 
    { 
        nombre: "Pantalones", 
        id: "pantalones" 

    }, 
    precio: 1000 },
  { 
    id: "gorra-1", 
    titulo: "Gorra 01", 
    imagen: "img/gorras/gorra-1.jpg", 
    categoria: 
    {
         nombre: "Gorras", 
        id: "gorras" 

    }, 
    precio: 1000 },
  { 
    id: "gorra-2", 
    titulo: "Gorra 02", 
    imagen: "img/gorras/gorra-2.jpg", 
    categoria: 
    { 
        nombre: "Gorras", 
        id: "gorras" 

    }, 
    precio: 1000 },
  { 
    id: "gorra-3", 
    titulo: "Gorra 03", 
    imagen: "img/gorras/gorra-3.jpg", 
    categoria: 
    { 
        nombre: "Gorras", 
        id: "gorras" 

    }, 
    precio: 1000 }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-productos");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numeroCarrito = document.querySelector("#numero-carrito");


let productosEnCarrito = [];
try {
    productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
} catch (e) {
    productosEnCarrito = [];
}


function actualizarNumeroCarrito() {
    let total = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = total;
}


function cargarProductos(productos) {
    contenedorProductos.innerHTML = "";
    productos.forEach(producto => {
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
    });
}


function agregarAlCarrito(id) {
    const productoAgregado = productosArray.find(p => p.id === id);
    if (!productoAgregado) return;

    if (productosEnCarrito.some(p => p.id === id)) {
        const index = productosEnCarrito.findIndex(p => p.id === id);
        productosEnCarrito[index].cantidad++;
    } else {
        productosEnCarrito.push({ ...productoAgregado, cantidad: 1 }); 
    }
    try {
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    } catch (error) {
        console.log("Error guardando en localStorage");
    }
    actualizarNumeroCarrito();
    if (typeof Swal !== "undefined") {
        Swal.fire({
            title: "Agregado",
            text: "Producto agregado al carrito",
            icon: "success",
            timer: 1200,
            showConfirmButton: false
        });
    } else {
        alert("Producto agregado!");
    }
}

contenedorProductos.addEventListener("click", (e) => {
    if (e.target.classList.contains("boton-agregar-carrito")) {
        agregarAlCarrito(e.target.id);
    }
});


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const id = e.currentTarget.id;

        if (id === "todos") {
            tituloPrincipal.innerText = "Todos nuestros productos";
            cargarProductos(productosArray);
        } else {
            const filtrados = productosArray.filter(p => p.categoria.id === id);
            tituloPrincipal.innerText = filtrados.length ? filtrados[0].categoria.nombre : "No hay productos";
            cargarProductos(filtrados.length ? filtrados : []);
        }
    });
});


cargarProductos(productosArray);
actualizarNumeroCarrito();
