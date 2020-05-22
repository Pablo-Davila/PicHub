"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(main);

function main() {

    // Cargar imagen
    loadSinglePhoto(id, false);
    
    if(getToken() != null) {
	
	// Allow new comments
	$("#newComment").attr("disabled", false);
	$("#newComment").attr("placeholder", "Escribe un nuevo comentario.");
	let btn_str = `
	  <button id="submitbtn"
		  class="btn btn-info d-block ml-auto mr-0 w-auto">
	    Enviar
	  </button>`;
	$("#form").append($.parseHTML(btn_str));
	$("#submitbtn").click(newComment);
	
	// Cargar comentarios
	loadComments();
    }
}

function newComment() {
    if($("#newComment").val() == "") return;
    
    let data = {
	"imageId": id,
	"userId": getUserId(),
	"text": $("#newComment").val(),
	"date": (new Date()).toISOString()
    };
    $("#newComment").val("");
    
    $.ajax({
	method: "POST",
	url: "http://localhost:3000/comments",
	data: JSON.stringify(data),
	dataType: "json",
	contentType: "application/json; charset=UTF-8",
	processData: false,
	headers: {
	    "Authorization": "Bearer " + getToken()
	},
	success: loadComments,
	error: function(error) {
	    console.log("Error al crear la imagen.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("No se ha podido crear la imagen."));
	}
    });
}

function loadComments() {
    $("#old-comments").empty();
    
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/comments?imageId=${id}&_sort=date&_order=desc`,
	success: function(data) {
	    for(let c of data) {
		let comment_str = `
	  <div class="col-row mb-2">
	    <div class="bg-dark rounded p-3">
	      <h5><a name="auth-${c.userId}" href="profile.php?id=${c.userId}"></a></h5>
	      <p class="mb-0">${c.text}</p>
	    </div>
	  </div>`;
		$("#old-comments").append($.parseHTML(comment_str));
		updateAuthorName(c.userId);
	    }
	},
	error: function(error) {
	    console.log("Error al cargar los comentarios.");
	    $("#errors-container").append(getError("No se pudo cargar los comentarios."));
	}
    });
}


