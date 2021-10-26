/**
 * Script para validar un formulario
    @author: Sergio Matamoros Delgado
    @license GPL v3 2021
**/

'use strict';


window.onload = iniciar;
window.onclick = clicks;

function iniciar() {
    let form = document.forms[0];
    form.onsubmit = validar;
}

function validar(event) {
    
    //event.preventDefault();


    //Comprobamos que haya aceptado la P.P
    if(!document.getElementById("iPolitica").checked)
        return false;

    //Comprobamos que el nombre tenga más de 2 letras.
    if(document.getElementById("iNombre").value.length <2) {
        document.getElementById("iNombre").focus();
        return false;

    }
    //Si eres Asturiano y te gusta el brócoli, pa fuera.
    if(document.getElementById("rSi").checked && document.getElementById("sComunidad").options[2])
        return false;
    
    //Comprobación regex del teléfono.
    if(!document.getElementById("iTelefono").value.match("[0-9]{9}"))
        return false;
    
    console.log("valida");

    //return false; <- le indico al navegador que no pase nada
}

//Función que controla a que elemento se le ha hecho click.
function clicks(event) {
    if(!(document.getElementById("sProvincia")) && event.target.id == "sComunidad" && event.target.value==11) {
        provincia();
    } else if(document.getElementById("sProvincia") && event.target.id == "sComunidad" && event.target.value != 11)
        document.querySelectorAll(".row")[7].remove();
}

/**
 * Función que despliega un select al seleccionar la CCAA de Extremadura.
 */
function provincia() {
    let row = document.createElement("div");
    row.classList.add("row");

    let divTexto = document.createElement("div");
    divTexto.classList.add("col-25");

    let label = document.createElement("label");
    label.textContent = "Provincia";

    //Select y options
    let divSelect = document.createElement("div");
    divSelect.classList.add("col-75");
    let select = document.createElement("select");
    select.id = "sProvincia";

    let oCaceres = document.createElement("option");
    oCaceres.setAttribute("value","Caceres");
    oCaceres.textContent = "Caceres";

    let oBadajoz = document.createElement("option");
    oBadajoz.setAttribute("value","Badajoz");
    oBadajoz.textContent = "Badajoz";

   


    row.appendChild(divTexto);
    divTexto.appendChild(label);

    //Select
    row.appendChild(divSelect);
    divSelect.appendChild(select);
    select.appendChild(oBadajoz);
    select.appendChild(oCaceres);

    //Ponemos el select en la posición número 7, que es justo después del select de la CCAA
    document.querySelector("form").insertBefore(row, document.querySelectorAll("form .row")[7]);
}