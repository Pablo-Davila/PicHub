"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

$(main);

function main() {

    // Cargar imagen
    loadSinglePhoto(id, false);
    
    if(getToken() != null) {

	// Habilitar like/dislike
	let score_str = `
          <i id="dislike" class='fa fa-thumbs-down txt-dark h4' aria-hidden='true'></i>
          <i id="like" class='fa fa-thumbs-up txt-dark h4' aria-hidden='true'></i>`;
	$("#score-section").append($.parseHTML(score_str));
	$("#like").click(toggleLike);
	$("#dislike").click(toggleDislike);

	// Actualizar color like-dislike
	$.ajax({
	    method: "GET",
	    url: `http://localhost:3000/votes?imageId=${id}&userId=${getUserId()}`,
	    success: function(data) {
		if(data.length != 0) {
		    if(data[0].like) {
			$("#like").toggleClass("txt-dark");
			$("#like").toggleClass("text-success");
		    }
		    else {
			$("#dislike").toggleClass("txt-dark");
			$("#dislike").toggleClass("text-danger");
		    }
		}
	    },
	    error: function(error) {
		console.log("Error al acceder a los votos del sistema.");
		$("#errors-container").empty();
		$("#errors-container").append(getError("No se pudo acceder a los votos del sistema."));
	    }
	});
	
	// Permitir nuevos comentarios
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

// Comentarios
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
		let imgDate = new Date(c.date);
		let fecha = `${imgDate.getDay()}/${imgDate.getMonth()+1}/${imgDate.getFullYear()}`
		    + `, ${imgDate.getHours()}:${imgDate.getMinutes()}`;
		let comment_str = `
	  <div class="col-row mb-2">
	    <div class="bg-dark rounded p-3">
	      <h5 class="w-50 d-inline"><a name="auth-${c.userId}" href="profile.php?id=${c.userId}"></a></h5>
              <p class="w-50 d-inline pl-3">${fecha}</p>
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

// Votos
function toggleLike() {
    new Promise( (resolve,reject) => {
	$.ajax({
	    method: "GET",
	    url: `http://localhost:3000/votes?imageId=${id}&userId=${getUserId()}`,
	    success: resolve,
	    error: reject
	});
    }).then( function(data) {
	if(data.length == 0) newVote(true, id);
	else if(data[0].like == true) {
	    removeVote(data[0].id);
	}
	else {
	    updateVote(data[0].id, true);
	}
    }).catch( function(error) {
	console.log("Error al acceder a los votos del sistema.");
	$("#errors-container").empty();
	$("#errors-container").append(getError("No se pudo acceder a los votos del sistema."));
    });

    // Respuesta visual
    $("#like").toggleClass("text-success");
    $("#like").toggleClass("txt-dark");
    $("#dislike").removeClass("text-danger");
    $("#dislike").addClass("txt-dark");
}

function toggleDislike() {
    new Promise( (resolve,reject) => {
	$.ajax({
	    method: "GET",
	    url: `http://localhost:3000/votes?imageId=${id}&userId=${getUserId()}`,
	    success: resolve,
	    error: reject
	});
    }).then( function(data) {
	if(data.length == 0) newVote(false, id);
	else if(data[0].like == true) {
	    updateVote(data[0].id, false);
	}
	else {
	    removeVote(data[0].id);
	}
    }).catch( function(error) {
	console.log("Error al acceder a los votos del sistema.");
	$("#errors-container").empty();
	$("#errors-container").append(getError("No se pudo acceder a los votos del sistema."));
    });

    // Respuesta visual
    $("#dislike").toggleClass("text-danger");
    $("#dislike").toggleClass("txt-dark");
    $("#like").removeClass("text-success");
    $("#like").addClass("txt-dark");
}

function removeVote(voteId) {
    $.ajax({
	type: "DELETE",
	url: `http://localhost:3000/votes/${voteId}`,
	headers: {
	    "Authorization": "Bearer " + getToken()
	},
	success: function() {
	    updateScore(id);
	    console.log("Voto eliminado");
	},
	error: function() {
	    console.log("Error al eliminar el voto.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("No se pudo eliminar el voto."));
	}
    });
}

function updateVote(voteId, like) {
    let data = {
	"like": like,
	"date": (new Date()).toISOString()
    };
    $.ajax({
	type: "PATCH",
	url: "http://localhost:3000/votes/" + voteId,
	data: JSON.stringify(data),
	contentType: "application/json; charset=UTF-8",
	processData: false,
	headers: {
	    "Authorization": "Bearer " + getToken()
	},
	success: function() {
	    updateScore(id);
	    console.log("Voto cambiado a " + ((like)? "like" : "dislike"));
	},
	error: function(error) {
	    console.log("Error al actualizar el voto.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("No se ha podido actualizar el voto."));
	}
    });
}


