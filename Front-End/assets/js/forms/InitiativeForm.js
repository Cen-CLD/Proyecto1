import { FormManager } from "../classes/FormManager.js";
import { initiativeData } from "../constants.js";
import { appInstance } from "../globals.js";

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
                const addInitiative = (imageSrc) => {
                    const initiative = {
                        id: initiativeData.length + 1,
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
                    initiativeData.push(initiative);
                };

                if (formData.image) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        addInitiative(e.target.result);
                    };
                    reader.readAsDataURL(formData.image);
                } else {
                    const defaultImage =
                        "../../assets/img/iniciatives/default.jpg";
                    addInitiative(defaultImage);
                }
            },
            onAfterSuccess: () => {
                appInstance.sectionManager.showSection("initiatives");
                appInstance.contentManager.renderContentCards("initiatives");
            },
        };

        super(formId, config);
    }
}
