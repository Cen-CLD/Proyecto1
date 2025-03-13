import {
    newsData,
    initiativeData,
    claimData,
    newsSelectors,
    initiativeSelectors,
} from "./constants.js";
import { prettifyText } from "./utils/prettify.js";

document.addEventListener("DOMContentLoaded", () => {
    try {
        const welcomeSection = document.getElementById("welcome");
        const newsDetailSection = document.getElementById("news-detail");
        const initiativesDetailSection =
            document.getElementById("initiatives-detail");
        const allSections = document.querySelectorAll(".right section");
        const menuLinks = document.querySelectorAll(".sidebar a");

        const showSection = (section) => {
            try {
                allSections.forEach((s) => {
                    s.style.display = s === section ? "flex" : "none";
                });
            } catch (error) {
                console.error("Error al mostrar la sección:", error);
            }
        };

        const showWelcome = () => {
            try {
                showSection(welcomeSection);
                menuLinks.forEach((link) => link.classList.remove("active"));
            } catch (error) {
                console.error(
                    "Error al mostrar la sección de bienvenida:",
                    error,
                );
            }
        };

        const showContentDetail = (
            contentId,
            contentData,
            section,
            selectors,
        ) => {
            try {
                const content = contentData.find(
                    (item) => item.id === contentId,
                );

                if (content) {
                    selectors.image.src = content.image;
                    selectors.date.textContent = content.date;
                    selectors.category.textContent = content.category;
                    selectors.title.textContent = content.title;
                    selectors.body.innerHTML = prettifyText(content.content);
                    showSection(section);
                }
            } catch (error) {
                console.error(
                    "Error al mostrar el detalle del contenido:",
                    error,
                );
            }
        };

        showWelcome();

        document.addEventListener("click", (e) => {
            try {
                if (
                    e.target.closest("#home-page") ||
                    e.target.closest("#logoInicio")
                ) {
                    e.preventDefault();
                    showWelcome();
                }
            } catch (error) {
                console.error(
                    "Error al manejar el clic en el logo o enlace de inicio:",
                    error,
                );
            }
        });

        menuLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                try {
                    e.preventDefault();

                    const target = link.dataset.target;
                    const targetSection = document.querySelector(
                        `[data-section="${target}"]`,
                    );
                    if (targetSection) {
                        menuLinks.forEach((l) => l.classList.remove("active"));
                        link.classList.add("active");

                        showSection(targetSection);
                    }
                } catch (error) {
                    console.error(
                        "Error al manejar el clic en el enlace del menú:",
                        error,
                    );
                }
            });
        });

        const createInitiativeButton = document.getElementById(
            "btn-create-initiative",
        );
        const initiativeFormSection =
            document.getElementById("initiatives-form");

        createInitiativeButton.addEventListener("click", (e) => {
            try {
                e.preventDefault();
                showSection(initiativeFormSection);
            } catch (error) {
                console.error(
                    "Error al manejar el clic en el botón de crear iniciativa:",
                    error,
                );
            }
        });

        const backToInitiativesBtn = document.getElementById(
            "back-to-initiatives",
        );
        const initiativesSection = document.getElementById("initiatives");

        backToInitiativesBtn.addEventListener("click", (e) => {
            try {
                e.preventDefault();
                showSection(initiativesSection);
            } catch (error) {
                console.error(
                    "Error al manejar el clic en el botón de volver a iniciativas:",
                    error,
                );
            }
        });

        document
            .getElementById("initiativeForm")
            .addEventListener("submit", function (event) {
                try {
                    event.preventDefault();

                    const title = document
                        .getElementById("initiative-title")
                        .value.trim();
                    const category = document.getElementById(
                        "initiative-category",
                    ).value;
                    const content = document
                        .getElementById("initiative-content")
                        .value.trim();
                    const imageFile =
                        document.getElementById("initiative-image").files[0];

                    if (!title) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Por favor, ingresa un título para la iniciativa.",
                        });
                        return;
                    }

                    if (!category) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Por favor, selecciona una categoría.",
                        });
                        return;
                    }

                    if (!content) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Por favor, ingresa el contenido de la iniciativa.",
                        });
                        return;
                    }

                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "¿Deseas crear esta iniciativa?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Sí, crear",
                        cancelButtonText: "Cancelar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const initiative = {
                                id: initiativeData.length + 1,
                                title: title,
                                date: new Date().toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }),
                                category: category,
                                image: imageFile
                                    ? URL.createObjectURL(imageFile)
                                    : "../../assets/img/iniciatives/default.jpg",
                                content: content,
                                comments: [],
                            };

                            initiativeData.push(initiative);
                            renderInitiative(initiative);

                            Swal.fire({
                                icon: "success",
                                title: "¡Iniciativa creada!",
                                text: "La iniciativa se ha creado correctamente.",
                            });

                            document.getElementById("initiativeForm").reset();
                            showSection(initiativesSection);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Ha ocurrido un error",
                                text: "Por favor intente nuevamente",
                            });
                        }
                    });
                } catch (error) {
                    console.error(
                        "Error al manejar el envío del formulario de iniciativa:",
                        error,
                    );
                }
            });

        function renderInitiative(initiative) {
            try {
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
            } catch (error) {
                console.error("Error al renderizar la iniciativa:", error);
            }
        }

        document.addEventListener("click", (e) => {
            try {
                const btnLink = e.target.closest(".btn-link");

                if (btnLink) {
                    e.preventDefault();

                    const newsId = parseInt(btnLink.dataset.newsId);
                    const initiativeId = parseInt(
                        btnLink.dataset.initiativesId,
                    );

                    if (!isNaN(newsId)) {
                        showContentDetail(
                            newsId,
                            newsData,
                            newsDetailSection,
                            newsSelectors,
                        );
                    }

                    if (!isNaN(initiativeId)) {
                        showContentDetail(
                            initiativeId,
                            initiativeData,
                            initiativesDetailSection,
                            initiativeSelectors,
                        );
                    }
                }
            } catch (error) {
                console.error(
                    "Error al manejar el clic en el botón de enlace:",
                    error,
                );
            }
        });

        document
            .getElementById("back-to-news")
            .addEventListener("click", () => {
                try {
                    showNews();
                } catch (error) {
                    console.error(
                        "Error al manejar el clic en el botón de volver a noticias:",
                        error,
                    );
                }
            });

        document.addEventListener("submit", (e) => {
            try {
                if (
                    e.target.matches("#comment-form, #initiative-comment-form")
                ) {
                    e.preventDefault();

                    const commentInput = e.target.querySelector(
                        'textarea[name="comment-text"]',
                    );
                    const commentText = commentInput.value.trim();

                    if (!commentText) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Por favor, ingresa un comentario.",
                        });
                        return;
                    }

                    const newComment = {
                        id: Date.now(),
                        author: "Usuario Actual",
                        text: commentText,
                        likes: 0,
                        timestamp: new Date().toISOString(),
                    };

                    if (e.target.id === "comment-form") {
                        addCommentToDOM(newComment, "comments-list");
                    } else if (e.target.id === "initiative-comment-form") {
                        addCommentToDOM(newComment, "initiative-comments-list");
                    }

                    // Limpiar el campo de texto
                    commentInput.value = "";
                }
            } catch (error) {
                console.error(
                    "Error al manejar el envío del formulario de comentario:",
                    error,
                );
            }
        });
        function addCommentToDOM(comment, containerId) {
            try {
                const commentDiv = document.createElement("div");
                commentDiv.className = "comment";
                commentDiv.innerHTML = `
      <div class="comment-header">
        <span class="comment-author">${comment.author}</span>
        <span class="comment-date">${new Date(comment.timestamp).toLocaleDateString()}</span>
      </div>
      <p class="comment-text">${comment.text}</p>
      <div class="comment-actions">
        <button class="btn-like">👍 ${comment.likes}</button>
        <button class="btn-reply">Responder</button>
      </div>
    `;

                // Agregar el comentario al contenedor correspondiente
                const commentsContainer = document.getElementById(containerId);
                if (commentsContainer) {
                    commentsContainer.prepend(commentDiv);
                } else {
                    console.error(
                        `No se encontró el contenedor de comentarios con ID: ${containerId}`,
                    );
                }
            } catch (error) {
                console.error("Error al agregar el comentario al DOM:", error);
            }
        }
    } catch (error) {
        console.error("Error durante la carga del DOM:", error);
    }
});
