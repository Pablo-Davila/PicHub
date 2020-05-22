"use strict";

$(main);

function main() {

    // Mostrar listado de etiquetas
    displayTags();

    // Habilitar nueva etiqueta
    $("#tags-add-btn").click(function() {
	if($("#newTag").val() != "") newTag();
    });
}

function displayTags() {
    $.ajax({
	method: "GET",
	url: "http://localhost:3000/tags",
	success: function(data) {
	    $("#lista").empty();
	    for(let tag of data) {
		let tag_str = `
                    <span class="badge badge-primary rounded-pill px-2 mx-2 fs-16px">
 		      ${tag.name}
	            </span>`;
		$("#lista").append($.parseHTML(tag_str));
		$("#lista>span").last().click(function(){ search(tag.id);});
	    }
	},
	error: function(error) {
	    console.log("Error al acceder a las etiquetas del sistema.");
	    $("#errors-container").append(getError("No se ha podido acceder a las etiquetas del sistema."));
	}
    });
}

function search(id) {
    console.log("Cargando imágenes");
    
    new Promise((resolve,reject) => {
	$.ajax({
            url: "http://localhost:3000/images?private=false&_sort=date&_order=desc",
            success: resolve,
            error: reject
	});
    }).then( function(data) {
	$("#msg").remove();
	$("#images").empty();
	$("#images").append($("<div></div>", {"class": "row w-99"}));
	let row = $("#images > div.row").last();
	let autores = new Set();
	let etiquetas = new Set();
	let cont = 0;
	for(let image of data) {
	    if(image.tags.includes(id)) {
		cont++;
		
		// HTML de la tarjeta
		let card_str = `
    	<div class="col-md text-center max-w-33">
          <div class="card border-dark mb-4">
            <a href="image_detail.php?id=${image.id}">
	      <div class="embed-responsive embed-responsive-4by3">
		<img class="card-img-top embed-responsive-item"
		     src=${image.url}>
	      </div>
            </a>

            <div class="card-body bg-dark">
              <h5 class="card-title">${image.title}</h5>
              <a name="auth-${image.userId}" href="" class="card-text">x</a>
              <hr>
              <p class="card-text">
		Etiquetas:
              </p>
            </div>
          </div>
	</div>`;
		
		row.append($.parseHTML(card_str));
		autores.add(image.userId);
		
		// Etiquetas
		let tagList = $("p.card-text").last();
		if(image.tags != undefined) {
		    for(let tag of image.tags) {
			let tag_src = `<span name="tag-${tag}" class="badge badge-primary"></span>`;
			tagList.append($.parseHTML(tag_src));
			etiquetas.add(tag);
		    }
		    $("span.badge").after(" "); // Separar etiquetas
		}
		else tagList.text("Sin etiquetas");

		// Cambio de fila
		if(cont%3 == 0) {
		    let new_row = $("<div></div>", {"class": "row w-99"});
		    $("#images").append(new_row);
		    row = new_row;
		}
	    }

	    // Actualizar nombres de autores y etiquetas
	    for(let a of autores) updateAuthorName(a);
	    for(let t of etiquetas) updateTagName(t);
	}
    }).catch(
	function (error) {
	    console.log("Error al acceder a las imágenes: " + error.toString());
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("No se pudo cargar las imágenes."));
        }
    );
}

function newTag() {
    let data = {
	name: $("#newTag").val().toLowerCase()
    };
    
    $.ajax({
	method: "POST",
	url: "http://localhost:3000/tags",
	data: JSON.stringify(data),
	dataType: "json",
	contentType: "application/json; charset=UTF-8",
	processData: false,
	headers: {
	    "Authorization": "Bearer " + getToken()
	},
	success: function() {
	    $("#newTag").val("");
	    displayTags();
	    console.log("Etiqueta creada");
	},
	error: function (error) {
	    console.log("Error al crear la etiqueta.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("No se pudo crear la etiqueta."));
        }
    });
}


