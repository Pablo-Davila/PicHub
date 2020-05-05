"use strict";

$(main);

function main() {

    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;  // Months are 0-based for some reason...
    let year = date.getFullYear();

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Add a leading 0 if they're only one digit
    hour = hour.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    // Print the current date and a message to report that we're finished

    console.log("Loading finished.");
    console.log(`The current time is: ${day}/${month}/${year} ${hour}:${minutes}:${seconds}`);
}

