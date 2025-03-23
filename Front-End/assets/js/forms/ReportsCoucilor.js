import { FormManager } from "../classes/FormManager";

export class ContactForm extends FormManager {
    constructor(formId) {
        const config = {
            fields: [
                {
                    name: "name",
                    selector: "#contact-name",
                    errorMessage: "Por favor, ingresa tu nombre.",
                },
                {
                    name: "email",
                    selector: "#contact-email",
                    errorMessage: "Por favor, ingresa un correo válido.",
                },
            ],
            confirmationText: "¿Deseas enviar este mensaje?",
            successTitle: "¡Mensaje enviado!",
            successText: "Tu mensaje se ha enviado correctamente.",
            onSuccess: (formData) => {
                console.log("Mensaje enviado:", formData);
            },
        };

        super(formId, config);
    }
}