document.addEventListener("DOMContentLoaded", function () {
  let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

  // nodos del DOM
  const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
  const contenedorCarritoProductos = document.querySelector("#carrito-productos");
  const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
  const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
  let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
  const contenedorTotal = document.querySelector("#total"); 
  const botonComprar = document.querySelector("#carrito-acciones-comprar");

  // si faltan los elementos básicos, salimos y avisamos
  if (!contenedorCarritoVacio || !contenedorCarritoProductos) {
    console.warn("carrito.js: faltan elementos HTML necesarios (#carrito-vacio o #carrito-productos). Revisa pages/carrito.html");
    return;
  }

  function rutaImagen(archivo) {
    if (!archivo) return "";
    if (archivo.startsWith("../") || archivo.startsWith("/")) return archivo;
    const enPages = location.pathname.includes("/pages/");
    return enPages ? "../" + archivo : archivo;
  }

  function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
      contenedorCarritoVacio.classList.add("disabled");
      contenedorCarritoProductos.classList.remove("disabled");
      if (contenedorCarritoAcciones) contenedorCarritoAcciones.classList.remove("disabled");
      if (contenedorCarritoComprado) contenedorCarritoComprado.classList.add("disabled");

      contenedorCarritoProductos.innerHTML = "";
      productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
          <img class="carrito-producto-imagen" src="${rutaImagen(producto.imagen)}" alt="${producto.titulo}">
          <div class="carrito-producto-titulo"><small>Título</small><h3>${producto.titulo}</h3></div>
          <div class="carrito-producto-cantidad"><small>Cantidad</small><p>${producto.cantidad}</p></div>
          <div class="carrito-producto-precio"><small>Precio</small><p>$${producto.precio}</p></div>
          <div class="carrito-producto-subtotal"><small>Subtotal</small><p>$${producto.precio * producto.cantidad}</p></div>
          <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
        `;
        contenedorCarritoProductos.append(div);
      });

      actualizarBotonesEliminar();
      actualizarTotal();
    } else {
      contenedorCarritoVacio.classList.remove("disabled");
      contenedorCarritoProductos.classList.add("disabled");
      if (contenedorCarritoAcciones) contenedorCarritoAcciones.classList.add("disabled");
      if (contenedorCarritoComprado) contenedorCarritoComprado.classList.add("disabled");
      if (contenedorTotal) contenedorTotal.innerText = "$00.00";
    }
  }

  function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => boton.addEventListener("click", eliminarDelCarrito));
  }

  function eliminarDelCarrito(e) {
    // solo mostrar Toastify si está cargado
    if (typeof Toastify !== "undefined") {
      Toastify({
        text: "Producto eliminado",
        duration: 2000,
        close: true
      }).showToast();
    }

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    if (index > -1) productosEnCarrito.splice(index, 1);

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
  }

  if (botonVaciar) botonVaciar.addEventListener("click", vaciarCarrito);
  function vaciarCarrito() {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          productosEnCarrito = [];
          localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
          cargarProductosCarrito();
        }
      });
    } else {
      // fallback sencillo si no está Swal
      if (confirm("¿Seguro que querés vaciar el carrito?")) {
        productosEnCarrito = [];
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
      }
    }
  }

  function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    if (contenedorTotal) contenedorTotal.innerText = `$${totalCalculado}`;
  }

  if (botonComprar) botonComprar.addEventListener("click", comprarCarrito);
  function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    if (contenedorCarritoAcciones) contenedorCarritoAcciones.classList.add("disabled");
    if (contenedorCarritoComprado) contenedorCarritoComprado.classList.remove("disabled");
    if (contenedorTotal) contenedorTotal.innerText = "$00.00";
  }

  // inicio
  cargarProductosCarrito();
});