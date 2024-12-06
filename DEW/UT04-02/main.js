import { validateFields, updateFieldErrors, updateGlobalErrors } from './script.js';

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

  // Enviar el formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Limpiar errores globales y de campo antes de la validación
    updateGlobalErrors(errorList, errorListDiv);
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
