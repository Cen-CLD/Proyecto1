export class ProfileEditor {
    constructor(content, renderCallback) {
        this.content = content;
        this.render = renderCallback;
    }

    showEditModal() {
        Swal.fire({
            title: "Editar perfil",
            width: "900px",
            customClass: {
                popup: "swal-wide-modal",
            },
            html: this.getFormHTML(),
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Guardar cambios",
            cancelButtonText: "Cancelar",
            preConfirm: () => this.validateForm(),
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                Object.assign(this.content, result.value);
                this.render("profile");
                Swal.fire({
                    icon: "success",
                    title: "Perfil actualizado",
                    text: "Tu información se actualizó correctamente.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        });

        this.setupPasswordToggle();
        this.setupInputFormatters();
    }

    getFormHTML() {
        const {
            name,
            last_name,
            email,
            phone,
            address,
            district,
            bibliography,
            id_card,
        } = this.content;

        return `
            <div class="swal-edit-form">
                <label for="edit-name">Nombre:</label>
                <input id="edit-name" class="swal2-input" placeholder="Nombre" value="${name}">

                <label for="edit-last-name">Apellido:</label>
                <input id="edit-last-name" class="swal2-input" placeholder="Apellido" value="${last_name}">

                <label for="edit-idcard">Cédula:</label>
                <input id="edit-idcard" class="swal2-input" placeholder="Formato: 1-2345-6789" value="${id_card}">
                <small style="font-size: 0.85rem; color: gray;">Formato válido: 1-2345-6789</small>

                <label for="edit-email">Correo:</label>
                <input id="edit-email" class="swal2-input" type="email" placeholder="Correo electrónico" value="${email}">

                <div class="password-section">
                    <button type="button" id="toggle-password-fields" class="swal2-confirm swal2-styled" style="background-color: var(--color-4); margin-bottom: 1rem;">
                        Editar contraseña
                    </button>

                    <div id="password-fields" style="display: none;">
                        <label for="edit-password">Nueva contraseña:</label>
                        <input id="edit-password" class="swal2-input" type="password" placeholder="Nueva contraseña">

                        <label for="confirm-password">Confirmar contraseña:</label>
                        <input id="confirm-password" class="swal2-input" type="password" placeholder="Confirmar contraseña">

                        <div id="password-feedback" style="font-size: 0.85rem; color: gray; margin-top: 0.3rem;"></div>

                        <div id="password-hint" style="font-size: 0.85rem; color: gray; margin-top: 0.6rem;">
                            La contraseña debe tener al menos <strong>8 caracteres</strong>, incluir <strong>una mayúscula</strong> y <strong>un carácter especial</strong> (por ejemplo: ! @ # $ %).
                        </div>
                    </div>
                </div>

                <label for="edit-phone">Teléfono:</label>
                <input id="edit-phone" class="swal2-input" placeholder="Formato: 8888 8888" value="${phone}">
                <small style="font-size: 0.85rem; color: gray;">Número costarricense de 8 dígitos</small>

                <label for="edit-address">Dirección:</label>
                <input id="edit-address" class="swal2-input" placeholder="Dirección" value="${address}">

                <label for="edit-district">Distrito:</label>
                
                <select id="edit-district" class="swal2-input" style="
                    padding: 10px;
                    border-radius: 5px;
                    border: 2px solid #1aac98;
                    font-size: 14px
                    background-color: #fff;
                    width: 400px;
                    margin-top: 5px;
                    margin-left: 40px;
                    height: 50px;
                    color: #4d326f;
                ">${["San Pedro", "Sabanilla", "Mercedes", "San Rafael"]
                    .map(
                        (d) =>
                            `<option value="${d}" ${district === d ? "selected" : ""}>${d}</option>`,
                    )
                    .join("")}
                </select>

                <label for="edit-bio">Descripción:</label>
                <textarea id="edit-bio" class="swal2-textarea" placeholder="Biografía">${bibliography}</textarea>
            </div>
        `;
    }

    setupPasswordToggle() {
        const toggleBtn = Swal.getPopup().querySelector(
            "#toggle-password-fields",
        );
        const passwordFields =
            Swal.getPopup().querySelector("#password-fields");
        const feedback = Swal.getPopup().querySelector("#password-feedback");
        const passwordInput = Swal.getPopup().querySelector("#edit-password");
        const confirmInput = Swal.getPopup().querySelector("#confirm-password");

        toggleBtn.addEventListener("click", () => {
            passwordFields.style.display =
                passwordFields.style.display === "none" ? "block" : "none";
        });

        [passwordInput, confirmInput].forEach((input) => {
            input.addEventListener("input", () => {
                const password = passwordInput.value.trim();
                const confirm = confirmInput.value.trim();
                const regex =
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

                if (!password || !confirm) {
                    feedback.textContent = "";
                } else if (password !== confirm) {
                    feedback.textContent = "❌ Las contraseñas no coinciden.";
                    feedback.style.color = "red";
                } else if (!regex.test(password)) {
                    feedback.textContent =
                        "❌ La contraseña no cumple con los requisitos.";
                    feedback.style.color = "red";
                } else {
                    feedback.textContent = "✅ Contraseña válida.";
                    feedback.style.color = "green";
                }
            });
        });
    }

    setupInputFormatters() {
        const cedulaInput = Swal.getPopup().querySelector("#edit-idcard");
        const phoneInput = Swal.getPopup().querySelector("#edit-phone");

        const formatCedula = (value) => {
            const digits = value.replace(/\D/g, "").slice(0, 9);
            if (digits.length <= 1) return digits;
            if (digits.length <= 5) return `${digits[0]}-${digits.slice(1)}`;
            return `${digits[0]}-${digits.slice(1, 5)}-${digits.slice(5)}`;
        };

        const formatPhone = (value) => {
            const digits = value.replace(/\D/g, "").slice(0, 8);
            return digits.length > 4
                ? `${digits.slice(0, 4)} ${digits.slice(4)}`
                : digits;
        };

        const setFormattedValue = (input, formatter) => {
            const raw = input.value;
            const cursor = input.selectionStart;

            const unformatted = raw.replace(/\D/g, "");
            const formatted = formatter(raw);

            // Calcular desplazamiento del cursor
            let newCursor = cursor;
            let countNonDigitsBeforeCursor = (
                raw.slice(0, cursor).match(/\D/g) || []
            ).length;
            let newCountNonDigits = (
                formatted
                    .slice(0, cursor + countNonDigitsBeforeCursor)
                    .match(/\D/g) || []
            ).length;
            newCursor = cursor + newCountNonDigits - countNonDigitsBeforeCursor;

            input.value = formatted;

            setTimeout(() => {
                input.setSelectionRange(newCursor, newCursor);
            });
        };

        cedulaInput.addEventListener("input", () => {
            setFormattedValue(cedulaInput, formatCedula);
        });

        phoneInput.addEventListener("input", () => {
            setFormattedValue(phoneInput, formatPhone);
        });
    }

    validateForm() {
        const name = document.getElementById("edit-name").value.trim();
        const lastName = document.getElementById("edit-last-name").value.trim();
        const idCard = document.getElementById("edit-idcard").value.trim();
        const email = document.getElementById("edit-email").value.trim();
        const password = document.getElementById("edit-password").value.trim();
        const confirm = document
            .getElementById("confirm-password")
            .value.trim();
        const phone = document.getElementById("edit-phone").value.trim();
        const address = document.getElementById("edit-address").value.trim();
        const district = document.getElementById("edit-district").value;
        const bibliography = document.getElementById("edit-bio").value.trim();

        const isEditingPassword =
            document.getElementById("password-fields").style.display !== "none";
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        const cedulaRegex = /^[1-7]-\d{4}-\d{4}$/;
        const phoneRegex = /^\d{4} \d{4}$/;

        if (
            !name ||
            !lastName ||
            !email ||
            !idCard ||
            !phone ||
            !address ||
            !district ||
            !bibliography
        ) {
            Swal.showValidationMessage("Todos los campos son obligatorios.");
            return false;
        }

        if (!cedulaRegex.test(idCard)) {
            Swal.showValidationMessage(
                "La cédula debe tener el formato 1-2345-6789.",
            );
            return false;
        }

        if (!phoneRegex.test(phone)) {
            Swal.showValidationMessage(
                "El teléfono debe tener el formato 8888 8888.",
            );
            return false;
        }

        if (isEditingPassword) {
            if (!password || !confirm) {
                Swal.showValidationMessage(
                    "Debes llenar ambos campos de contraseña.",
                );
                return false;
            }

            if (!passwordRegex.test(password)) {
                Swal.showValidationMessage(
                    "La contraseña no cumple con los requisitos.",
                );
                return false;
            }

            if (password !== confirm) {
                Swal.showValidationMessage("Las contraseñas no coinciden.");
                return false;
            }
        }

        return {
            name,
            last_name: lastName,
            id_card: idCard,
            email,
            password: isEditingPassword ? password : this.content.password,
            phone,
            address,
            district,
            bibliography,
        };
    }
}
