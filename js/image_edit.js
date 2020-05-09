"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
//const isNew = urlParams.get('new');
let isNew;

let tags = [];

$(main);

function main() {

    // Habilitar botones
    $("#delete").click(deleteImage);
    $("#tags-add-btn").click(addTags);
    $("#back").attr("href", `image_detail.php?id=${id}`);
    $("form").submit(validateForm);
    
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
}

function deleteImage() {

    // TO-DO

    window.location.href = "localhost/index.php";
}

function addTags() {

    //TO-DO
}

function validateForm(event) {
    event.preventDefault();
    let errores = false;

    let title = $("#title").val();
    let description = $("#description").val();
    let url = $("#url").val();
    // tags already defined
    let date = (new Date()).toISOString();

    let data;
    if(isNew) {
	data = {
	    "url": url,
	    "title": title,
	    "description": description,
	    "tags": tags,
	    "date": date,
	    "upvotes": 0,
	    "downvotes": 0
	};
    }
    else {
    	data = {
    	    "url": url,
    	    "title": title,
    	    "description": description,
    	    "tags": tags,
    	    "date": date
    	};
    }
    
    // TO-DO Validación
    
    if(!errores){
	if(isNew) {
	    $.ajax({
	    	method: "POST",
	    	url: "http://localhost:3000/images",
	    	data: data,
	    	dataType: "json",
		success: function() {
		    window.location.href = "index.php";
		},
		error: function() {
		    console.log("Error al crear la imagen.");
		    $("#errors-container").empty();
		    $("#errors-container").append(getError("Error al crear la imagen."));
		}
	    });
	}
	else{
	    $.ajax({
		type: "PATCH",
		url: "http://localhost:3000/images/" + id,
		data: JSON.stringify(data),
		contentType: "application/json; charset=UTF-8",
		processData: false,
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
    }
    
    return !errores;
}


