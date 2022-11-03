import { useState, useEffect, useRef } from "react";
import Button from "./components/Button";
import Game from "./utils/game";

export default function App() {
    const options = ['bg-red-700', 'bg-green-700', 'bg-sky-700', 'bg-amber-600']
    const backgroundRef = useRef();
    const [title, setTitle] = useState('Level 1');
    const [isPlaying, setIsPlaying] = useState(true);
    
    let game = new Game(options, setTitle, backgroundRef);
    useEffect(() => {
        if(!isPlaying) {
            // Game over event
        }
    }, [isPlaying])

    return <div 
        ref={backgroundRef} 
        className='h-screen w-screen transition-all flex flex-center flex-col bg-[#0f172a]'
    >
        <p className='text-white text-7xl pb-10'>{title}</p>
        <div className='grid grid-cols-2 grid-rows-2 gap-4'>
            {options.map((option, i) => <Button key={i}
                colour={option}
                game={game}
            />)}
        </div>
    </div>

}
