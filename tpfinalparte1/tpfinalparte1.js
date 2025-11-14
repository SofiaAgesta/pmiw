// TP FINAL 1 - Comisión 2 – Sofia Agesta y Felipe Ceniceros
//link: https://youtu.be/5FbN_PEfkf4 

let ancho = 640;
let alto = 480;

// estado del juego
let pantalla = 0;

// textos e imágenes
let textos = [];
let opcionATexto = [], opcionBTexto = [], opcionCTexto = [];
let opcionASiguiente = [], opcionBSiguiente = [], opcionCSiguiente = [];
let cantidadOpciones = [];
let imagenes = [];

// botones (como arreglos)
let botonA = [30, 370, 180, 40];
let botonB = [230, 370, 180, 40];
let botonC = [430, 370, 180, 40];

// sonidos
let sonidoClick;
let sonidoScreamer;
let audioIniciado = false;

function preload() {
  // cargar imágenes 0–14
  for (let i = 0; i < 15; i++) {
    let ruta = "assets/img" + i + ".png";
    if (i === 12) ruta = "assets/tom_screamer.gif";
    imagenes[i] = loadImage(ruta);
  }

  // cargar sonidos 
  sonidoClick = loadSound("assets/click.mp3");
  sonidoScreamer = loadSound("assets/screamer.mp3");
}

function setup() {
  let canvas = createCanvas(ancho, alto);
  canvas.parent('main');

  textFont('Arial');
  textSize(18);
  rectMode(CORNER);

  // textos
  textos[0] = "Haz clic para comenzar o ver Créditos.";
  textos[1] = "Noche de tormenta. La casa vieja cruje. Se escucha un ruido y una risa suave detrás de una puerta.";
  textos[2] = "Sala vacía. Un cuadro torcido. Un plato con marcas de queso mordido.";
  textos[3] = "Cocina oscura. La heladera deja escapar una luz fría. La puerta al sótano está entreabierta.";
  textos[4] = "La puerta del sótano te llama. El aire baja la temperatura. ¿Bajar o volver?";
  textos[5] = "Escalera al sótano. Los escalones suenan. Algo corre por debajo.";
  textos[6] = "Pasillo de piedra. Dos caminos: izquierda con susurro, derecha con olor a queso raro.";
  textos[7] = "Cuarto con jaulas rotas. Un lazo de cuerda. Garras en la pared.";
  textos[8] = "Cuarto con manchas viejas en el piso. Una silueta pequeña se pierde en la esquina.";
  textos[9] = "Llegas a una puerta final. Debes elegir: abrir, rodear o volver.";
  textos[10] = "Final bueno: Escapas por la ventana del patio. La casa queda atrás y amanece.";
  textos[11] = "Final neutral: Esquivas una trampa y sales por un pasadizo, pero algo te sigue…";
  textos[12] = "Final malo: Una risa aguda. Una sombra enorme. La pantalla tiembla. Tom te atrapó. Estás muerto.";
  textos[13] = "Volviste al inicio. Puedes recorrer otro camino.";
  textos[14] = "Créditos: Sofia Agesta y Felipe Ceniceros.\nImágenes: Dall-E\nHistoria inspirada en Tom y Jerry";

  // opciones de navegación
  cantidadOpciones[0] = 2;
  opcionATexto[0] = "Comenzar"; opcionASiguiente[0] = 1;
  opcionBTexto[0] = "Créditos"; opcionBSiguiente[0] = 14;

  cantidadOpciones[1] = 2;
  opcionATexto[1] = "Ir a la sala"; opcionASiguiente[1] = 2;
  opcionBTexto[1] = "Ir a la cocina"; opcionBSiguiente[1] = 3;

  cantidadOpciones[2] = 2;
  opcionATexto[2] = "Ir a la cocina"; opcionASiguiente[2] = 3;
  opcionBTexto[2] = "Volver entrada"; opcionBSiguiente[2] = 1;

  cantidadOpciones[3] = 2;
  opcionATexto[3] = "Puerta sótano"; opcionASiguiente[3] = 4;
  opcionBTexto[3] = "Volver sala"; opcionBSiguiente[3] = 2;

  cantidadOpciones[4] = 2;
  opcionATexto[4] = "Bajar"; opcionASiguiente[4] = 5;
  opcionBTexto[4] = "Volver cocina"; opcionBSiguiente[4] = 3;

  cantidadOpciones[5] = 2;
  opcionATexto[5] = "Seguir"; opcionASiguiente[5] = 6;
  opcionBTexto[5] = "Subir"; opcionBSiguiente[5] = 4;

  cantidadOpciones[6] = 2;
  opcionATexto[6] = "Ir izquierda"; opcionASiguiente[6] = 7;
  opcionBTexto[6] = "Ir derecha"; opcionBSiguiente[6] = 8;

  cantidadOpciones[7] = 2;
  opcionATexto[7] = "Buscar pista"; opcionASiguiente[7] = 9;
  opcionBTexto[7] = "Volver pasillo"; opcionBSiguiente[7] = 6;

  cantidadOpciones[8] = 2;
  opcionATexto[8] = "Seguir rastro"; opcionASiguiente[8] = 9;
  opcionBTexto[8] = "Volver pasillo"; opcionBSiguiente[8] = 6;

  cantidadOpciones[9] = 3;
  opcionATexto[9] = "Abrir puerta"; opcionASiguiente[9] = 12;
  opcionBTexto[9] = "Rodear"; opcionBSiguiente[9] = 11;
  opcionCTexto[9] = "Volver arriba"; opcionCSiguiente[9] = 10;

  cantidadOpciones[10] = 2;
  opcionATexto[10] = "Volver al inicio"; opcionASiguiente[10] = 0;
  opcionBTexto[10] = "Créditos"; opcionBSiguiente[10] = 14;

  cantidadOpciones[11] = 2;
  opcionATexto[11] = "Volver al inicio"; opcionASiguiente[11] = 0;
  opcionBTexto[11] = "Créditos"; opcionBSiguiente[11] = 14;

  cantidadOpciones[12] = 2;
  opcionATexto[12] = "Volver al inicio"; opcionASiguiente[12] = 0;
  opcionBTexto[12] = "Créditos"; opcionBSiguiente[12] = 14;

  cantidadOpciones[14] = 1;
  opcionATexto[14] = "Volver al inicio"; opcionASiguiente[14] = 0;
}

