document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchService");
    const serviceList = document.getElementById("serviceList");
    const addServiceBtn = document.getElementById("addServiceBtn");

    // Filtrar servicios 
    searchInput.addEventListener("keyup", function () {
        const filter = searchInput.value.toLowerCase();
        let services = serviceList.getElementsByTagName("li");

        for (let i = 0; i < services.length; i++) {
            let service = services[i];
            let text = service.textContent || service.innerText;
            service.style.display = text.toLowerCase().includes(filter) ? "" : "none";
        }
    });

    // Agrega nuevo servicio
    addServiceBtn.addEventListener("click", function () {
        Swal.fire({
            title: "Agregar Nuevo Servicio",
            html:
                '<input id="serviceTitle" class="swal2-input" placeholder="Título del servicio">' +
                '<textarea id="serviceDescription" class="swal2-textarea" placeholder="Descripción"></textarea>',
            showCancelButton: true,
            confirmButtonText: "Agregar",
            preConfirm: () => {
                let title = document.getElementById("serviceTitle").value;
                let description = document.getElementById("serviceDescription").value;

                if (!title || !description) {
                    Swal.showValidationMessage("Todos los campos son obligatorios");
                    return false;
                }

                let newService = document.createElement("li");
                newService.classList.add("service-item");
                newService.innerHTML = `
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <button class="editService">Editar</button>
                    <button class="deleteService">Eliminar</button>
                `;
                serviceList.appendChild(newService);
            },
        });
    });

    // Delegación de eventos para editar y eliminar
    serviceList.addEventListener("click", function (e) {
        if (e.target.classList.contains("editService")) {
            let serviceItem = e.target.parentElement;
            let title = serviceItem.querySelector("h3").innerText;
            let description = serviceItem.querySelector("p").innerText;

            Swal.fire({
                title: "Editar Servicio",
                html:
                    `<input id="editTitle" class="swal2-input" value="${title}">` +
                    `<textarea id="editDescription" class="swal2-textarea">${description}</textarea>`,
                showCancelButton: true,
                confirmButtonText: "Guardar",
                preConfirm: () => {
                    let newTitle = document.getElementById("editTitle").value;
                    let newDescription = document.getElementById("editDescription").value;

                    serviceItem.querySelector("h3").innerText = newTitle;
                    serviceItem.querySelector("p").innerText = newDescription;
                },
            });
        }

        if (e.target.classList.contains("deleteService")) {
            e.target.parentElement.remove();
        }
    });

    // Filtrado de denuncias relacionadas con servicios
    document.getElementById("filterServiceIssues").addEventListener("change", function () {
        let showOnlyServices = this.checked;
        let allReports = document.querySelectorAll(".denuncia");

        allReports.forEach(report => {
            if (showOnlyServices && !report.classList.contains("service-issue")) {
                report.style.display = "none";
            } else {
                report.style.display = "block";
            }
        });
    });
});
