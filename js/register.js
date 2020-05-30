"use strict";

$(main);

function main() {

    $("form").submit(validateForm);
}

function createUser(data) {
    
    $.ajax({
	method: "POST",
	url: "http://localhost:3000/register",
	data: JSON.stringify(data),
	dataType: "json",
	contentType: "application/json; charset=UTF-8",
	processData: false,
	success: function(regData) {
	    storeToken(regData.accessToken);
	    window.location.href = "index.php";
	},
	error: function(error) {
	    console.log("Error al registrar al usuario.", error);
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Ya existe un usuario con ese email."));
	}
    });
}

function validateForm(event) {
    event.preventDefault();
    $("#errors-container").empty();

    let errores = false;

    // Obtención datos
    let nombre = $("#nombre").val();
    let usuario = $("#usuario").val();
    let apellidos = $("#apellidos").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let repassword = $("#repassword").val();
    let telefono = $("#telefono").val();

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
	errores = true;
    }
    if(password != repassword) {
	$("#errors-container").append(
	    getError("Las contraseñas deben ser iguales.")
	);
	errores = true;
    }

    if(!errores) {
	let userData = {
	    "email": email,
	    "password": password,
	    "name": nombre,
	    "surname": apellidos,
	    "phone": telefono,
	    "user": usuario
	};
	
	$.ajax({
	    method: "GET",
	    url: `http://localhost:3000/users?user=${usuario}`,
	    success: function(data) {
		if(data.length == 0) createUser(userData);
		else {
		    console.log("Error: Ya existe una cuenta con ese nombre de usuario.");
		    $("#errors-container").empty();
		    $("#errors-container").append(
			getError("Ya existe una cuenta con ese nombre de usuario.")
		    );
		}
	    },
	    error: function(error) {
		console.log("Error al acceder a la base de datos de usuarios.",error);
		$("#errors-container").empty();
		$("#errors-container").append(
		    getError("No se puedo acceder a la base de datos de usuarios.")
		);
	    }
	});
    }
    
    return !errores;
}


