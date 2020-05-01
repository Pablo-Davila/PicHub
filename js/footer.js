"use strict"

let f = new Date();//.getFullYear();
let footer = document.getElementById("foot-text");
let fmonth = (f.getMonth()+1).toString().padStart(2, "0");
let fday = f.getDate().toString().padStart(2, "0");
footer.innerHTML += f.getFullYear() + "/" + fmonth + "/" + fday;
