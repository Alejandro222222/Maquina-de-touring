const numUno = document.getElementById("numUno");
const ope = document.getElementById("ope");
const numDos = document.getElementById("numDos");
const res = document.getElementById("res");
const tablaNumeros = document.getElementById('tabla-1');
const tablaPuntero = document.getElementById('tabla-2');
const botonIgual = document.getElementById('igual');
const botonLimpiar = document.getElementById('limpiar-b');
const botonSiguiente = document.getElementById('siguiente-b');
const botonAnimacion = document.getElementById('animacion-b');
const imgTabla = document.getElementById('imgTabla');
const imgGrafo = document.getElementById('imgGrafo');
var filaNumeros, filaPuntero, maquina, resultado, operacionLabel;
var columnaActual = 0;
var posicionActual, nuevaPosicion, posicionActualPuntero, nuevaPosicionPuntero;
var animacion = true;

function insertar(valor) {

    // Si el primer espacio es vacio, inserta en el primer espacio
    if (numUno.textContent.trim() === "") {
        
        // Evalua si es un numero:
        var numero = parseFloat(valor);

        // Verificar si es un número
        if (!isNaN(numero)) {
            numUno.textContent = numero;
        }

    // Si el primer espacio tiene valor, evalua el segundo espacio
    } else {

        // Si el segundo espacio es vacio, inserta en el segundo espacio
        if (ope.textContent.trim() === "") {
            
            // Evalua si es un numero:
            var numero = parseFloat(valor);

            // Verificar si es un número
            if (isNaN(numero)) {
                ope.textContent = valor;
            }

        // Si el segundo espacio tiene valor, evalua el tercer espacio
        } else {

            // Si el tercer espacio es vacio, inserta en el tercer espacio
            if (numDos.textContent.trim() === "") {
                
                // Evalua si es un numero:
                var numero = parseFloat(valor);

                // Verificar si es un número
                if (!isNaN(numero)) {
                    numDos.textContent = numero;
                }
            } 

        }
    }
}

function limpiar() {
    numUno.textContent = '';
    numDos.textContent = '';
    ope.textContent = '';
}

function crearTabla() {

    // Limpiar la tabla
    tablaNumeros.innerHTML = '';
    tablaPuntero.innerHTML = '';

    // Insertar las filas y columnas
    filaNumeros = tablaNumeros.insertRow();
    filaPuntero = tablaPuntero.insertRow();
    
    // Asignar id a las filas
    filaNumeros.id = "fila-1"
    filaPuntero.id = "fila-2"
}

function agregarCelda(valor) {
    // Obtener la referencia a la tabla
    var fila1 = document.getElementById("fila-1");
    var fila2 = document.getElementById("fila-2");

    const nuevaCelda = fila1.insertCell();
    const nuevaCelda2 = fila2.insertCell();

    nuevaCelda.id = 'colNum';
    nuevaCelda.textContent = valor;

    nuevaCelda2.id = 'colImage';
    if(fila2.cells.length === 1){
        nuevaCelda2.innerHTML = '<img src="IMAGEsi.png" id="movableImage" alt="Imagen">';
    } else {
        nuevaCelda2.innerHTML = '<img src="IMAGEno.png" id="movableImage" alt="Imagen">';
    }
}

function agregarPrimeraCelda(){
    // Añadiendo la nueva celda
    var fila1 = document.getElementById("fila-1");
    var fila2 = document.getElementById("fila-2");

    const nuevaCelda = fila1.insertCell();
    const nuevaCelda2 = fila2.insertCell();

    nuevaCelda.id = 'colNum';
    nuevaCelda2.id = 'colImage';
    nuevaCelda2.innerHTML = '<img src="IMAGEno.png" id="movableImage" alt="Imagen">';

    // Moviendo todos los campos a la celda siguiente
    for (let i = fila1.cells.length - 1; i > 0; i--) {
        console.log(fila1.cells[i].textContent);
        fila1.cells[i].textContent = fila1.cells[i - 1].textContent;
    }

    fila1.cells[0].textContent = 'B';
}

