"use strict";

const symbol = '*';
let badwords;

$(main);

function main() {
    
    $.ajax({
        url: "http://localhost:3000/swearwords",
	success: function(ans) {
	    badwords = ans;
	},
        error: function (error) {
            console.log("Error al acceder a las palabras malsonantes: " + error.toString());
        }
    });
}

function fixBadWords(elemento) {
    // elemento indica aquel en el que se sustituirán las palabras malsonantes
    
    for(let bword of badwords) {
	let re = new RegExp("\\b" + bword + "\\b", "gi");
	let bad = false;
	
	if(re.test(elemento.val())) {
	    bad = true;
	    let rep = "";
	    for(let i=0; i<bword.length; i++) rep += symbol;
	    //data.push(bword);
	    elemento.val(elemento.val().replace(re, rep));
	}
    }
}
