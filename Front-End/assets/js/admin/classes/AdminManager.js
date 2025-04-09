import { COLUMNS } from "../constants.js";

export class AdminManager {
    constructor(currentPage, apiUrl, adminRoutesInstance) {
        this.currentPage = currentPage;
        this.apiUrl = apiUrl;
        this.adminRoutes = adminRoutesInstance;
        this.columns = COLUMNS[currentPage] || [];
        this.initListeners();
    }

    initListeners() {
        document.addEventListener("click", async (e) => {
            const editBtn = e.target.closest(".btn-edit");
            const deleteBtn = e.target.closest(".btn-delete");

            const createBtn = e.target.closest(".btn-create");
            if (editBtn) {
                const id = editBtn.dataset.id;
                if (id) {
                    const data = await this.getData(id);
                    this.showEditModal(id, data);
                }
            }

            if (deleteBtn) {
                const id = deleteBtn.dataset.id;
                if (id) {
                    this.confirmDelete(id);
                }
            }

            if (createBtn) {
                e.preventDefault();
                this.showCreateModal();
            }
        });
    }

    async getData(id) {
        try {
            const response = await axios.get(`${this.apiUrl}/${id}`);
            return response.data;
        } catch (err) {
            console.error("Error al obtener datos:", err);
        }
    }

    generateSwalFormHTML(action = "create", data = {}) {
        const rolesMap = {
            admin: "Administrador",
            user: "Usuario",
            councilor: "Concejal",
        };

        return `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${this.columns
                .map((col) => {
                    const label = this.formatLabel(col);
                    const value = data[col] || "";

                    let inputHTML = "";

                    if (col === "type" && this.currentPage === "roles.html") {
                        const options = Object.entries(rolesMap)
                            .map(
                                ([key, display]) =>
                                    `<option value="${key}" ${
                                        value === key ? "selected" : ""
                                    }>${display}</option>`,
                            )
                            .join("");

                        inputHTML = `
                            <select id="swal-${col}" class="swal2-input">
                                ${options}
                            </select>
                        `;
                    } else if (col === "content") {
                        inputHTML = `
                            <textarea id="swal-${col}" class="swal2-textarea" 
                                style="resize: vertical; min-height: 100px;" 
                                placeholder="${label}">${value}</textarea>
                        `;
                    } else {
                        inputHTML = `
                            <input id="swal-${col}" class="swal2-input" 
                                placeholder="${label}" value="${value}" />
                        `;
                    }

                    return `
                        <div style="display: flex; flex-direction: column;">
                            <label for="swal-${col}" 
                                   style="font-weight: 500; margin-bottom: 0.3rem; color: #444;">
                                ${label}:
                            </label>
                            ${inputHTML}
                        </div>
                    `;
                })
                .join("")}
        </div>
    `;
    }

    showEditModal(id, data) {
        Swal.fire({
            title: "Editar contenido",
            html: this.generateSwalFormHTML("edit", data),
            showCancelButton: true,
            confirmButtonText: "Guardar",
            preConfirm: () => {
                const result = {};
                for (const col of this.columns) {
                    const input = document.getElementById(`swal-${col}`);
                    if (!input || !input.value.trim()) {
                        Swal.showValidationMessage(
                            `El campo ${this.formatLabel(col)} es obligatorio`,
                        );
                        return false;
                    }
                    result[col] = input.value.trim();
                }
                return result;
            },
        }).then(async (result) => {
            if (result.isConfirmed && result.value) {
                try {
                    await axios.put(`${this.apiUrl}/${id}`, result.value);

                    Swal.fire({
                        icon: "success",
                        title: "¡Actualizado!",
                        text: "Contenido modificado correctamente",
                        timer: 1500,
                        showConfirmButton: false,
                    }).then(() => {
                        if (
                            this.adminRoutes &&
                            typeof this.adminRoutes.render === "function"
                        ) {
                            this.adminRoutes.render();
                        }
                    });
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error", "No se pudo actualizar", "error");
                }
            }
        });
    }

