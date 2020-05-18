"use strict";

$(main);

function main() {

    $("form").submit(validateForm);
}

function validateForm(event) {
    event.preventDefault();

    // Obtención datos
    let mail = $("#email");
    let password = $("#password");

    // Validación de los datos
    let errores = false;
    // TO-DO

    //
    if(!errores) {
	let data = {
	    "email": mail.val(),
	    "password": password.val()
	};

	$.ajax({
	    url: "http://localhost:3000/login",
	    method: "POST",
	    contentType: "application/JSON",
	    data: JSON.stringify(data),
	    success: function(data) {
		storeToken(data.accessToken);
		/**/console.log(data.accessToken);
		window.location.href = "index.php";
	    },
	    error: function(error) {
		//TO-DO
		/**/console.log(error);
	    }
	});
    }

    return false;
}


