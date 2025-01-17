/* 

Script to autoselected task_date, start_date. 
Also, this script is used to load workers data with api/workers.

*/

// AUTOSELECTED DATE (task_date)
$(document).ready(function () {
    var now = new Date();
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    $('#task_start_date').val(today);
});

task_end_date.min = new Date().toISOString().split("T")[0];

// AUTOSELECTED TIME (start_time)
var timeField = document.getElementById("start_time");
var now = new Date();

var hours = now.getHours();
var minutes = now.getMinutes() + 2;

if (hours < 10) {
    hours = "0" + hours;
}
if (minutes < 10) {
    minutes = "0" + minutes;
}
timeField.value = hours + ":" + minutes;

// AUTOSELECTED TIME (end_time)
var timeField = document.getElementById("end_time");
var now = new Date();

var hours = now.getHours() + 1;
var minutes = now.getMinutes() + 2;

if (hours < 10) {
    hours = "0" + hours;
}
if (minutes < 10) {
    minutes = "0" + minutes;
}
timeField.value = hours + ":" + minutes;


// WORKERS LIST
document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/workers")
        .then(response => response.json())
        .then(data => {
            const encargadoSelect = document.getElementById("person_in_charge");
            data.forEach(worker => {
                const option = document.createElement("option");
                option.value = worker.nombre;
                option.textContent = worker.nombre;
                encargadoSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});




// WORKERS LIST
document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/pilones")
        .then(response => response.json())
        .then(data => {
            const pilon_selected= document.getElementById("pilon_selected");
            data.forEach(pilon => {
                const option = document.createElement("option");
                option.value = pilon.nombre;
                option.textContent = pilon.nombre;
            pilon_selected.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});