function declararCadena() {

    if (numUno.textContent.trim() !== "" && numDos.textContent.trim() !== "") {
        var numero = parseInt(numUno.textContent);
      
        crearTabla();
    
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < numero; j++) {
                agregarCelda('0');
            }
            agregarCelda('1');
            numero = parseInt(numDos.textContent);
        }
    } else {
        return;
    }
    
    // Declarar la maquina
    switch (ope.textContent) {
        case '+':
            maquina = new MaquinaEstados(funcionesSuma);
            imgTabla.querySelector('img').src = 'Suma/Suma.png';
            imgGrafo.querySelector('img').src = 'Suma/q0.png';
            operacionLabel = 'Suma';
            break;
        case '-':
            maquina = new MaquinaEstados(funcionesResta);
            imgTabla.querySelector('img').src = 'Resta/Resta.png';
            imgGrafo.querySelector('img').src = 'Resta/q0.png';
            operacionLabel = 'Resta';
            break;
        case '*':
            maquina = new MaquinaEstados(funcionesMultiplicacion);
            imgTabla.querySelector('img').src = 'Multiplicacion/Multiplicacion.png';
            imgGrafo.querySelector('img').src = 'Multiplicacion/q0.png';
            operacionLabel = 'Multiplicacion';
            break;
        case '/':
            maquina = new MaquinaEstados(funcionesDivision);
            imgTabla.querySelector('img').src = 'Divicion/Divicion.png';
            imgGrafo.querySelector('img').src = 'Divicion/q0.png';
            operacionLabel = 'Divicion';
            break;
        case '^':
            maquina = new MaquinaEstados(funcionesPotencia);
            imgTabla.querySelector('img').src = 'Potencia/Potencia.png';
            imgGrafo.querySelector('img').src = 'Potencia/q0.png';
            operacionLabel = 'Potencia';
            break;
    }
     
    // Deshabilitar bobon de limpiar e igual 
    botonLimpiar.disabled = true;
    botonIgual.disabled = true;
    botonSiguiente.disabled = false;
    botonAnimacion.disabled = false;
}

function mover(direccion, valor) {
  
    // Se obtiene la posicion actual
    posicionActual = filaNumeros.cells[columnaActual];
    posicionActualPuntero = filaPuntero.cells[columnaActual];

    // Modificando valor e imagen actual
    posicionActualPuntero.querySelector('img').src = 'IMAGEno.png';
    posicionActual.textContent = valor;
  
    // Actualizar el índice de columna y fila según la dirección
    if (direccion === 'A') {
        columnaActual++;
        if (columnaActual >= filaPuntero.cells.length) {
            //Aqui entra para agregar nueva columna al final
            agregarCelda('B');
        }
    } else if (direccion === 'R') {
        columnaActual--;
        if (columnaActual < 0) {
            //Aqui entra para agregar nueva columna al inicio
            agregarPrimeraCelda();
            columnaActual = 0;
        }
    }
   
    // Se obtiene la nueva posicion
    nuevaPosicion = filaNumeros.cells[columnaActual];
    nuevaPosicionPuntero = filaPuntero.cells[columnaActual];

    // Actualizando imagen en la nueva celda
    nuevaPosicionPuntero.querySelector('img').src = 'IMAGEsi.png';

    console.log("La posicion anterior es: " + posicionActual.textContent);
    console.log("La neuva posicion es: " + nuevaPosicion.textContent);
  
}

class MaquinaEstados {

    constructor(funciones) {
      this.funciones = funciones;  // El arreglo de arreglos con las reglas
      this.estadoActual = 0; // Estado inicial del programa
    }
    
