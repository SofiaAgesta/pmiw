// Clase Escritorio 
// Responsabilidad única: dibujar el fondo y la barra de tareas.

class Escritorio {
    constructor() {
        this.colorFondo = color(0, 128, 128); 
        this.colorBarra = color(192, 192, 192); 
        this.colorBotonInicio = color(0, 128, 0); 
    }
    
    show() {
        
        background(this.colorFondo);
        
       
        noStroke();
        fill(this.colorBarra);
        rect(0, height - 40, width, 40);
        
        
        fill(this.colorBotonInicio);
        stroke(0);
        strokeWeight(1);
        rect(5, height - 35, 50, 30);
        
        fill(255);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text('Inicio', 30, height - 20);
    }
}
