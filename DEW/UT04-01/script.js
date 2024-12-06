document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("evaluationForm");
    const errorListDiv = document.getElementById("errorListDiv");
    const errorList = document.getElementById("errorList");
    const aficionesInputs = Array.from(document.querySelectorAll("input[name='Aficiones']"));
    const showPassword = document.getElementById("showPassword");

    // Mostrar/Ocultar la contraseña
    showPassword.addEventListener("change", () => {
        const passwordField = document.getElementById("Contrasena");
        passwordField.type = showPassword.checked ? "text" : "password";
    });

    // Función de validación de campos
    const validateFields = () => {
        let isValid = true;
        const errorMessages = [];
        const fieldErrors = [];

        // Validar nombre de usuario
        const nombreUsuario = document.getElementById("NombreUsuario");
        if (nombreUsuario.value.length < 4 || nombreUsuario.value.length > 20) {
            isValid = false;
            fieldErrors.push({ field: "NombreUsuario", message: "❌ El nombre de usuario no cumple los requisitos." });
        }

        // Validar contraseña
        const contrasena = document.getElementById("Contrasena");
        if (!/^\d{8}$/.test(contrasena.value)) {
            isValid = false;
            fieldErrors.push({ field: "Contrasena", message: "❌ La contraseña debe tener exactamente 8 dígitos numéricos." });
        }

        // Validar nombre
        const nombre = document.getElementById("Nombre");
        if (nombre.value.length < 4 || nombre.value.length > 20) {
            isValid = false;
            fieldErrors.push({ field: "Nombre", message: "❌ El nombre ingresado no cumple los requisitos de longitud." });
        }

        // Validar apellidos
        const apellidos = document.getElementById("Apellidos");
        if (apellidos.value.length < 4 || apellidos.value.length > 20) {
            isValid = false;
            fieldErrors.push({ field: "Apellidos", message: "❌ Los apellidos no cumplen con la longitud requerida." });
        }

        // Validar teléfono
        const telefono = document.getElementById("Telefono");
        if (!/\(\+34\)922\d{6}/.test(telefono.value)) {
            isValid = false;
            fieldErrors.push({ field: "Telefono", message: "❌ El formato del teléfono no es válido." });
        }

        // Validar código postal
        const codigoPostal = document.getElementById("CodigoPostal");
        if (!/^38\d{3}$/.test(codigoPostal.value)) {
            isValid = false;
            fieldErrors.push({ field: "CodigoPostal", message: "❌ El código postal ingresado no es válido." });
        }

        // Validar DNI/NIE
        const dniNie = document.getElementById("DniNie");
        if (dniNie.value.trim() === "") {
            isValid = false;
            fieldErrors.push({ field: "DniNie", message: "❌ Este campo es obligatorio." });
        }

        // Validar año de nacimiento
        const anioNacimiento = document.getElementById("AnioNacimiento");
        if (anioNacimiento.value < 1900 || anioNacimiento.value > 2023) {
            isValid = false;
            fieldErrors.push({ field: "AnioNacimiento", message: "❌ Año fuera del rango permitido." });
        }

        // Validar título de publicación
        const publicacionTitulo = document.getElementById("PublicacionTitulo");
        if (publicacionTitulo.value.trim() === "") {
            isValid = false;
            fieldErrors.push({ field: "PublicacionTitulo", message: "❌ Ingrese un título válido." });
        }

        // Validar descripción de publicación
        const publicacionDescripcion = document.getElementById("PublicacionDescripcion");
        if (publicacionDescripcion.value.length < 20) {
            isValid = false;
            fieldErrors.push({ field: "PublicacionDescripcion", message: "❌ Descripción demasiado corta." });
        }

        // Validar aficiones: debe seleccionar al menos 2 aficiones
        const aficionesSeleccionadas = aficionesInputs.filter(input => input.checked).map(input => input.value);
        if (aficionesSeleccionadas.length < 2) {
            isValid = false;
            fieldErrors.push({ field: "Aficiones", message: "❌ Debes seleccionar al menos dos aficiones." });
        }

        return { isValid, fieldErrors, errorMessages };
    };

    // Mostrar errores debajo de los campos
    const updateFieldErrors = () => {
        const { isValid, fieldErrors } = validateFields();
        const errorSpans = document.querySelectorAll(".error");
        errorSpans.forEach(span => span.textContent = ""); 

        fieldErrors.forEach(({ field, message }) => {
            const fieldElement = document.getElementById(field);
            const errorSpan = fieldElement.nextElementSibling;
            if (errorSpan) {
                errorSpan.textContent = message;
                errorSpan.style.display = "inline"; 
            }
        });

        return isValid;
    };

    // Mostrar errores globales en la lista
    const updateGlobalErrors = () => {
        errorList.innerHTML = ""; 
        const { isValid, errorMessages } = validateFields();

        if (!isValid) {
            errorMessages.forEach(msg => {
                const li = document.createElement("li");
                li.textContent = msg;
                errorList.appendChild(li);
            });

            // Agregar mensajes predeterminados de validación de HTML5
            const formFields = form.querySelectorAll('input, select, textarea');
            formFields.forEach((field) => {
                if (!field.validity.valid && !errorMessages.some(msg => msg.includes(field.validationMessage))) {
                    const li = document.createElement("li");
                    li.textContent = field.validationMessage; 
                    errorList.appendChild(li);
                }
            });

            errorListDiv.style.display = "block"; // Mostrar errores globales
        } else {
            errorListDiv.style.display = "none"; // Ocultar si no hay errores
        }
    };

    // Enviar el formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Limpiar errores globales y de campo antes de la validación
        updateGlobalErrors();
        const isValid = updateFieldErrors(); 

        if (isValid) {
            // Recolectar todas las aficiones seleccionadas y almacenarlas en un campo oculto
            const selectedAficiones = aficionesInputs.filter(input => input.checked).map(input => input.value);
            
            if (selectedAficiones.length >= 2) {
                const aficionesHiddenInput = document.createElement('input');
                aficionesHiddenInput.type = 'hidden';
                aficionesHiddenInput.name = 'Aficiones'; 
                aficionesHiddenInput.value = selectedAficiones.join(','); 
                form.appendChild(aficionesHiddenInput);
            }

            form.submit(); 
        }
    });
});