    // Método para procesar un valor de entrada
    procesarEntrada(valorEntrada) {
      // Encontrar la regla que coincida con el estado actual y el valor de entrada
      const funcion = this.funciones.find(
        ([estado, valor]) => estado === this.estadoActual && valor === valorEntrada
      );
  
      if (!funcion) {
        // Sumar los ceros para dar el resultado
        res.innerHTML = '<label id="res" class="text-center col-2 text-danger">' + 'El resultado es:  ' + contarCeros(ope.textContent) + '</label>';
        animacion = false;
        return;
      }
  
      const [estadoActual, valor, nuevoValor, direccion, nuevoEstado] = funcion;
  
      // Invocar el método correspondiente según la dirección
      if (direccion === "R") {
        mover('A', nuevoValor);
      } else if (direccion === "L") {
        mover('R', nuevoValor);
      }
  
      // Cambiar el estado del programa al nuevo estado
      this.estadoActual = nuevoEstado;
      console.log("El estado actual es: " + nuevoEstado);
      console.log("------------------------------------------------------");

      // Colocando imagen del grafo

      switch (nuevoEstado) {
        case 0:
            imgGrafo.querySelector('img').src = operacionLabel + '/q0.png';
            break;
        case 1:
            imgGrafo.querySelector('img').src = operacionLabel + '/q1.png';
            break;
        case 2:
            imgGrafo.querySelector('img').src = operacionLabel + '/q2.png';
            break;
        case 3:
            imgGrafo.querySelector('img').src = operacionLabel + '/q3.png';
            break;
        case 4:
            imgGrafo.querySelector('img').src = operacionLabel + '/q4.png';
            break;
        case 5:
            imgGrafo.querySelector('img').src = operacionLabel + '/q5.png';
            break;
        case 6:
            imgGrafo.querySelector('img').src = operacionLabel + '/q6.png';
            break;
        case 7:
            imgGrafo.querySelector('img').src = operacionLabel + '/q7.png';
            break;
        case 8:
            imgGrafo.querySelector('img').src = operacionLabel + '/q8.png';
            break;
        case 9:
            imgGrafo.querySelector('img').src = operacionLabel + '/q9.png';
            break;
        case 10:
            imgGrafo.querySelector('img').src = operacionLabel + '/q10.png';
            break;
        case 11:
            imgGrafo.querySelector('img').src = operacionLabel + '/q11.png';
            break;
        case 12:
            imgGrafo.querySelector('img').src = operacionLabel + '/q12.png';
            break;
        case 13:
            imgGrafo.querySelector('img').src = operacionLabel + '/q13.png';
            break;
        case 14:
            imgGrafo.querySelector('img').src = operacionLabel + '/q14.png';
            break;
        case 15:
            imgGrafo.querySelector('img').src = operacionLabel + '/q15.png';
            break;
        case 16:
            imgGrafo.querySelector('img').src = operacionLabel + '/16.png';
            break;
        case 17:
            imgGrafo.querySelector('img').src = operacionLabel + '/q17.png';
            break;
        case 18:
            imgGrafo.querySelector('img').src = operacionLabel + '/q18.png';
            break;
        case 19:
            imgGrafo.querySelector('img').src = operacionLabel + '/q19.png';
            break;
        default:
            break;
    }

    }
}
  
function contarCeros(operacion) {
    resultado = 0;
    for (let i = 0; i < filaNumeros.cells.length; i++) {
        if (filaNumeros.cells[i].textContent === '0') {
            resultado++;
        }
    }
    if (operacion === '^') {
        var cerosUno = parseInt(numUno.textContent);
        var cerosDos = parseInt(numDos.textContent);
        var cerosMenos = cerosUno + cerosDos;
        resultado -= cerosMenos;
    }
    return resultado;
}

const funcionesSuma = [
    [0,"0","B","R",1], [0,"1","B","R",3], [1,"0","0","R",1], [1,"1","1","R",1], [1,"B","0","L",2], [2,"0","0","L",2], [2,"1","1","L",2], [2,"B","B","R",0], [3,"0","B","R",4], [3,"1","B","R",6], [4,"0","0","R",4], [4,"1","1","R",4], [4,"B","0","L",5], [5,"0","0","L",5], [5,"1","1","L",5], [5,"B","B","R",3],
];

const funcionesResta = [
    [0,"0","0","R",0], [0,"1","1","R",1], [1,"0","1","L",2], [1,"1","1","R",1], [1,"B","B","L",4], [2,"0","0","L",2], [2,"1","1","L",2], [2,"B","B","R",3], [3,"0","B","R",0], [4,"0","0","R",5], [4,"1","B","L",4],
];

