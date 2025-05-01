// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego


//TODO Para que la pelota se mueva, necesitamos las variables de X, Y
//Hacer los elementos como objeto facilita el trabajo
//*Con esto determinamos todas las caracteristicas y propiedades de la pelota desde aquí

const ball = { 
    x: 30, //Su posición el el eje X
    y: 30, //Su posición el el eje Y
    w: 20,  //El ancho de la pelotita
    h: 20,  //El alto de la pelotita
    speed: 5,//Indica la velocidad de la pelotita, 
    // con esto podemos modificar la velocidad cuando queramos desde aquí
    
    //Creamos un booleano para espeficar hacia donde se mueve la pelotita
    isMovingRight: true,
    isMovingDown: true, //True porque empieza a moverse hacia abajo
}   

const paddle = {
    x: 200,
    y: 550,
    w: 100,
    h: 20,
    speed: 20
}

// *** Game Functions ***
//! Funcion que sirve para almacenar el movimiento de la pelota
function moverPelotita () {

    if (ball.isMovingRight === true) {
        //Para que la pelotita incremente en 1, es decir, comience a moverse
        ball.x += ball.speed; 
        //TODO Siempre que nosotros modifiquemos una variable de posición, dimensión , color... tenemos que modificar el DOM.
        //TODO Accedemos al nodo de la pelota y decimos que su nnuevo left va a ser la interpolacion de ball.x px
        ballNode.style.left = `${ball.x}px`

    }else {
        ball.x -= ball.speed;
        ballNode.style.left = `${ball.x}px`
    }
    
   if(ball.isMovingDown) {
        ball.y += ball.speed; //Y hacemos lo mismo con el eje y para que se mueva para abajo
        ballNode.style.top = `${ball.y}px`
   }else { 
        ball.y -= ball.speed;
        ballNode.style.top = `${ball.y}px`

   }
}

//!Funcion para acabar el juego
function gameOver () {
    //1. el intérvalo deberia detenerse
    clearInterval(gameIntervalId)

    //2. se le deberia indicar al usuario que el juego se perdió
    alert ("Has perdido :(")
}



//!Funcion para checkear la colision de la pelotita contra la pared
function CheckColissionBallWall () {
    //offsetWidth siempre va a mostrar el ancho total de la pantalla, incluso si se cambia el valor
    //Le restamos el ancho de la pelota para que no se salga del borde
    if (ball.x > (gameBoxNode.offsetWidth - ball.w)) { //Si la pelotita colisiona con la pared, entonces...
        ball.isMovingRight = false; // el movimiento hacia la derecha se para y cambia de dirección
    } //Le restamos el alto de la pelota para que no se salga del borde
    
    if (ball.y > (gameBoxNode.offsetHeight - ball.h)) { //se refiere al alto de la pantalla, el mas bajo es 600
        //ball.isMovingDown = false;
        //*GAME OVER
        gameOver ()
    }
    if (ball.x <= 0) { //0 cando revota en el lado izquierdo
        ball.isMovingRight = true;
    }
    if (ball.y <= 0) { //Es el maximo alto de la pantalla
        ball.isMovingDown = true;
    }
}


//!Funcion de la pelota chocando con la paleta

function checkColissionBallPaddle () {
    if (
    //Rect1 se refiere a un elemento
    //Rect2 se refiere al otro elemento
        ball.x < paddle.x + paddle.w &&
        ball.x + ball.w > paddle.x &&
        ball.y < paddle.y + paddle.h &&
        ball.y + ball.h > paddle.y
      ) {
        //Cuando colisione la pelota qe se mueva arriba
        ball.isMovingDown = false
      } 
}



//! Funcion que sirve para almacenar el bucle del juego
function gameLoop () {
//Ejecutamos el bucle del juego 60 veces por segundo
moverPelotita()
CheckColissionBallWall () //60 veces por segundo.
//Esta colisionando esta pelotita con la pared?

checkColissionBallPaddle () 

};




// *** Game Loop Interval ***
let gameIntervalId = setInterval (() => {
    //Aqui solo voy a ejecutar la función, es mas comodo y evita que hagamos algun cambio sin querer
    gameLoop()

}, 1000/60) //Se recomienda este tiempo por fps, es decir, la cantidad de cambios que hay por segundo (60fps es el mas tradicional y recomendado para todo tipo de pantallas)




// *** Event Listeners ***

//Indicar que la paleta se va a mover
document.addEventListener("keydown", (event) => { //Cuando el usuario presiona una tecla
    if (event.key === "a") {
        paddle.x -= paddle.speed;
        paddleNode.style.left = `${paddle.x}px`
    }else if (event.key === "d") {
        paddle.x += paddle.speed;
        paddleNode.style.left = `${paddle.x}px`
    }
}) 



