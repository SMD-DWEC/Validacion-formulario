/**
 * Script para validar un formulario
    @author: Sergio Matamoros Delgado
    @license GPL v3 2021
**/

'use strict';


window.onload = iniciar;
//window.onclick = clicks; <- En navegadores como firefox, funciona diferente y se comporta diferente.

let bAsturias = false;

//Evento on change. Comprobamos los selects de las CCAA
document.getElementById("sComunidad").onchange = function test() {      
    //Bool si es asturias  
    if(document.getElementById("sComunidad").value == 3)
        bAsturias = true;
    else
        bAsturias = false;

    
    //Comprobaciones Extremadura.
    if(document.getElementById("sComunidad").value == 11)
        provincia();
    else if(document.getElementById("sProvincia") && document.getElementById("sComunidad").value != 11)
        document.querySelectorAll(".row")[7].remove();
}

/**
 * Función de inicio del programa.
 * Llama a la función validar al darle al botón de 'Submit'
 */
function iniciar() {
    let form = document.forms[0];
    form.onsubmit = validar;
}

/**
 * Función que permite comprobar que los campos del formulario estén correctos.
 * @param {*} event - Eventos del formularios
 * @returns - Devuelve false si algún dato es incorrecto.
 */
function validar(event) {

    
    //event.preventDefault();

    //Variables locales
    let arrayErrores = [];
    let hayError = false;

    
    //Reseteamos los estilos de los campos.
    for(let campos of document.querySelectorAll("input[type=text], input[type=email], input[type=number], label#labelPolitica, label#brocoliSi")) {
        campos.style.backgroundColor = "#f2f2f2";
    }

    //Comprobamos que el nombre tiene más de 3 caracteres.
    if(!document.getElementById("iNombre").value.match("[a-zA-Z]{3}")){
        arrayErrores.push("El campo de nombre no está rellenado o tiene muy pocos carácteres");
        hayError = true;

        document.getElementById("iNombre").style.backgroundColor = "#E82512";
    }
    
    //Comprobamos que los apellidos tienen dos palabras al menos.
    if(document.getElementById("iApellidos").value.length < 2) {
        arrayErrores.push("El campo de apellidos no está rellenado o tiene muy pocos carácteres");
        hayError = true;

        document.getElementById("iApellidos").style.backgroundColor = "#E82512";
    }

    //Comprobamos que el email sea correcto cogiendo el pattern del HTML.
    if(document.getElementById("iEdad").value == "") {
        arrayErrores.push("El campo edad no está rellenado o tiene un formato incorrecto");
        hayError = true;

        document.getElementById("iEdad").style.backgroundColor = "#E82512";
    }

    //Comprobamos que el email sea correcto cogiendo el pattern del HTML.
    if(!document.getElementById("iEmail").pattern || document.getElementById("iEmail").value == "") {
        arrayErrores.push("El campo Email no está rellenado o tiene un formato incorrecto");
        hayError = true;

        document.getElementById("iEmail").style.backgroundColor = "#E82512";
    }

    //Comprobamos que el NIF sea correcto cogiendo el pattern del HTML.
    if(!document.getElementById("iNIF").pattern || document.getElementById("iNIF").value == "") {
        arrayErrores.push("El campo NIF no está rellenado o tiene un formato incorrecto");
        hayError = true;

        document.getElementById("iNIF").style.backgroundColor = "#E82512";
    }

    //Comprobación regex del teléfono.
    if(!document.getElementById("iTelefono").value.match("[0-9]{9}")) {
        arrayErrores.push("El campo de teléfono no está rellenado o tiene un formato incorrecto");
        hayError = true;

        document.getElementById("iTelefono").style.backgroundColor = "#E82512";
    }

    //Si eres Asturiano y te gusta el brócoli, pa fuera.
    if(document.getElementById("rSi").checked && bAsturias) {
        arrayErrores.push("Si eres de Asturias no puede gustarte el brócoli.");
        hayError = true;

        document.getElementById("brocoliSi").style.backgroundColor = "#E82512";
    }
    
    //Comprobamos que haya aceptado la P.P
    if(!document.getElementById("iPolitica").checked) {
        arrayErrores.push("No has aceptado la política de privacidad");
        hayError = true;

        document.getElementById("labelPolitica").style.backgroundColor = "#E82512";
    }

    /*
        _______________________________
            == Muestra de errores ==
        _______________________________
    */

    //Si hay algún error evita que se envie el formulario y crea una lista con los errores.
    if(hayError) { 
        errores(arrayErrores);
        return false;
    }
}

/**
 * Función que crea una lista con todos los errores del formulario.
 * @param {*} arrayErrores - Array con la lista de todos los errores del formulario.
 */
function errores(arrayErrores) {

    //Si ya existe el error lo eliminamos.
    if(document.getElementById("listaErrores")) document.getElementById("listaErrores").remove();

    let div = document.createElement("div");
    div.id = "listaErrores";

    let ul = document.createElement("ul");;
    let li = null;

    let h4 = document.createElement("h4");
    h4.textContent = "Se ha producido el siguiente error al enviar el formulario:"
    div.appendChild(h4);

    //Recorrer un array con el texto de cada error.
    for(let errores of arrayErrores ){
        li = document.createElement("li");

        li.textContent = errores;

        ul.appendChild(li);
    }


    div.appendChild(ul);

    document.body.insertBefore(div,document.querySelector(".container"));  
}

/**
 * [OBSOLETO] -> En firefox no tiene el comportamiento adecuado.
 * Función que controla a que elemento se le ha hecho click.
 * @param {*} event - Evento del click
 */
function clicks(event) {
    /*
        _____________________________________
            == Click al select de CCAA==
        _____________________________________
    */
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