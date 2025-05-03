document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.querySelector(".mostrar-favoritos");

    try {
        const response = await fetch("http://localhost:5000/api/catalogodeIAs");
        const data = await response.json();

        // Si no hay datos, mostrar mensaje
        if (data.length === 0) {
            contenedor.innerHTML = `<p class="text-center fs-4">No hay herramientas favoritas guardadas aún.</p>`;
            return;
        }

        let html = "";
        data.forEach(ia => {
            html += `<div class="card" style="width: 18rem; padding: 8px; margin: 15px;" data-id="${ia._id}">
                        <img src="${ia.imagen}" class="card-img-top" alt="${ia.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${ia.nombre}</h5>
                            <p class="card-text">${ia.descripcion}</p>
                            <div class="btn-group">
                                <a href="${ia.link}" target="_blank" class="btn btn-primary">Ir a sitio</a>
                                <button class="btn btn-danger eliminar-favorito" data-id="${ia._id}" title="Quitar de favoritos">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>`;
        });

        contenedor.innerHTML = html;

        // Agregar eventos a los botones de eliminar
        document.querySelectorAll(".eliminar-favorito").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = btn.dataset.id;
                if (!confirm("¿Estás seguro de que quieres eliminar esta IA de favoritos?")) return;

                try {
                    const res = await fetch(`http://localhost:5000/api/catalogodeIAs/${id}`, {
                        method: "DELETE"
                    });

                    if (res.ok) {
                        btn.closest(".card").remove();

                        // Verifica si ya no hay más cartas y muestra el mensaje
                        if (document.querySelectorAll(".card").length === 0) {
                            contenedor.innerHTML = `<p class="text-center fs-4">No hay herramientas favoritas guardadas aún.</p>`;
                        }

                        alert("IA eliminada de favoritos.");
                    } else {
                        alert("Error al eliminar la IA.");
                    }
                } catch (err) {
                    console.error("Error al eliminar:", err);
                    alert("Error de conexión con el servidor.");
                }
            });
        });

    } catch (error) {
        console.error("Error al cargar favoritos:", error);
        contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar favoritos.</p>`;
    }
});
