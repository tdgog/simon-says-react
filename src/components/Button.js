export default function Button({ colour, game }) {
    return <div 
        className={`h-64 aspect-square transition-all rounded-xl cursor-pointer ${colour} hover:border-4`}
        onClick={() => {
            game.check(colour);
            game.next();
        }}
    />
}