const funcionesDivision = [
    [0,"0","0","R",0], [0,"1","1","R",1], [1,"0","X","L",2], [1,"1","1","R",3], [1,"X","X","R",1], [2,"0","0","L",2], [2,"1","1","L",2], [2,"X","X","L",2], [2,"B","B","R",6], [3,"0","0","R",3], [3,"B","0","L",5], [4,"0","0","R",0], [4,"1","B","R",7], [5,"0","0","L",5], [5,"1","1","L",5], [5,"X","0","L",5], [5,"B","B","R",4], [6,"0","B","R",0], [6,"1","B","R",8], [7,"0","B","R",7], [7,"1","B","R",10], [8,"0","B","R",8], [8,"X","B","R",8], [8,"1","B","R",9], [9,"0","0","R",9], [9,"B","Y","L",10],
];

const funcionesMultiplicacion = [
    [0,"0","B","R",1], [1,"0","0","R",1], [1,"1","1","R",2], [2,"0","X","R",3], [2,"1","1","L",5], [3,"0","0","R",3], [3,"1","1","R",3], [3,"B","0","L",4], [4,"0","0","L",4], [4,"1","1","L",4], [4,"X","X","R",2], [5,"X","0","L",5], [5,"1","1","R",6], [6,"0","0","L",7], [7,"1","1","L",8], [8,"0","0","L",9], [8,"B","B","R",10], [9,"0","0","L",9], [9,"B","B","R",0], [10,"1","B","R",11], [11,"0","B","R",11], [11,"1","B","R",12],
];

const funcionesPotencia = [
    [0,"0","X","R",1], 
    [1,"0","0","R",1], 
    [1,"1","1","R",2], 
    [2,"0","Y","R",3], 
    [2,"Y","Y","R",6], 
    [3,"0","0","R",3], 
    [3,"1","1","R",3], 
    [3,"B","0","L",4], 
    [3,"Y","Y","R",3],
    [4,"0","0","L",4],
    [4,"1","1","L",4],
    [4,"X","X","R",5],
    [4,"Y","Y","L",4],
    [4,"Z","0","R",5],
    [4,"W","W","L",15],
    [5,"0","Z","R",3],
    [5,"1","1","R",2],
    [6,"0","Y","R",7],
    [6,"1","1","R",16],
    [6,"Y","Y","R",6],
    [7,"0","0","R",7],
    [7,"1","1","R",7],
    [7,"B","B","L",8],
    [7,"W","W","R",7],
    [8,"0","W","L",9],
    [8,"W","0","L",17],
    [9,"0","0","L",9],
    [9,"1","1","L",9],
    [9,"X","X","R",10],
    [9,"Y","Y","L",9],
    [9,"W","0","L",9],
    [10,"0","Z","R",11],
    [10,"1","1","R",2],
    [10,"W","W","R",3],
    [11,"0","0","R",11],
    [11,"1","1","R",11],
    [11,"Y","Y","R",12],
    [11,"W","W","R",3],
    [12,"0","0","R",12],
    [12,"1","1","R",13],
    [12,"Y","Y","R",12],
    [13,"0","Z","R",14],
    [14,"0","0","R",14],
    [14,"W","W","R",3],
    [15,"0","0","L",15],
    [15,"1","1","L",15],
    [15,"Y","Y","L",15],
    [15,"Z","0","R",10],
    [15,"W","W","R",3],
    [16,"0","0","R",16],
    [16,"B","B","R",18],
    [16,"W","0","L",17],
    [17,"0","0","L",17],
    [17,"1","1","L",17],
    [17,"X","0","L",18],
    [17,"Y","0","L",17],
];
  
function nuevoEstado() {
    // Definir la primera posicion para evitar error Undefined
    posicionActual = filaNumeros.cells[columnaActual];

    // Invocar al proceso
    maquina.procesarEntrada(posicionActual.textContent);
}

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function iniciarAnimacion() {
    while (animacion) {
        nuevoEstado();
        //await esperar(20);
    }
}
