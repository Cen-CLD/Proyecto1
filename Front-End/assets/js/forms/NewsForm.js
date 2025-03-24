import { FormManager } from "../classes/FormManager.js";
import { newsData } from "../constants.js";
import { appInstance } from "../globals.js";

export class NewsForm extends FormManager {
    constructor(formId) {
        const config = {
            fields: [
                {
                    name: "title",
                    selector: "#new-title",
                    errorMessage:
                        "Por favor, ingresa un título para la noticia.",
                },
                {
                    name: "category",
                    selector: "#new-category",
                    errorMessage: "Por favor, selecciona una categoría.",
                },
                {
                    name: "content",
                    selector: "#new-content",
                    errorMessage:
                        "Por favor, ingresa el contenido de la noticia.",
                },
            ],
            fileField: {
                name: "image",
                selector: "#new-image",
            },
            confirmationText: "¿Deseas crear esta noticia?",
            successTitle: "¡Noticia creada!",
            successText: "La noticia se ha creado correctamente.",
            onSuccess: (formData) => {
                const addNews = (imageSrc) => {
                    const news = {
                        id: newsData.length + 1,
                        title: formData.title,
                        date: new Date().toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        }),
                        category: formData.category,
                        image: imageSrc,
                        content: formData.content,
                        comments: [],
                    };
                    newsData.push(news);
                };

                if (formData.image) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        addNews(e.target.result);
                    };
                    reader.readAsDataURL(formData.image);
                } else {
                    const defaultImage = "../../assets/img/news/default.jpg";
                    addNews(defaultImage);
                }
            },
            onAfterSuccess: () => {
                appInstance.sectionManager.showSection("news");
                appInstance.contentManager.renderContentCards("news");
            },
        };

        super(formId, config);
    }
}
