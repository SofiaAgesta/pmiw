// --- Clase Juego ---
// Esta es la clase "Jefe" que maneja toda la lógica y el estado del juego.

class Juego {

    constructor() {
        this.estado = 'instructions';
        this.virusArray = [];
        this.iconosFalsos = [];
        this.totalViruses = 10;
        this.virusesClicked = 0;
        this.tiempoLimite = 15;

        this.temporizador = new Temporizador(this.tiempoLimite);
        this.btnStart = new Boton(width / 2 - 100, height / 2 + 50, 200, 50, 'Empezar limpieza');
        this.btnRestart = new Boton(width / 2 - 100, height / 2 + 50, 200, 50, 'Reiniciar');
        this.btnCreditos = new Boton(width / 2 - 100, height / 2 + 110, 200, 50, 'Créditos');
        this.btnCreditsBack = new Boton(width / 2 - 100, height / 2 + 120, 200, 50, 'Volver');

        this.escritorio = new Escritorio();
        this.gestorSonido = new GestorSonido();
    }

    setup() {
        this.gestorSonido.cargarSonidos();
        this.iconosFalsos.push(new IconoFalso(40, 40, 'Mi PC'));
        this.iconosFalsos.push(new IconoFalso(40, 120, 'Papelera'));
    }

    update() {
        if (this.estado !== 'playing') return;

        for (let virus of this.virusArray) virus.update();
        this.temporizador.update();

        if (this.virusesClicked >= this.totalViruses) this.setEstado('win');
        if (this.temporizador.isTimeUp()) this.setEstado('lose');
    }

    show() {
        this.escritorio.show();
        for (let icono of this.iconosFalsos) icono.show();

        switch (this.estado) {
            case 'instructions':
                this.mostrarInstrucciones();
                break;
            case 'playing':
                this.mostrarJuego();
                break;
            case 'win':
                this.mostrarPantallaFinal('¡GANASTE!', '¡Sistema limpio!');
                break;
            case 'lose':
                this.mostrarPantallaFinal('¡PERDISTE!', 'Tiempo agotado. Sistema infectado.');
                break;
            case 'credits':
                this.mostrarCreditos();
                break;
        }
    }

    onMousePressed(mx, my) {
        switch (this.estado) {
            case 'instructions':
                if (this.btnStart.isClicked(mx, my)) this.iniciarJuego();
                if (this.btnCreditos.isClicked(mx, my)) this.setEstado('credits');
                break;

            case 'playing':
                this.manejarClicJuego(mx, my);
                break;

            case 'win':
            case 'lose':
                if (this.btnRestart.isClicked(mx, my)) this.iniciarJuego();
                break;

            case 'credits':
                if (this.btnCreditsBack.isClicked(mx, my)) this.setEstado('instructions');
                break;
        }
    }

    iniciarJuego() {
        this.gestorSonido.iniciarAudio();
        this.virusesClicked = 0;
        this.virusArray = [];

        for (let i = 0; i < this.totalViruses; i++) {
            let x = random(20, width - 20);
            let y = random(20, height - 70);
            this.virusArray.push(new Virus(x, y));
        }

        this.temporizador.reset();
        this.setEstado('playing');
    }

    manejarClicJuego(mx, my) {
        let virusClickeado = false;

        for (let i = this.virusArray.length - 1; i >= 0; i--) {
            if (this.virusArray[i].isClicked(mx, my)) {
                this.virusArray.splice(i, 1);
                this.virusesClicked++;
                this.gestorSonido.reproducir('click');
                virusClickeado = true;
                break;
            }
        }

        if (!virusClickeado) {
            for (let icono of this.iconosFalsos) {
                if (icono.isClicked(mx, my)) {
                    this.temporizador.restarTiempo(3000);
                    this.gestorSonido.reproducir('error');
                }
            }
        }
    }

    mostrarJuego() {
        for (let virus of this.virusArray) virus.show();

        this.temporizador.show();
        fill(255);
        noStroke();
        textSize(18);
        textAlign(CENTER, CENTER);
        text('Virus restantes: ' + (this.totalViruses - this.virusesClicked), width / 2, 40);
    }

    mostrarInstrucciones() {
        fill(0, 0, 0, 180);
        rect(0, 0, width, height);

        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('¡Anti-Virus Clicker!', width / 2, height / 2 - 150);

        textSize(16);
        text('Han aparecido ' + this.totalViruses + ' virus en el sistema.', width / 2, height / 2 - 100);
        text('Haz click sobre los virus para eliminarlos.', width / 2, height / 2 - 70);
        text('Evita hacer click en los íconos: restan tiempo.', width / 2, height / 2 - 40);
        text('Si eliminás todos los virus antes de que termine el tiempo, ganás.', width / 2, height / 2 - 10);

        this.btnStart.show();
        this.btnCreditos.show();
    }

    mostrarPantallaFinal(titulo, subtitulo) {
        this.mostrarJuego();

        fill(0, 0, 0, 150);
        rect(0, 0, width, height);

        fill(255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text(titulo, width / 2, height / 2 - 100);

        textSize(20);
        text(subtitulo, width / 2, height / 2 - 50);

        this.btnRestart.show();
    }

    mostrarCreditos() {
        this.escritorio.show();
        fill(0, 0, 0, 180);
        rect(0, 0, width, height);

        fill(255);
        textAlign(CENTER, CENTER);

        textSize(36);
        text('CRÉDITOS', width / 2, 90);

        textSize(18);
        text('Programación y Diseño:', width / 2, 160);
        text('Sofía Agesta y Felipe Ceniceros', width / 2, 190);

        text('Cátedra:', width / 2, 240);
        text('Programación – Comisión 2', width / 2, 270);

        text('Docente:', width / 2, 320);
        text('Matias', width / 2, 345);

        this.btnCreditsBack.show();
    }

    setEstado(nuevoEstado) {
        if (this.estado === nuevoEstado) return;

        this.estado = nuevoEstado;

        if (this.estado === 'win') {
            this.gestorSonido.reproducir('win');
            noLoop();
        } else if (this.estado === 'lose') {
            this.gestorSonido.reproducir('lose');
            noLoop();
        } else if (this.estado === 'playing') {
            loop();
        }
    }
}