function draw() {
  background(0);

  let img = imagenes[pantalla];
  if (img) {
    image(img, 0, 0, ancho, alto);
  } else {
    background(0);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("Error: No se pudo cargar la imagen " + pantalla, width/2, height/2);
    return;
  }

  fill(0, 170);
  rect(20, 20, ancho - 40, 100);
  fill(255);
  textAlign(LEFT, TOP);
  text(textos[pantalla], 30, 30, ancho - 60, 90);

  if (pantalla === 12) {
    translate(random(-2, 2), random(-2, 2));
  }

  if (cantidadOpciones[pantalla] >= 1) dibujarBoton(...botonA, obtenerTextoOpcion('A', pantalla));
  if (cantidadOpciones[pantalla] >= 2) dibujarBoton(...botonB, obtenerTextoOpcion('B', pantalla));
  if (cantidadOpciones[pantalla] >= 3) dibujarBoton(...botonC, obtenerTextoOpcion('C', pantalla));

  textAlign(RIGHT, BOTTOM);
  fill(255);
  text("R = reinicia", ancho - 10, alto - 10);
}

function dibujarBoton(x, y, w, h, texto) {
  stroke(255);
  fill(20, 20, 20, 200);
  rect(x, y, w, h);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  text(texto, x + w / 2, y + h / 2);
}

function dentro(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function obtenerTextoOpcion(letra, pant) {
  if (letra === 'A') return opcionATexto[pant] || "";
  if (letra === 'B') return opcionBTexto[pant] || "";
  if (letra === 'C') return opcionCTexto[pant] || "";
  return "";
}

function obtenerSiguiente(letra, pant) {
  if (letra === 'A') return opcionASiguiente[pant];
  if (letra === 'B') return opcionBSiguiente[pant];
  if (letra === 'C') return opcionCSiguiente[pant];
  return pant;
}

function irAPantalla(nuevaPantalla) {
  pantalla = nuevaPantalla;
  if (pantalla === 12 && sonidoScreamer && !sonidoScreamer.isPlaying()) {
    sonidoScreamer.play();
  }
}

function iniciarAudio() {
  if (!audioIniciado) {
    if (getAudioContext().state !== 'running') {
      userStartAudio();
    }
    audioIniciado = true;
  }
}

function mousePressed() {
  iniciarAudio();

  if (sonidoClick) sonidoClick.play();

  if (pantalla === 0 && cantidadOpciones[0] === 2) {
    if (!dentro(...botonA) && !dentro(...botonB)) {
      irAPantalla(1);
      return;
    }
  }

  if (cantidadOpciones[pantalla] >= 1 && dentro(...botonA)) irAPantalla(obtenerSiguiente('A', pantalla));
  if (cantidadOpciones[pantalla] >= 2 && dentro(...botonB)) irAPantalla(obtenerSiguiente('B', pantalla));
  if (cantidadOpciones[pantalla] >= 3 && dentro(...botonC)) irAPantalla(obtenerSiguiente('C', pantalla));
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    if (sonidoScreamer && sonidoScreamer.isPlaying()) {
      sonidoScreamer.stop();
    }
    irAPantalla(0);
  }
}
