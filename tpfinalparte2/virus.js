// Clase Virus 
// Define el objeto "Virus" que se mueve y puede ser clickeado.

class Virus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;
        
        // Velocidad aleatoria para cada virus
        this.speedX = random(-1.5, 1.5);
        this.speedY = random(-1.5, 1.5);
    }
    
    //  Mueve el virus y lo hace rebotar
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rebotar en los bordes X
        if (this.x < this.w / 2 || this.x > width - this.w / 2) {
            this.speedX *= -1; 
        }
        // Rebotar en los bordes Y, sin tocar la barra de tareas
        if (this.y < this.h / 2 || this.y > (height - 40) - this.h / 2) {
            this.speedY *= -1; 
        }
    }
    
    //  Dibuja el virus (estilo "pixel art")
    show() {
        noStroke();
        
        // Cuerpo verde
        fill(50, 200, 50);
        ellipse(this.x, this.y, this.w, this.h);
        
        // Ojos rojos
        fill(255, 0, 0);
        rectMode(CENTER); 
        rect(this.x - 7, this.y - 5, 5, 5);
        rect(this.x + 7, this.y - 5, 5, 5);
        rectMode(CORNER); 
        
       
        stroke(0);
        strokeWeight(2);
        line(this.x - 10, this.y + 10, this.x - 20, this.y + 20);
        line(this.x, this.y + 15, this.x, this.y + 25);
        line(this.x + 10, this.y + 10, this.x + 20, this.y + 20);
    }
    
    // etección de clic 
    isClicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        return d < this.w / 2;
    }
}
