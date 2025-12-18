document.addEventListener("DOMContentLoaded", function () {
  
    let productosEnCarrito = [];
    try {
        productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
    } catch(e) {
        productosEnCarrito = [];
    }

   
    const contenedorVacio = document.querySelector("#carrito-vacio");
    const contenedorProductos = document.querySelector("#carrito-productos");
    const contenedorAcciones = document.querySelector("#carrito-acciones");
    const contenedorComprado = document.querySelector("#carrito-comprado");
    const botonVaciar = document.querySelector(".acciones-vaciar-carrito");
    const botonComprar = document.querySelector(".acciones-comprar-carrito");
    const totalDom = document.querySelector("#total");

    
    function rutaImagenCarrito(archivo) {
        if (!archivo) return "";
        if (archivo.startsWith("../") || archivo.startsWith("/")) return archivo;
        return "../" + archivo; 
    }

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
                <div class="carrito-producto-titulo">
                  <small>Título</small>
                  <h3>${producto.titulo}</h3></div>
                <div class="carrito-producto-cantidad">
                  <small>Cantidad</small>
                  <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                  <small>Precio</small>
                  <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                  <small>Subtotal</small>
                  <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">Eliminar</button>
            `;
            contenedorProductos.append(div);
        });

       
        const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const id = e.currentTarget.id;
                productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
                try {
                    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
                } catch (error) {
                    console.log("Error actualizando carrito");
                }
                cargarCarrito();
                alert("Producto eliminado!");
            });
        });

        actualizarTotal();
    }

  
    function vaciarCarrito() {
        if (confirm("¿Seguro que querés vaciar el carrito?")) {
            productosEnCarrito = [];
            try {
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            } catch (error) {
                console.log("Error al vaciar el carrito");
            }
            cargarCarrito();
            alert("Carrito vaciado!");
            if (botonVaciar) botonVaciar.style.cursor = "pointer";
        }
    }

    
    function comprarCarrito() {
        productosEnCarrito = [];
        try {
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        } catch (error) {
            console.log("Error al finalizar la compra");
        }
        contenedorVacio.style.display = "none";
        contenedorProductos.style.display = "none";
        contenedorAcciones.style.display = "none";
        contenedorComprado.style.display = "block";
        totalDom.innerText = "$00.00";
    }

   
    function actualizarTotal() {
        const total = productosEnCarrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
        totalDom.innerText = `$${total}`;
    }

    // eventos
    if (botonVaciar) botonVaciar.addEventListener("click", vaciarCarrito);
    if (botonComprar) botonComprar.addEventListener("click", comprarCarrito);

    
    cargarCarrito();
});
