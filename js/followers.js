"use strict";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

$(main);

function main() {

    // Expulsar usuarios no autenticados
    kickNonAuthenticated();

    // Actualizar títulos
    $("h3 > span").attr("name", `auth-${id}`);
    updateAuthorName(id);
    
    // Cargar listas
    console.log("Cargando listas de usuarios seguidores y seguidos...");
    $.ajax({
	method: "GET",
	url: "http://localhost:3000/follows",
	success: function(data) {
	    let authors = new Set();
	    for(let f of data) {
		if(f.followerId == id) {
		    $("#followed-list").append(getListElement(f.targetId));
		    authors.add(f.targetId);
		}
		else if(f.targetId == id) {
		    $("#followers-list").append(getListElement(f.followerId));
		    authors.add(f.followerId);
		}
	    }
	    for(let userId of authors){
		updateAuthorName(userId);
		updateFollowData(userId);
	    }
	    console.log("Usuarios seguidores y seguidos cargados con éxito");
	},
	error: function() {
	    console.log("Error al cargar los seguidores e usuarios seguidos.");
	    $("#errors-container").empty();
	    $("#errors-container").append(getError("Error al cargar los seguidores e usuarios seguidos."));
	}
    });
}

function getListElement(userId) {
    let elem_html = `
	<li class="list-group-item bg-dark rounded flex-space mb-3">
	  <a name=auth-${userId} href="profile.php?id=${userId}" class="lh-1-8"></a>
	  ${(userId==getUserId())?
                "" :
                `<div name="fol-${userId}" class="btn btn-info text-white d-inline-block lh-1">
	           Seguir
	        </div>`}
	</li>`;
    return $.parseHTML(elem_html);
}


