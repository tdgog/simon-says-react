export default class Game {

    constructor(options, setTitle, backgroundRef) {
        this.gameSequence = [];
        this.playSequence = [];
        this.options = options;
        this.setTitle = setTitle;
        this.backgroundRef = backgroundRef;
        this.level = 1;

        this.playing = true;
    }

    check() {
        if(this.playing && this.playSequence.at(-1) === this.gameSequence.at(-1)){
            this.level += 1;
            this.setTitle(`Level ${this.level}`);
            return;
        }

        this.playing = false;

        this.reset();

        this.setTitle('Fail, press any key to restart')
        this.backgroundRef.current.style.backgroundColor = '#ff0000'
        setTimeout(() => {
            this.backgroundRef.current.style.backgroundColor = '#0f172a'
        }, 500);
    }
    
    next() {
        const selection = this.options[Math.floor(Math.random() * this.options.length)];
        this.gameSequence.push(selection);
        return selection;
    }

    reset() {
        const _this = this;
        const callback = () => {
            console.log('Pressed key!')
            document.removeEventListener('keydown', callback);

            _this.gameSequence = [];
            _this.playSequence = [];
            _this.level = 1;

            this.setTitle(`Level ${this.level}`);
        }
        document.addEventListener('keydown', callback);
    }

}
