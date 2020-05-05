"use strict";

function getError(message) {
    return `<div onclick='removeError(this);' class='alert alert-danger' role='alert'>
             <strong class="text-danger"><i class='fa fa-times text-danger' aria-hidden= 'true'>
               </i > Error!
             </strong>${message}
           </div>`;
}

function removeError(error) {
    $(error).fadeOut();
}

function validateForm() {
    $("#errors-container").empty();

    let errores = false;

    // Obtención datos
    let nombre = $("#nombre").val();
    let usuario = $("#usuario").val();
    let apellidos = $("#apellidos").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let repassword = $("#repassword").val();

    // Validación de los datos
    if(nombre.trim().length < 3) {
	$("#errors-container").append(
	    getError("El nombre debe tener al menos 3 caracteres de longitud.")
	);
	errores = true;
    }
    if(apellidos.trim().length < 6) {
	$("#errors-container").append(
	    getError("Los apellidos deben tener al menos 6 caracteres de longitud.")
	);
	errores = true;
    }
    if(usuario.trim().length < 6) {
	$("#errors-container").append(
	    getError("El nombre de usuario debe tener al menos 6 caracteres de longitud.")
	);
	errores = true;
    }
    if(!(new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$").test(telefono))) {
	$("#errors-container").append(
	    getError("El teléfono tiene un formato incorrecto.")
	);
    }
    if(password != repassword) {
	$("#errors-container").append(
	    getError("Las contraseñas deben ser iguales.")
	);
	errores = true;
    }
    
    return !errores;
}


