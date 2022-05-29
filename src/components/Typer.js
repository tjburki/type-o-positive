import React, { useState, useEffect } from 'react';
import Word from './Word';
const excerpts = require('../excerpts.json');

function Typer({textId, playing, gameOver}) {
    const typer = React.useRef();
    const text = excerpts[textId];
    const [typedWords, setTypedWords] = useState({});
    const [activeWord, setActiveWord] = useState(0);
 
    const words = text.split(' ');
    const typedKeys = Object.keys(typedWords);

    useEffect(() => {
        if (!playing) return;

        setActiveWord(0);
        setTypedWords({});
    }, [playing]);

    useEffect(() => {
        if (playing) return;
     
        if (!typedKeys.length) {
            gameOver({wordCount: 0, accuracy: 0});
            return;
        }

        const wordCount = typedKeys.length;
        const errors = typedKeys.filter(k => typedWords[k] !== words[k]).length;
        const errorPercentage = (errors / typedKeys.length);
        const accuracy = 1 - (isNaN(errorPercentage) ? 1 : errorPercentage);

        gameOver({wordCount, accuracy});
    }, [playing])

    return (
        <div id="typer-container">
            <div ref={typer} id="typer">
                {
                    words.map((word, i) => 
                        <Word 
                            key={i} 
                            word={word} 
                            activated={activeWord === i} 
                            onComplete={w => { setTypedWords({...typedWords, [i]: w}); setActiveWord(activeWord + 1);}} 
                            onBack={() => {                     
                                const ntw = {...typedWords};
                                delete ntw[activeWord];
                                setActiveWord(activeWord - 1); 
                                setTypedWords(ntw); 
                            }} 
                            playing={playing}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default Typer;