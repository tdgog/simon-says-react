export default class Game {

    constructor(options, setTitle, backgroundRef) {
        this.gameSequence = [];
        this.playSequence = [];
        this.options = options;
        this.setTitle = setTitle;
        this.backgroundRef = backgroundRef;
        this.level = 1;
    }

    check() {
        if(this.playSequence.at(-1) === this.gameSequence.at(-1)){
            this.level += 1;
            this.setTitle(`Level ${this.level}`);
            return;
        }

        this.setTitle('Fail, press any key to restart')
        this.backgroundRef.current.style.backgroundColor = '#ff0000'
        setTimeout(() => {
            this.backgroundRef.current.style.backgroundColor = '#0f172a'
        }, 500);
        return;
    }
    
    next() {
        const selection = this.options[Math.floor(Math.random() * this.options.length)];
        this.gameSequence.push(selection);
        return selection;
    }

}
