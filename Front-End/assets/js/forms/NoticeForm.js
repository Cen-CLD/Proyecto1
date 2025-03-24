import { FormManager } from "../classes/FormManager.js";
import { noticesData } from "../constants.js";
import { appInstance } from "../globals.js";

export class NoticeForm extends FormManager {
    constructor(formId) {
        const config = {
            fields: [
                {
                    name: "title",
                    selector: "#notice-title",
                    errorMessage: "Por favor, ingresa un título para la aviso.",
                },
                {
                    name: "category",
                    selector: "#notice-category",
                    errorMessage: "Por favor, selecciona una categoría.",
                },
                {
                    name: "content",
                    selector: "#notice-content",
                    errorMessage:
                        "Por favor, ingresa el contenido de la aviso.",
                },
            ],
            fileField: {
                name: "image",
                selector: "#notice-image",
            },
            confirmationText: "¿Deseas crear esta aviso?",
            successTitle: "¡Aviso creado!",
            successText: "El aviso se ha creado correctamente.",
            onSuccess: (formData) => {
                const addNews = (imageSrc) => {
                    const notices = {
                        id: noticesData.length + 1,
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
                    noticesData.push(notices);
                };

                if (formData.image) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        addNews(e.target.result);
                    };
                    reader.readAsDataURL(formData.image);
                } else {
                    const defaultImage = "../../assets/img/notices/default.jpg";
                    addNews(defaultImage);
                }
            },
            onAfterSuccess: () => {
                appInstance.sectionManager.showSection("notices");
                appInstance.contentManager.renderContentCards("notices");
            },
        };

        super(formId, config);
    }
}
