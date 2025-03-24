export class FormManager {
    constructor(formId, config) {
        this.formId = formId;
        this.form = document.getElementById(formId);
        this.config = config;
        this.init();
    }

    init() {
        if (this.form) {
            this.form.setAttribute("novalidate", true);
            this.form.addEventListener("submit", (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = this.getFormData();
        if (this.validateForm(formData)) {
            this.showConfirmationDialog(formData);
        }
    }

    getFormData() {
        const formData = {};
        this.config.fields.forEach((field) => {
            formData[field.name] = this.form
                .querySelector(field.selector)
                .value.trim();
        });
        if (this.config.fileField) {
            formData[this.config.fileField.name] = this.form.querySelector(
                this.config.fileField.selector,
            ).files[0];
        }
        return formData;
    }

    validateForm(formData) {
        for (const field of this.config.fields) {
            if (!formData[field.name]) {
                Swal.fire({
                    icon: "warning",
                    title: "Error",
                    text:
                        field.errorMessage ||
                        `Por favor, completa el campo ${field.name}.`,
                });
                return false;
            }
        }
        return true;
    }

    showConfirmationDialog(formData) {
        Swal.fire({
            title: "¿Estás seguro?",
            text:
                this.config.confirmationText ||
                "¿Deseas enviar este formulario?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, enviar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                this.handleFormSuccess(formData);
            }
        });
    }

    handleFormSuccess(formData) {
        if (this.config.onSuccess) {
            this.config.onSuccess(formData);
        }

        Swal.fire({
            icon: "success",
            title: this.config.successTitle || "¡Éxito!",
            text:
                this.config.successText ||
                "El formulario se ha enviado correctamente.",
        }).then(() => {
            if (this.config.onAfterSuccess) {
                this.config.onAfterSuccess();
            }

            this.form.reset();
        });
    }
}
