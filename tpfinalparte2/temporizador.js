// Clase Temporizador
// Define un temporizador de cuenta regresiva.

class Temporizador {
    constructor(segundos) {
        this.duracionTotal = segundos * 1000; 
        this.tiempoInicio = 0; 
        this.tiempoRestante = this.duracionTotal;
    }
    
    update() {
      
        this.tiempoRestante = this.duracionTotal - (millis() - this.tiempoInicio);
    }
    
    show() {
        
        let segundos = ceil(this.tiempoRestante / 1000);
        
       
        if (segundos < 0) {
            segundos = 0;
        }
        
     
        if (segundos <= 5) {
            fill(255, 0, 0);
        } else {
            fill(0); 
        }
        
        noStroke();
        textSize(18);
        textAlign(RIGHT, CENTER);
        text('Tiempo: ' + segundos, width - 20, height - 20);
        textAlign(CENTER, CENTER); 
    }
    
    // Chequea si se acabó el tiempo
    isTimeUp() {
        return this.tiempoRestante <= 0;
    }
    
    // Reinicia el temporizador
    reset() {
        this.tiempoInicio = millis();
        this.tiempoRestante = this.duracionTotal;
    }
    
    // Método para la penalización
    restarTiempo(ms) {
        // Restar tiempo (en milisegundos)
        // Hacemos esto "moviendo" el tiempo de inicio hacia atrás
        this.tiempoInicio -= ms;
    }
}
