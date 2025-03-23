import { FormManager } from "../classes/FormManager.js";

export class CommentForm extends FormManager {
    constructor(formId, containerId) {
        const config = {
            fields: [
                {
                    name: "comment",
                    selector: 'textarea[name="comment-text"]',
                    errorMessage: "Por favor, ingresa un comentario.",
                },
            ],
            confirmationText: "¿Deseas publicar este comentario?",
            successTitle: "¡Comentario publicado!",
            successText: "Tu comentario se ha publicado correctamente.",
            onSuccess: (formData) => {
                try {
                    const newComment = {
                        id: Date.now(),
                        author: "Usuario Actual",
                        text: formData.comment,
                        likes: 0,
                        timestamp: new Date().toISOString(),
                    };
                    this.addCommentToDOM(newComment, containerId);
                } catch (error) {
                    console.error("Error al publicar el comentario:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Hubo un problema al publicar el comentario.",
                    });
                }
            },
        };

        super(formId, config);
        this.containerId = containerId;
    }

    addCommentToDOM(comment, containerId) {
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

        const commentsContainer = document.getElementById(containerId);
        if (commentsContainer) {
            commentsContainer.prepend(commentDiv);
        } else {
            console.error(
                `No se encontró el contenedor de comentarios con ID: ${containerId}`,
            );
        }
    }
}