    confirmDelete(id) {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, borrar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${this.apiUrl}/${id}`);
                    Swal.fire(
                        "Eliminado",
                        "El contenido ha sido eliminado",
                        "success",
                    ).then(() => location.reload());
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error", "No se pudo eliminar", "error");
                }
            }
        });
    }

    showCreateModal() {
        Swal.fire({
            title: "Crear nuevo contenido",

            html: this.generateSwalFormHTML("create"),
            showCancelButton: true,
            confirmButtonText: "Crear",

            preConfirm: () => {
                const result = {};
                for (const col of this.columns) {
                    const input = document.getElementById(`swal-${col}`);
                    result[col] = input?.value.trim() || "";
                }

                const isValid = this.validateFormData(this.columns, result);
                return isValid ? result : false;
            },
        }).then(async (result) => {
            if (result.isConfirmed && result.value) {
                if (result.isConfirmed && result.value) {
                    try {
                        await axios.post(this.apiUrl, result.value);

                        Swal.fire({
                            icon: "success",
                            title: "¡Creado!",
                            text: "El contenido se agregó correctamente.",
                            timer: 1500,
                            showConfirmButton: false,
                        }).then(() => {
                            if (
                                this.adminRoutes &&
                                typeof this.adminRoutes.render === "function"
                            ) {
                                this.adminRoutes.render();
                            }
                        });
                    } catch (error) {
                        console.error(error);
                        Swal.fire(
                            "Error",
                            "No se pudo crear el contenido",
                            "error",
                        );
                    }
                }
            }
        });
    }

    validateFormData(fields, data) {
        const cedulaRegex = /^[1-7]-\d{4}-\d{4}$/;
        const phoneRegex = /^\d{4} \d{4}$/;
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        for (const field of fields) {
            const value = data[field];
            if (!value || value.trim() === "") {
                Swal.showValidationMessage(
                    `El campo "${this.formatLabel(field)}" es obligatorio.`,
                );
                return false;
            }

            if (field === "id_card" && !cedulaRegex.test(value)) {
                Swal.showValidationMessage(
                    "La cédula debe tener el formato 1-2345-6789.",
                );
                return false;
            }

            if (field === "phone" && !phoneRegex.test(value)) {
                Swal.showValidationMessage(
                    "El teléfono debe tener el formato 8888 8888.",
                );
                return false;
            }

            if (field === "email" && !emailRegex.test(value)) {
                Swal.showValidationMessage(
                    "El correo electrónico no es válido.",
                );
                return false;
            }

            if (field === "password" && !passwordRegex.test(value)) {
                Swal.showValidationMessage(
                    "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.",
                );
                return false;
            }
        }

        return true;
    }

    generateSwalInputs(data = {}) {
        return this.columns
            .map((col) => {
                const label = this.formatLabel(col);
                const value = data[col] || "";

                if (col === "type" && this.currentPage === "roles.html") {
                    return `
                    <label for="swal-${col}" class="swal2-label">${label}</label>
                    <select id="swal-${col}" class="swal2-input">
                        ${["admin", "user", "councilor"]
                            .map(
                                (opt) =>
                                    `<option value="${opt}" ${
                                        value === opt ? "selected" : ""
                                    }>${this.formatLabel(opt)}</option>`,
                            )
                            .join("")}
                    </select>
                `;
                }

                return `
                <label for="swal-${col}" class="swal2-label">${label}</label>
                <input id="swal-${col}" class="swal2-input" value="${value}" placeholder="${label}">
            `;
            })
            .join("");
    }

    formatLabel(key) {
        const map = {
            id: "Cédula",
            name: "Nombre",
            lastName: "Apellidos",
            email: "Correo",
            phone: "Teléfono",
            role: "Rol",
            createdAt: "Creación",
            title: "Título",
            content: "Contenido",
            status: "Estado",
            author: "Autor",
            active: "Activa",
            password: "Contraseña",
            address: "Dirección",
            district: "Distrito",
            bibliography: "Biografía",
            category: "Categoría",
        };

        if (map[key]) return map[key];

        return key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
    }
}
