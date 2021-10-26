/**
 * Script para validar un formulario
    @author: Sergio Matamoros dELGADO
    @license GPL v3 2021
**/

'use strict';


window.onload = iniciar;

function iniciar() {
    if(document.getElementById("sComunidad").click) {
        let container = document.querySelector("form");

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



        container.appendChild(row);

    }
    let form = document.forms[0];
    form.onsubmit = validar;
}

function validar(event) {
    
    //event.preventDefault();
    console.log("valida");


    //Comprobamos que haya aceptado la P.P
    if(!document.getElementById("iPolitica").checked)
        return false;

    if(document.getElementById("iNombre").lenght <2)
        return false;

    //if(document.getElementById("sComunidad"))
    //{
        




    //}
    

    //return false; <- le indico al navegador que no pase nada
}