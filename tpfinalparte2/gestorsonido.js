// Clase GestorSonido
// Responsabilidad única: cargar y reproducir todos los sonidos.

class GestorSonido {
    constructor() {
        this.sonidos = {}; 
    }
    
   
    
    cargarSonidos() {
       
       
        
        this.sonidos.click = new p5.Oscillator();
        this.sonidos.click.setType('square');
        this.sonidos.click.freq(800);
        
        
        this.sonidos.win = new p5.Oscillator();
        this.sonidos.win.setType('triangle');
        this.sonidos.win.freq(600);
        
        
        this.sonidos.lose = new p5.Oscillator();
        this.sonidos.lose.setType('sawtooth');
        this.sonidos.lose.freq(200);
        
        
        this.sonidos.error = new p5.Oscillator();
        this.sonidos.error.setType('sine');
        this.sonidos.error.freq(300);
        
        
        for (let key in this.sonidos) {
            this.sonidos[key].amp(0);
            this.sonidos[key].start();
        }
    }
    
    
    iniciarAudio() {
        if (getAudioContext().state !== 'running') {
            userStartAudio();
        }
    }
    
    
    reproducir(nombre) {
        let snd = this.sonidos[nombre];
        if (snd) {
            let amp = 0.3;
            let duracion = 0.1;
            
            if (nombre === 'win') {
                amp = 0.4;
                duracion = 0.5;
            } else if (nombre === 'lose') {
                amp = 0.5;
                duracion = 1.0;
            } else if (nombre === 'error') {
                amp = 0.4;
                duracion = 0.2;
            }
            
            
            snd.amp(amp, 0.05);
            snd.amp(0, duracion, 0.05);
        }
    }
}
