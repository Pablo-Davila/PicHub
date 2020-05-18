"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let isNew;

let tags = [];

$(main);

function main() {

    // Habilitar botones
    $("#tags-add-btn").click(addTags);
    if(id == null) {
	$("#back").attr("href", `index.php`);
    }
    else {
	$("#back").attr("href", `image_detail.php?id=${id}`);
    }
    $("form").submit(validateForm);
    $("#delete").click(deleteImage);
    
    // Cargar imagen
    if(id == undefined) isNew = true;
    else loadSinglePhoto(id, true);

    // Actualizar imagen al cambiar la URL
    let url_input = $("#url");
    url_input.change(function() {
	if(/\.jpg$/i.test(url_input.val()) || /\.png$/i.test(url_input.val())) {
	    $("#imagen").attr("src", $("#url").val());
	}
    });

    // Comprobar palabras prohibidas al modificar
    $("#title").change( function() {
	fixBadWords($("#title"));
    });
    $("#description").change( function() {
	fixBadWords($("#description"));
    });
}

function addTags() {

    //TO-DO
}

function validateForm(event) {
    event.preventDefault();
    
    fixBadWords($("#title"));
    fixBadWords($("#description"));

    let title = $("#title").val();
    let description = $("#description").val();
    let url = $("#url").val();
    // tags already defined
    let date = (new Date()).toISOString();
    let priv = $("#private").prop("checked");

    // Datos a enviar
    let data;
    if(isNew) {
	data = {
	    "url": url,
	    "title": title,
	    "description": description,
	    "tags": tags,
	    "date": date,
	    "private": priv,
	    "upvotes": 0,
	    "downvotes": 0,
	    "userId": getUserId()
	};
    }
    else {
    	data = {
    	    "url": url,
    	    "title": title,
    	    "description": description,
    	    "tags": tags,
    	    "date": date,
	    "private": priv,
	    "userId": getUserId()
    	};
    }
    
    if(isNew) {
	// Crear una nueva imagen
	$.ajax({
	    method: "POST",
	    url: "http://localhost:3000/images",
	    data: JSON.stringify(data),
	    dataType: "json",
	    contentType: "application/json; charset=UTF-8",
	    processData: false,
	    headers: {
		"Authorization": "Bearer " + getToken()
	    },
	    success: function() {
		window.location.href = "index.php";
	    },
	    error: function(error) {
		console.log("Error al crear la imagen.");
		console.log(error);
		$("#errors-container").empty();
		$("#errors-container").append(getError("Error al crear la imagen."));
	    }
	});
    }
    else {
	// Editar una imagen existente
	$.ajax({
	    type: "PATCH",
	    url: "http://localhost:3000/images/" + id,
	    data: JSON.stringify(data),
	    contentType: "application/json; charset=UTF-8",
	    processData: false,
	    headers: {
		"Authorization": "Bearer " + getToken()
	    },
	    success: function() {
		window.location.href = "index.php";
	    },
	    error: function(error) {
		console.log("Error al editar la imagen.");
		$("#errors-container").empty();
		$("#errors-container").append(getError("Error al crear la imagen."));
	    }
	});
    }
    
    return true;
}


