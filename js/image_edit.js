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
	    	dataType: "json"
	    });
	    // $.post(
	    // 	"http://localhost:3000/images/",
	    // 	JSON.stringify(data),
	    // 	null
	    // );
	}
    }
    
    return !errores;
}


