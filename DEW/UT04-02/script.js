export const validateFields = () => {
    let isValid = true;
    const errorMessages = [];
    const fieldErrors = [];
  
    // Validación de Nombre de Usuario
    const nombreUsuario = document.getElementById("NombreUsuario");
    if (!nombreUsuario.value || nombreUsuario.value.length < 4 || nombreUsuario.value.length > 20) {
      isValid = false;
      fieldErrors.push({ field: "NombreUsuario", message: "El nombre de usuario debe tener entre 4 y 20 caracteres." });
    }
  
    // Validación de Contraseña
    const contrasena = document.getElementById("Contrasena");
    const contrasenaPattern = /^\d{8}$/; 
    if (!contrasena.value || !contrasenaPattern.test(contrasena.value)) {
      isValid = false;
      fieldErrors.push({ field: "Contrasena", message: "La contraseña debe ser un número de 8 dígitos." });
    }
  
    // Validación de Nombre
    const nombre = document.getElementById("Nombre");
    if (!nombre.value || nombre.value.length < 4 || nombre.value.length > 20) {
      isValid = false;
      fieldErrors.push({ field: "Nombre", message: "El nombre debe tener entre 4 y 20 caracteres." });
    }
  
    // Validación de Apellidos
    const apellidos = document.getElementById("Apellidos");
    if (!apellidos.value || apellidos.value.length < 4 || apellidos.value.length > 20) {
      isValid = false;
      fieldErrors.push({ field: "Apellidos", message: "Los apellidos deben tener entre 4 y 20 caracteres." });
    }
  
    // Validación de Teléfono
    const telefono = document.getElementById("Telefono");
    const telefonoPattern = /\(\+34\)922\d{6}/; 
    if (!telefono.value || !telefonoPattern.test(telefono.value)) {
      isValid = false;
      fieldErrors.push({ field: "Telefono", message: "El teléfono debe tener el formato (+34)922123123." });
    }
  
    // Validación de Código Postal
    const codigoPostal = document.getElementById("CodigoPostal");
    const codigoPostalPattern = /^38\d{3}$/; 
    if (!codigoPostal.value || !codigoPostalPattern.test(codigoPostal.value)) {
      isValid = false;
      fieldErrors.push({ field: "CodigoPostal", message: "El código postal debe comenzar con 38 y tener 5 dígitos." });
    }
  
    // Validación de Tipo de Documento
    const tipoDocumento = document.getElementById("TipoDocumento");
    if (!tipoDocumento.value) {
      isValid = false;
      fieldErrors.push({ field: "TipoDocumento", message: "Debes seleccionar un tipo de documento." });
    }
  
    // Validación de DNI/NIE
    const dniNie = document.getElementById("DniNie");
    if (!dniNie.value) {
      isValid = false;
      fieldErrors.push({ field: "DniNie", message: "Debes introducir tu DNI o NIE." });
    }
  
    // Validación de Cuenta Como
    const cuentaComo = document.getElementById("CuentaComo");
    if (!cuentaComo.value) {
      isValid = false;
      fieldErrors.push({ field: "CuentaComo", message: "Debes seleccionar si eres Particular o Empresa." });
    }
  
    // Validación de Año de Nacimiento
    const anioNacimiento = document.getElementById("AnioNacimiento");
    if (!anioNacimiento.value || anioNacimiento.value < 1920 || anioNacimiento.value > 2010) {
      isValid = false;
      fieldErrors.push({ field: "AnioNacimiento", message: "El año de nacimiento debe estar entre 1920 y 2010." });
    }
    // Validación de Título de Publicación
    const publicacionTitulo = document.getElementById("PublicacionTitulo");
    if (!publicacionTitulo.value || publicacionTitulo.value.length < 4 || publicacionTitulo.value.length > 15) {
      isValid = false;
      fieldErrors.push({ field: "PublicacionTitulo", message: "El título de la publicación debe tener entre 4 y 15 caracteres." });
    }
  
    // Validación de Descripción de Publicación
    const publicacionDescripcion = document.getElementById("PublicacionDescripcion");
    if (!publicacionDescripcion.value || publicacionDescripcion.value.length < 4 || publicacionDescripcion.value.length > 120) {
      isValid = false;
      fieldErrors.push({ field: "PublicacionDescripcion", message: "La descripción de la publicación debe tener entre 4 y 120 caracteres." });
    }
    // Validación de Aficiones
    const aficionesInputs = Array.from(document.querySelectorAll("input[name='Aficiones']"));
    const aficionesSeleccionadas = aficionesInputs.filter(input => input.checked);
    if (aficionesSeleccionadas.length < 2) {
        isValid = false;
        fieldErrors.push({ field: "Aficiones", message: "Debes seleccionar al menos 2 aficiones." });
    }
    return { isValid, fieldErrors, errorMessages };
};
  
export const updateFieldErrors = () => {
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
  
export const updateGlobalErrors = (errorList, errorListDiv) => {
errorList.innerHTML = ""; 
const { isValid, errorMessages } = validateFields();

if (!isValid) {
    errorMessages.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg;
    errorList.appendChild(li);
    });

    // Agregar mensajes predeterminados de validación de HTML5
    const formFields = document.querySelectorAll('input, select, textarea');
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
  