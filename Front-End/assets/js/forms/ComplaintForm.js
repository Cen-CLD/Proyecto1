import { FormManager } from "../classes/FormManager.js";
import { complaintData } from "../constants.js";

export class ComplaintForm extends FormManager {
    constructor(formId) {
        const config = {
            fields: [
                {
                    name: "title",
                    selector: "#complaint-title",
                    errorMessage:
                        "Por favor, ingresa un título para la denuncia.",
                },
                {
                    name: "category",
                    selector: "#complaint-category",
                    errorMessage: "Por favor, selecciona una categoría.",
                },
                {
                    name: "content",
                    selector: "#complaint-content",
                    errorMessage:
                        "Por favor, ingresa el contenido de la denuncia.",
                },
            ],
            fileField: {
                name: "image",
                selector: "#complaint-image",
            },
            confirmationText: "¿Deseas crear esta denuncia?",
            successTitle: "¡Denuncia creada!",
            successText: "La denuncia se ha creado correctamente.",
            onSuccess: (formData) => {
                const addComplaint = (imageSrc) => {
                    const complaint = {
                        id: complaintData.length + 1,
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
                    complaintData.push(complaint);
                };

                if (formData.image) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imageSrc = e.target.result;
                        addComplaint(imageSrc);
                    };
                    reader.readAsDataURL(formData.image);
                } else {
                    const imageSrc = "../../assets/img/claims/default.jpg";
                    addComplaint(imageSrc);
                }
            },
        };

        super(formId, config);
    }
}
