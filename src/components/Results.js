import { useEffect, useState } from "react";
import NewGameButton from "./NewGameButton";
import Result from './Result';

function Results({results, onNew}) {
    const encouragement = [
        'Good job!',
        'Nice work!',
        'Phew!',
        'Noice!',
        'Mad Skillz!',
        'Take a break!',
        'Ballin\'!',
        'Crushed it!',
        'Keep it up!',
        'Sweet dude!',
        'Victory!',
        'Weird flex, but OK',
        'GET SOME!',
        'Keep it rollin\'!',
        'Bom-chicka-wah-wah!'
    ];

    const [newGameDisabled, setNewGameDisabled] = useState(true);
    const [message] = useState(encouragement[Math.floor(Math.random() * encouragement.length)]);

    useEffect(() => { setTimeout(() => setNewGameDisabled(false),  2000); }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bottom: 0, top: 0, left: 0, right: 0, position: 'fixed', zIndex: 10, backgroundColor: 'transparent'}}>
            <form onSubmit={e => { e.preventDefault(); onNew(); }} style={{backgroundColor: 'black', color: 'white', padding: '25px 15px', borderRadius: 5, textAlign: 'center'}}>
                <div style={{display: 'flex'}}>
                    <div style={{width: '33%'}}>
                        <Result score={results.wpm} label='WPM' mid={50} high={65} />
                    </div>
                    <div style={{width: '33%'}}>
                        <Result score={Math.floor(results.accuracy * 100)} label='Accuracy' mid={75} high={90} />
                    </div>
                    <div style={{width: '33%'}}>
                        <Result score={results.adjusted} label='Adj WPM' mid={50} high={60} />
                    </div>
                </div>
                <div style={{marginTop: 25, height: 63, display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                    {
                        newGameDisabled ? <div style={{fontSize: '1.5rem'}}><span>{message}</span></div> :
                        <NewGameButton label="Play Again" />
                    }
                </div>
            </form>
        </div>
    );
}

export default Results;