export default class Game {

    constructor(options, backgroundRef) {
        this.options = options;
        
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
            document.getElementById('title').innerHTML = `Level ${this.level}`
        }, 200);
    }

    addPlayerChoice(choice) {
        this.playSequence.push(choice);
        this.checkPlayerSequenceIsGameSequence();
        
        setTimeout(() => console.log(this.playSequence, this.gameSequence), 200)
        
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
        setTimeout(() => {
            const element = document.getElementById(option);
    
            element.className = element.className.replace(/bg-((\[#\w+])|([\w-]+))/g, 'bg-white');
            setTimeout(() => {
                element.className = element.className.replace('bg-white', option);
            }, 200);
        }, 500);
    }

    next() {
        
        const option = this.options[Math.floor(Math.random() * this.options.length)];
        this.gameSequence.push(option);
        this.playSequence = [];
        this.performButtonWhiteFlash(option);

        this.level++;
        document.getElementById('title').innerHTML = `Level ${this.level}`
    }

    playerLostGame() {
        this.playing = false;

        document.getElementById('title').innerHTML = `Fail, press any key to restart`
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
        this.playing = true;

        this.next();
    }
}
