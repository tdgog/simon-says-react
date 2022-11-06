export default class Game {

    constructor(options, setTitle, backgroundRef) {
        this.options = options;
        
        this.setTitle = setTitle;
        this.backgroundRef = backgroundRef;
        
        this.level = 1;
        this.gameSequence = [this.options[Math.floor(Math.random() * this.options.length)]];
        this.playSequence = [];
        
        this.playing = true;

        // Binds
        this.resetGame = this.resetGame.bind(this)

        console.log("first:", this.gameSequence)
        // Initialise game
        setTimeout(() => {
            this.performButtonWhiteFlash(this.gameSequence[0]);
            this.setTitle(`Level ${this.level}`)
        }, 200);
    }

    addPlayerChoice(choice) {
        this.playSequence.push(choice);
        this.checkPlayerSequenceIsGameSequence();

        console.log("Adding choice", choice)
        console.log(this.playSequence, this.gameSequence)
    }

    checkPlayerSequenceIsGameSequence() {
        if(!this.playing) {
            this.playerLostGame();
            return;
        }   
        for(let i = 0; i < this.playSequence.length; i++) {
            if(this.playSequence[i] !== this.gameSequence[i]) {
                this.playerLostGame();
                return;
            }
        }
        if(this.playSequence.length === this.gameSequence.length)
            this.next();
    }

    performButtonWhiteFlash(option) {
        const element = document.getElementById(option);

        element.className = element.className.replace(/bg-((\[#\w+])|([\w-]+))/g, 'bg-white');
        setTimeout(() => {
            element.className = element.className.replace('bg-white', option);
        }, 200);
    }

    next() {
        const option = this.options[Math.floor(Math.random() * this.options.length)];
        this.gameSequence.push(option);
        this.playSequence = [];
        this.performButtonWhiteFlash(option);

        this.level++;
        this.setTitle(`Level ${this.level}`)
    }

    playerLostGame() {
        this.playing = false;

        this.setTitle('Fail, press any key to restart')
        this.backgroundRef.current.style.backgroundColor = '#ff0000'
        setTimeout(() => {
            this.backgroundRef.current.style.backgroundColor = '#0f172a'
        }, 500);

        document.addEventListener('keydown', this.resetGame)
    }

    resetGame() {
        document.removeEventListener('keydown', this.resetGame)
        
        this.level = 0;
        this.gameSequence = [this.options[0]];
        this.playSequence = [];

        this.next();
    }
}
