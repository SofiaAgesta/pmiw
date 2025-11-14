
// Felipe Ceniceros y Sofia Agesta
//Comision Mati
//link: https://youtu.be/tpAwGNZZhYM


let miJuego;



function setup() {
    createCanvas(640, 480);
    
 
    miJuego = new Juego();
    
    //llamamos al metodo setup de nuestro objeto
    miJuego.setup();
    
    // Configuración de texto
    textAlign(CENTER, CENTER);
    textFont('Arial');
}

function draw() {
    // delegamos la logica
    
    // El objeto "Juego" se encarga de actualizar su logica
    miJuego.update(); 
    
    // El objeto "Juego" se encarga de dibujarse a sí mismo
    miJuego.show();
}

function mousePressed() {
    // 4. Delegamos el evento de clic al objeto "Juego"
    miJuego.onMousePressed(mouseX, mouseY);
}
