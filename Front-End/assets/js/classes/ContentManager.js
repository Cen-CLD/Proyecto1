import {
    newsData,
    initiativeData,
    complaintData,
    noticiesData,
    newsSelectors,
    initiativeSelectors,
    complaintSelectors,
    noticeSelectors,
} from "../constants.js";
import { prettifyText } from "../utils/prettify.js";

export class ContentManager {
    constructor(sectionManager) {
        this.sectionManager = sectionManager;
        this.contentTypes = {
            news: {
                data: newsData,
                containerId: "news-container",
                detailSectionId: "news-detail",
                selectors: {
                    ...newsSelectors,
                },
            },
            initiatives: {
                data: initiativeData,
                containerId: "initiatives-container",
                detailSectionId: "initiatives-detail",
                selectors: {
                    ...initiativeSelectors,
                },
            },
            complaints: {
                data: complaintData,
                containerId: "complaints-container",
                detailSectionId: "complaints-detail",
                selectors: {
                    ...complaintSelectors,
                },
            },
            notices: {
                data: noticiesData,
                containerId: "notices-container",
                detailSectionId: "notices-detail",
                selectors: {
                    ...noticeSelectors,
                },
            },
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener("click", (e) => this.handleLinkClick(e));
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
                    parseInt(btnLink.dataset.noticeId);

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

        console.log(selectors);
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

    renderContentCards(contentType) {
        const contentTypeConfig = this.contentTypes[contentType];

        if (!contentTypeConfig) {
            console.error(`Tipo de contenido "${contentType}" no encontrado.`);
            return;
        }

        const { data, containerId } = contentTypeConfig;
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(
                `Contenedor con ID "${contentTypeConfig.containerId}" no encontrado.`,
            );
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
            </div>
        </article>
    `,
            )
            .join("");
    }
}
