"use strict";

function storeToken(token) {
    localStorage.setItem("token", token);
    localStorage.setItem("tokenTime", new Date().getTime());
    localStorage.setItem("userId", jwt_decode(token).sub);
}

function getToken() {
    let token = localStorage.getItem("token");
    if(token != null){
	let currentTime = new Date().getTime();
	let tokenTime = localStorage.getItem("tokenTime");
	let difference = (currentTime - tokenTime) / (1000*60*60);
	if(difference > 1){
	    console.log("Your token has expired");
	    token = null;
	    localStorage.setItem("token", null);
	}
    }
    return token;
}

function getUserId() {
    return parseInt(localStorage.getItem("userId"));
}

function logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTime");
    localStorage.removeItem("userId");

    console.log("Sesión cerrada");
}

