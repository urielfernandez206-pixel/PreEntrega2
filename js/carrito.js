document.addEventListener("DOMContentLoaded", function () {
    // cargar carrito desde localStorage
    let productosEnCarrito = [];
    try {
        productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
    } catch(e) {
        productosEnCarrito = [];
    }

    // nodos del DOM
    const contenedorVacio = document.querySelector("#carrito-vacio");
    const contenedorProductos = document.querySelector("#carrito-productos");
    const contenedorAcciones = document.querySelector("#carrito-acciones");
    const contenedorComprado = document.querySelector("#carrito-comprado");
    const botonVaciar = document.querySelector(".acciones-vaciar-carrito");
    const botonComprar = document.querySelector(".acciones-comprar-carrito");
    const totalDom = document.querySelector("#total");

    // función simple para arreglar rutas de imagen
    function rutaImagenCarrito(archivo) {
        if (!archivo) return "";
        if (archivo.startsWith("../") || archivo.startsWith("/")) return archivo;
        return "../" + archivo; // porque estamos en pages/carrito.html
    }

    // cargar productos en carrito
    function cargarCarrito() {
        if (productosEnCarrito.length === 0) {
            contenedorVacio.style.display = "block";
            contenedorProductos.style.display = "none";
            contenedorAcciones.style.display = "none";
            contenedorComprado.style.display = "none";
            totalDom.innerText = "$00.00";
            return;
        }

        contenedorVacio.style.display = "none";
        contenedorProductos.style.display = "flex";
        contenedorAcciones.style.display = "flex";
        contenedorComprado.style.display = "none";

        contenedorProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${rutaImagenCarrito(producto.imagen)}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo"><small>Título</small><h3>${producto.titulo}</h3></div>
                <div class="carrito-producto-cantidad"><small>Cantidad</small><p>${producto.cantidad}</p></div>
                <div class="carrito-producto-precio"><small>Precio</small><p>$${producto.precio}</p></div>
                <div class="carrito-producto-subtotal"><small>Subtotal</small><p>$${producto.precio * producto.cantidad}</p></div>
                <button class="carrito-producto-eliminar" id="${producto.id}">Eliminar</button>
            `;
            contenedorProductos.append(div);
        });

        // listeners para eliminar productos
        const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const id = e.currentTarget.id;
                productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
                cargarCarrito();
                alert("Producto eliminado!");
            });
        });

        actualizarTotal();
    }

    // vaciar carrito
    function vaciarCarrito() {
        if (confirm("¿Seguro que querés vaciar el carrito?")) {
            productosEnCarrito = [];
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarCarrito();
            // cursor manito cuando se vacía
            if (botonVaciar) botonVaciar.style.cursor = "pointer";
        }
    }

    // comprar carrito
    function comprarCarrito() {
        productosEnCarrito = [];
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        contenedorVacio.style.display = "none";
        contenedorProductos.style.display = "none";
        contenedorAcciones.style.display = "none";
        contenedorComprado.style.display = "block";
        totalDom.innerText = "$00.00";
    }

    // calcular total
    function actualizarTotal() {
        const total = productosEnCarrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
        totalDom.innerText = `$${total}`;
    }

    // eventos
    if (botonVaciar) botonVaciar.addEventListener("click", vaciarCarrito);
    if (botonComprar) botonComprar.addEventListener("click", comprarCarrito);

    // inicio
    cargarCarrito();
});
