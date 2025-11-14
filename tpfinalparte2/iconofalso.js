// Clase IconoFalso
// Define los iconos de "Mi PC" y "Papelera" que penalizan al jugador.

class IconoFalso {
    constructor(x, y, texto) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.texto = texto;
    }
    
    show() {
        noStroke();
        
       
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        
        
        fill(0, 0, 150);
        rect(this.x + 10, this.y + 10, this.w - 20, this.h - 20);
        
        
        fill(255); 
        textSize(12);
        textAlign(CENTER, CENTER);
        text(this.texto, this.x + this.w / 2, this.y + this.h + 10);
    }
    
    // deteccion del cliccc
    isClicked(mx, my) {
        return (
            mx > this.x &&
            mx < this.x + this.w &&
            my > this.y &&
            my < this.y + this.h
        );
    }
}
