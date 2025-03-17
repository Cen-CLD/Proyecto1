import { FormManager } from "../classes/FormManager.js";
import { initiativeData } from "../constants.js"; // In future will be the API service

export class InitiativeForm extends FormManager {
    constructor(formId) {
        const config = {
            fields: [
                {
                    name: "title",
                    selector: "#initiative-title",
                    errorMessage:
                        "Por favor, ingresa un título para la iniciativa.",
                },
                {
                    name: "category",
                    selector: "#initiative-category",
                    errorMessage: "Por favor, selecciona una categoría.",
                },
                {
                    name: "content",
                    selector: "#initiative-content",
                    errorMessage:
                        "Por favor, ingresa el contenido de la iniciativa.",
                },
            ],
            fileField: {
                name: "image",
                selector: "#initiative-image",
            },
            confirmationText: "¿Deseas crear esta iniciativa?",
            successTitle: "¡Iniciativa creada!",
            successText: "La iniciativa se ha creado correctamente.",
            onSuccess: (formData) => {
                try {
                    const initiative = {
                        id: initiativeData.length + 1,
                        title: formData.title,
                        date: new Date().toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        }),
                        category: formData.category,
                        image: formData.image
                            ? URL.createObjectURL(formData.image)
                            : "../../assets/img/iniciatives/default.jpg",
                        content: formData.content,
                        comments: [],
                    };
                } catch (error) {
                    console.error("Error al crear la iniciativa:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Hubo un problema al crear la iniciativa.",
                    });
                }
            },
        };

        super(formId, config);
    }

    renderInitiative(initiative) {
        const excerpt = initiative.content.substring(0, 100) + "...";

        const article = document.createElement("article");
        article.className = "content-card";

        article.innerHTML = `
            <div class="content-image">
                <img src="${initiative.image}" alt="${initiative.title}" />
                <span class="content-category">${initiative.category}</span>
            </div>
            <div class="content">
                <div class="content-meta">
                    <span class="content-date"><i class="far fa-calendar"></i> ${initiative.date}</span>
                    <span class="content-comments"><i class="far fa-comment"></i> ${initiative.comments.length}</span>
                </div>
                <h3 class="content-title">${initiative.title}</h3>
                <p class="content-excerpt">${excerpt}</p>
                <div class="content-actions">
                    <a href="#" class="btn-link">Leer más <i class="fas fa-arrow-right"></i></a>
                    <div class="content-tags">
                        <span class="tag">#${initiative.category}</span>
                    </div>
                </div>
            </div>
        `;

        const initiativesContainer = document.querySelector(
            "#initiatives-container",
        );
        initiativesContainer.appendChild(article);
    }
}
