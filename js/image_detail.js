"use strict";

// Información a partir de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(main);

function main() {

    // Cargar imagen
    loadSinglePhoto(id, false);
    
    // Cargar comentarios
    if(getToken() != null) loadComments();
}

function loadComments() {
    $.ajax({
	method: "GET",
	url: `http://localhost:3000/comments?imageId=${id}`,
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


