"use strict";

// Límite de imágenes por usuario
let lim = 50;

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let isNew;

let tags = [];
let dic;

$(main);

function main() {

    // Expulsar usuarios no autenticados
    kickNonAuthenticated();
    
    // Habilitar botones
    if(id == null) {
	$("#back").attr("href", `index.php`);
    }
    else {
	$("#back").attr("href", `image_detail.php?id=${id}`);
    }
    $("#delete").click(deleteImage);
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/comments?imageId=${id}`,
	success: function(data) {
	    if(data.length == 0) $("#private").attr("disabled", false);
	},
	error: function(error) {
	    console.log("Error: No se ha podido comprobar que la foto no tenga comentarios, por lo que no se podrá modificar su privacidad.");
	}
    });

    // Comprobar límite de fotos y habilitar submit
    moreThanFifty(getUserId());
    
    // Cargar imagen
    if(id == undefined) isNew = true;
    else loadSinglePhoto(id, true);

    // Actualizar imagen al cambiar la URL
    let url_input = $("#url");
    url_input.change( function() {
	if(/\.jpg$/i.test(url_input.val())
	   || /\.png$/i.test(url_input.val())
	   || /\.jpeg$/i.test(url_input.val())
	   || /\.gif$/i.test(url_input.val())) {
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

    // Etiquetas
    $("#tags-add-btn").click(newTag);
}

function moreThanFifty(userId) {
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/images?userId=${userId}`,
	success: function(data) {
	    if(data.length >= lim) {
		console.log("Error: Ya ha alcanzado el límite de 50 imágenes");
		$("#errors-container").append(getError("Ya ha alcanzado el límite de 50 imágenes."));
	    }
	    else {
		let save_html = `
		  <button id="save" type="submit" class="btn btn-success">
		    Guardar
		  </button>`;
		$("#actions").append($.parseHTML(save_html));
		$("form").submit(validateForm);
	    }
	},
	error: function(error) {
	    console.log(error);
	}
    });
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

    // Enviar datos
    let data;
    if(isNew) {
	data = {
	    "url": url,
	    "title": title,
	    "description": description,
	    "tags": tags,
	    "date": date,
	    "private": priv,
	    "userId": getUserId()
	};
	
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
		$("#errors-container").empty();
		$("#errors-container").append(getError("No se ha podido crear la imagen."));
	    }
	});
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
		$("#errors-container").append(getError("No se ha podido editar la imagen."));
	    }
	});
    }
    
    return true;
}

// Tags
function updateTagOptions() {
    $.ajax({
	method: "GET",
	url: "http://localhost:3000/tags",
	success: function(data) {
	    $("#tagSelect").empty();
	    dic = new Map();
	    for(let t of data){
		if(!tags.includes(t.id)) {
		    let opt_str = `<option>${t.name}</option>`;
		    $("#tagSelect").append($.parseHTML(opt_str));
		}
		dic.set(t.name, t.id);
	    }
	},
	error: function(error) {
	    console.log("Error al acceder a las etiquetas del sistema.");
	    $("#errors-container").append(getError("No se pudo acceder a las etiquetas del sistema."));
	}
    });
}

function newTag() {
    let tagName = $("#tagSelect").val();
    tags.push(dic.get(tagName));
    let tag_src = `
      <span class="badge badge-primary">
        <span>${tagName}</span>
        <span name="${dic.get(tagName)} onclick="removeTag(this);" class="txt-sdark""> x</span>
      </span>`;
    $("#tags-selected").append($.parseHTML(tag_src));
    updateTagOptions();
}

function removeTag(tagX) {
    let tagId = $(tagX).attr("name");
    $(tagX).parent().fadeOut();
    for(let i=0; i<tags.length; i++){
	if(tags[i] == tagId) {
	    tags.splice(i,1);
	    break;
	}
    }
}


