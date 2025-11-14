//Clase Boton
// Define un botón reutilizable con efecto hover.

class Boton {
    constructor(x, y, w, h, texto) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.texto = texto;
    }
    
    show() {
        stroke(0);
        strokeWeight(2);
        
        // Detección de hover (cuando el mouse está encima)
        if (this.isHover(mouseX, mouseY)) {
            fill(220); 
        } else {
            fill(192, 192, 192); 
        }
        
        rect(this.x, this.y, this.w, this.h, 5); 
        
        noStroke();
        fill(0);
        textSize(18);
        textAlign(CENTER, CENTER);
        text(this.texto, this.x + this.w / 2, this.y + this.h / 2);
    }
    
    // chequea sis el mouse esta arriba
    isHover(mx, my) {
        return (
            mx > this.x &&
            mx < this.x + this.w &&
            my > this.y &&
            my < this.y + this.h
        );
    }
    
    // chequea el clic
    isClicked(mx, my) {
        
        return this.isHover(mx, my);
    }
}
