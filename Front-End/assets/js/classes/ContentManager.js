import {
    newsData,
    initiativeData,
    complaintData,
    noticesData,
    servicesData,
    communityData,
    profileData,
    newsSelectors,
    initiativeSelectors,
    complaintSelectors,
    noticeSelectors,
    servicesSelectors,
} from "../constants.js";
import { ProfileEditor } from "./ProfileEditor.js";
import { prettifyText } from "../utils/prettify.js";

export class ContentManager {
    constructor(sectionManager, role) {
        this.role = role;
        this.sectionManager = sectionManager;

        this.contentTypes = {
            news: {
                data: newsData,
                containerId: "news-container",
                detailSectionId: "news-detail",
                selectors: newsSelectors,
            },
            initiatives: {
                data: initiativeData,
                containerId: "initiatives-container",
                detailSectionId: "initiatives-detail",
                selectors: initiativeSelectors,
            },
            complaints: {
                data: complaintData,
                containerId: "complaints-container",
                detailSectionId: "complaints-detail",
                selectors: complaintSelectors,
            },
            notices: {
                data: noticesData,
                containerId: "notices-container",
                detailSectionId: "notices-detail",
                selectors: noticeSelectors,
            },
            services: {
                data: servicesData,
                containerId: "services-container",
                detailSectionId: "services-detail",
                selectors: servicesSelectors,
            },
            community: {
                data: communityData,
                containerId: "community-container",
            },
            profile: {
                data: profileData,
                containerId: "profile-container",
            },
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener("click", (e) => {
            this.handleLinkClick(e);

            const approveBtn = e.target.closest(".btn-approve");
            const denyBtn = e.target.closest(".btn-deny");
            const editBtn = e.target.closest(".btn-edit");
            const editProfileBtn = e.target.closest(".edit-profile-btn");
            const deleteBtn = e.target.closest(".btn-delete");

            if (approveBtn) {
                e.preventDefault();

                this.changeStatus(approveBtn, "Aprobada");
            } else if (denyBtn) {
                e.preventDefault();

                this.changeStatus(denyBtn, "Denegada");
            } else if (editBtn) {
                e.preventDefault();

                const id = editBtn.dataset.id;
                this.editContent(editBtn, id);
            } else if (deleteBtn) {
                e.preventDefault();

                const id = deleteBtn.dataset.id;
                this.deleteContent(deleteBtn, id);
            }
            if (editProfileBtn) {
                e.preventDefault();
                const id = editProfileBtn.dataset.id;
                this.editContent(editProfileBtn, id);
            }
        });
    }

    handleLinkClick(e) {
        try {
            const btnLink = e.target.closest(".btn-link");

            if (btnLink) {
                e.preventDefault();

                const sectionType = btnLink.dataset.section;

                const contentType = sectionType.replace("-detail", "");

                const contentId =
                    parseInt(btnLink.dataset.newId) ||
                    parseInt(btnLink.dataset.initiativeId) ||
                    parseInt(btnLink.dataset.complaintId) ||
                    parseInt(btnLink.dataset.noticeId) ||
                    parseInt(btnLink.dataset.serviceId);

                if (!isNaN(contentId)) {
                    if (this.contentTypes[contentType]) {
                        this.showContentDetail(contentId, contentType);
                    } else {
                        console.error(
                            `Tipo de contenido "${contentType}" no válido.`,
                        );
                    }
                } else {
                    console.error("ID de contenido no válido.");
                }
            }
        } catch (error) {
            console.log("Error en el click, detalles: ", error);
        }
    }

    showContentDetail(contentId, contentType) {
        const { data, selectors, detailSectionId } =
            this.contentTypes[contentType];
        const content = data.find((item) => item.id === contentId);

        if (content) {
            selectors.image.src = content.image;
            selectors.date.textContent = content.date;
            selectors.category.textContent = content.category;
            selectors.title.textContent = content.title;
            selectors.body.innerHTML = prettifyText(content.content);
            this.sectionManager.showSection(detailSectionId);
        } else {
            console.error(`Contenido con ID ${contentId} no encontrado.`);
        }
    }

    detectContentTypeFromButton(button) {
        if (button.closest(".edit-profile-btn")) {
            return "profile";
        }

        const card = button.closest(".content-card");
        if (!card) return null;

        const link = card.querySelector(".btn-link");
        if (!link) return null;

        return link.dataset.section;
    }

    deleteContent(button, id) {
        if (!id || isNaN(id)) return;

        const card = button.closest(".content-card");

        if (card) {
            Swal.fire({
                title: "¿Deseas eliminar esta tarjeta?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    card.style.display = "none";

                    Swal.fire({
                        icon: "success",
                        title: "Contenido ocultado",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            });
        }
    }

    editContent(button, id) {
        const contentType = this.detectContentTypeFromButton(button);
        const contentList = this.contentTypes[contentType]?.data;

        if (!id || isNaN(id)) return;
        if (!contentList) return;

        const content = contentList.find((item) => item.id === parseInt(id));
        if (!content) return;

        if (contentType === "profile") {
            const editor = new ProfileEditor(
                content,
                this.renderContentCards.bind(this),
            );
            editor.showEditModal();
            return;
        }

        Swal.fire({
            title: "Editar contenido",
            width: "1000px",
            customClass: {
                popup: "swal-wide-modal",
            },
            html: `
            <div class="swal-edit-form">
                <label for="edit-title">Título:</label>
                <input id="edit-title" class="swal2-input" placeholder="Título" value="${content.title}">

                <label for="edit-category">Categoría:</label>
                <input id="edit-category" class="swal2-input" placeholder="Categoría" value="${content.category}">

                <label for="edit-content">Contenido:</label>
                <textarea id="edit-content" class="swal2-textarea" placeholder="Contenido completo">${content.content}</textarea>
            </div>
        `,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Guardar cambios",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const title = document
                    .getElementById("edit-title")
                    .value.trim();
                const category = document
                    .getElementById("edit-category")
                    .value.trim();
                const fullContent = document
                    .getElementById("edit-content")
                    .value.trim();

                if (!title || !category || !fullContent) {
                    Swal.showValidationMessage(
                        "Todos los campos son obligatorios",
                    );
                    return false;
                }

                return { title, category, content: fullContent };
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const { title, category, content: fullContent } = result.value;
                content.title = title;
                content.category = category;
                content.content = fullContent;

                this.renderContentCards(contentType);

                Swal.fire({
                    icon: "success",
                    title: "Actualizado",
                    text: "El contenido se actualizó correctamente.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        });
    }

    getAdminActionsHTML(content) {
        return `
            <div class="content">
            <h1 class="status">
                Estado:
                <span class="status-text">${content.status || "En revisión"}</span>
            </h1>
            <div class="content-actions">
                <button data-id="${content.id}" class="change-status-btn approve-btn btn-approve">Aprobar</button>
                <button data-id="${content.id}" class="change-status-btn deny-btn btn-deny">Denegar</button>
                <button data-id="${content.id}" class="change-status-btn btn-edit">
                    <i class="fa fa-edit"></i>
                </button>
                <button data-id="${content.id}" class="change-status-btn btn-delete">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
            <div class="content">
        `;
    }

    changeStatus(button, newStatus) {
        const card = button.closest(".content-card");
        if (!card) return;

        const statusText = card.querySelector(".status-text");

        if (statusText) {
            statusText.innerText = newStatus;

            if (newStatus === "Aprobada") {
                statusText.style.color = "green";
            } else if (newStatus === "Denegada") {
                statusText.style.color = "red";
            } else {
                statusText.style.color = "gray";
            }

            Swal.fire({
                icon: "success",
                title: "Estado actualizado",
                text: `La denuncia ha sido marcada como "${newStatus}".`,
                timer: 2000,
                showConfirmButton: false,
            });
        }
    }

    renderContentCards(contentType) {
        const contentTypeConfig = this.contentTypes[contentType];

        if (!contentTypeConfig) {
            console.error(`Tipo de contenido "${contentType}" no encontrado.`);
            return;
        }

        const { data, containerId } = contentTypeConfig;
        const container = document.getElementById(containerId);
        if (!container) {
            return;
        }

        if (contentType === "profile") {
            const user = data[0];
            container.innerHTML = `
            <div class="profile-wrapper">

                <div class="edit-button-container">
                    <button class="edit-profile-btn" title="Editar Perfil" data-section="profile" data-id="${user.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>

                <div class="profile-photo text-center">
                    <img id="profile-photo" src="${user.photo}" alt="Profile Picture" />
                    <h2 id="profile-fullname" class="user-name">${user.name} ${user.last_name}</h2>
                    <div class="user-description">
                        <p id="profile-bio">${user.bibliography}</p>
                    </div>
                </div>

                <div class="profile-info-grid">
                    <div class="profile-field">
                        <i class="fas fa-id-card"></i>
                        <div>
                            <h4>Cédula</h4>
                            <p id="profile-id-card">${user.id_card}</p>
                        </div>
                    </div>
                    <div class="profile-field">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <h4>Correo</h4>
                            <p id="profile-email">${user.email}</p>
                        </div>
                    </div>
                    <div class="profile-field">
                        <i class="fas fa-phone"></i>
                        <div>
                            <h4>Teléfono</h4>
                            <p id="profile-phone">${user.phone}</p>
                        </div>
                    </div>
                    <div class="profile-field">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <h4>Dirección</h4>
                            <p id="profile-address">${user.address}</p>
                        </div>
                    </div>
                </div>

                <div class="profile-field centered-district">
                    <i class="fas fa-location-arrow"></i>
                    <div>
                        <h4>Distrito</h4>
                        <p id="profile-district">${user.district}</p>
                    </div>
                </div>
            </div>
        `;

            return;
        }

        container.innerHTML = data
            .map(
                (content) => `
        <article class="content-card">
            <div class="content-image">
                <img src="${content.image}" alt="${content.title}" />
                <span class="content-category">${content.category}</span>
            </div>
            <div class="content">
                <div class="content-meta">
                    <span class="content-date">
                        <i class="far fa-calendar"></i> ${content.date}
                    </span>
                    <span class="content-comments">
                        <i class="far fa-comment"></i> ${content.comments.length}
                    </span>
                </div>
                <h3 class="content-title">${content.title}</h3>
                <p class="content-excerpt">${content.content.substring(0, 100)}...</p>

                <div class="content-actions">
                    <a href="#"
                       class="btn-link"
                       data-${contentType.slice(0, -1)}-id="${content.id}"
                       data-section="${contentType}">
                        Leer más <i class="fas fa-arrow-right"></i>
                    </a>
                    <div class="content-tags">
                        <span class="tag">#${content.category}</span>
                    </div>
                </div>
                ${this.role === "admin" ? this.getAdminActionsHTML(content) : ""}
            </div>
        </article>
        `,
            )
            .join("");
    }
}
