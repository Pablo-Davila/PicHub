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
    /**/console.log("Empezamos...");
    let errores = false;

    let title = $("#title").val();
    let description = $("#description").text();
    let url = $("#url").val();
    // tags already defined
    let date = new Date().toString();

    console.log(tags);
    let data = {
	"url": url,
	"title": title,
	"description": description,
	"tags": [],
	"date": date,
	"upvotes": 0,
	"downvotes": 0
    };
    
    // TO-DO Validación
    
    if(!errores){
	if(isNew) {
	    $.ajax({
	    	method: "POST",
	    	url: "http://localhost:3000/images",
	    	data: data,
	    	dataType: "json",
		success: function() {
		    window.location.href = `image_detail.php?id=${id}`;
		},
		error: function() {
		    console.log("Error al crear la imagen.");
		    $("#errors-container").append(getError("Error al crear la imagen"));
		}
	    });
	}
	else{
	    $.ajax({
		method: "PATCH",
		url: "http://localhost:3000/images",
		data: data,
		dataType: "json",
		success: function() {
		    window.location.href = "index.php";
		},
		error: function() {
		    console.log("Error al editar la imagen.");
		    $("#errors-container").append(getError("Error al crear la imagen"));
		}
	    });
	}
    }
    
    return !errores;
}


