import { catalogoIAs } from "./catalogo.js";

const mostrar = document.querySelector(".mostrar-catalogo");

document.addEventListener("DOMContentLoaded", async () => {
    let favoritas = [];

    try {
        const res = await fetch("http://localhost:5000/api/catalogodeIAs");
        favoritas = await res.json();
    } catch (err) {
        console.error("Error al obtener favoritas:", err);
    }

    let mostrarCatalogo = "";

    catalogoIAs.forEach((ia, index) => {
        const estaGuardada = favoritas.some(fav => fav.nombre === ia.nombre);

        const boton = estaGuardada
            ? `<a href="#" class="btn btn-danger eliminar" data-nombre="${ia.nombre}" title="Eliminar de favoritos">
                    <i class="fa-solid fa-trash"></i>
                </a>`
            : `<a href="#" class="btn btn-primary agregar" data-index="${index}" title="Agregar a favoritos">
                    <i class="fa-solid fa-star"></i>
                </a>`;

        const iaCard = `<div class="card" style="width: 18rem; padding: 8px; margin: 15px;">
                            <img src="${ia.imagen}" class="card-img-top" alt="${ia.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${ia.nombre}</h5>
                                <p class="card-text">${ia.descripcion}</p>
                                <div class="btn-group">
                                    <a href="${ia.link}" target="_blank" class="btn btn-primary">Ir a sitio</a>
                                    ${boton}
                                </div>
                            </div>
                        </div>`;

        mostrarCatalogo += iaCard;
    });

    mostrar.innerHTML = mostrarCatalogo;

    // Eventos para agregar
    document.querySelectorAll(".agregar").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const index = btn.dataset.index;
            const ia = catalogoIAs[index];

            try {
                const response = await fetch("http://localhost:5000/api/catalogodeIAs", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: ia.nombre,
                        descripcion: ia.descripcion,
                        imagen: ia.imagen,
                        link: ia.link
                    })
                });

                if (response.ok) {
                    alert(`¡${ia.nombre} agregada a favoritos!`);
                    location.reload(); // recargar para actualizar el botón
                } else {
                    alert("Error al guardar en la base de datos.");
                }
            } catch (error) {
                console.error("Error al enviar la solicitud:", error);
                alert("Error de conexión con el servidor.");
            }
        });
    });

    // Eventos para eliminar
    document.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const nombre = btn.dataset.nombre;
            const ia = favoritas.find(f => f.nombre === nombre);

            if (!ia) return;

            try {
                const res = await fetch(`http://localhost:5000/api/catalogodeIAs/${ia._id}`, {
                    method: "DELETE"
                });

                if (res.ok) {
                    alert(`¡${nombre} eliminada de favoritos!`);
                    location.reload(); // recargar para actualizar el botón
                } else {
                    alert("Error al eliminar la IA.");
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Error de conexión con el servidor.");
            }
        });
    });
});
