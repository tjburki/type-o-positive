import { useEffect, useState } from "react";
import NewGameButton from "./NewGameButton";
import Result from './Result';

function Results({results, onNew}) {
    const [showNewGame, setShowNewGame] = useState(false);

    useEffect(() => { setTimeout(() => setShowNewGame(true),  2000); }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bottom: 0, top: 0, left: 0, right: 0, position: 'fixed', zIndex: 10, backgroundColor: 'transparent'}}>
            <form onSubmit={e => { e.preventDefault(); onNew(); }} style={{backgroundColor: 'black', color: 'white', padding: 25, borderRadius: 5, textAlign: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Result score={results.wpm} label='WPM' mid={50} high={65} />
                <Result score={Math.floor(results.accuracy * 100)} label='Accuracy' mid={75} high={90} />
                <Result score={results.adjusted} label='Adj WPM' mid={50} high={60} />
                </div>
                {
                    showNewGame && <div style={{marginTop: 25}}><NewGameButton label="Play Again" /></div>
                }
            </form>
        </div>
    );
}

export default Results;