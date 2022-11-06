export default function Button({ colour, game }) {
    return <div 
        id={colour}
        className={`h-64 aspect-square transition-all rounded-xl cursor-pointer ${colour} hover:border-4`}
        onClick={() => {
            game.addPlayerChoice(colour);
        }}
    />
}
