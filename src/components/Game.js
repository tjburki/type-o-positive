import {useState, useEffect} from 'react';
import TimeRemainingDisplay from './TimeRemainingDisplay';
import Results from './Results';
import NewGameButton from './NewGameButton';
import Typer from './Typer';
import Timer from './Timer';
const excerpts = require('../excerpts.json');

function Game() {
    const [textId, setTextId] = useState(null);
    const [playCount, setPlayCount] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [results, setResults] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState();

    const timeLimit = 60;
    const wpmMultiplier = 60 / timeLimit;

    useEffect(() => {
        if (!playing) {
          return;
        }
    
        setPlayCount(playCount + 1);
        setTextId(getRandomTextId());
    },[playing]);
    
    function getRandomTextId() {
        return Math.floor(Math.random() * excerpts.length);
    }

    const gameOver = results => { 
        const wpm = results.wordCount * wpmMultiplier;
        const calcResults = {
            ...results,
            wpm,
            adjusted: Math.floor(wpm * results.accuracy)
        };
        setResults(calcResults); 
        setPlaying(false); 
    };

    return (
        <>
            {
                !playing && results === null && 
                    <form onSubmit={e => { e.preventDefault(); setPlaying(true); }} style={{display: 'flex', height: '100%', fontSize: '2rem', justifyContent: 'center', alignItems: 'center'}}>
                        <NewGameButton label="Start" />
                    </form>
            }
            {
                textId != null &&
                    <Typer
                        key={`typer-${playCount}`}
                        textId={textId}
                        playing={playing}
                        gameOver={gameOver}
                    /> 
            }
            {
                playing && 
                    <>
                        <Timer buzz={() => setPlaying(false)} tick={setTimeRemaining} />
                        { timeRemaining && <TimeRemainingDisplay onStop={() => setPlaying(false)} remaining={timeRemaining} /> }
                    </>
            }
            {
                !playing && results && 
                    <Results results={results} onNew={() => setPlaying(true)} />
            }
        </>
    );
}

export default Game;