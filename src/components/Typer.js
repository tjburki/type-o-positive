import React, { useState, useEffect } from 'react';

function Typer({text, playing, gameOver}) {
    const [type, setType] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [to, setTo] = useState(null);
    const timeLimit = 60;
    

    useEffect(() => {
        if (!playing) return;
        setType('');
        setStartTime(new Date());
        setTo(setInterval(() => setCurrentTime(new Date()), 1000));
        document.getElementById('typer').focus();
        scrollToFocus(1);
    }, [playing]);

    useEffect(() => {
        if (!startTime || !currentTime || timeLimit - timeElapsed() > 0) return;

        clearInterval(to);
        if (!type.length) {
            gameOver({wpm: 0, errors: 0, adjusted: 0});
            return;
        }
        const wpm = text.slice(0, type.length).match(/ /g).length;
        const errors = Object.assign([], type).filter((ty, i) => ty !== text[i]).length;
        const adjusted = Math.max(Math.floor(wpm - (.75 * errors)), 0);
        gameOver({wpm, errors, adjusted});
    }, [currentTime])

    function timeElapsed() {
        return Math.round((currentTime.getTime() - startTime.getTime()) / 1000);
    }

    function onKeyDown(e) {
        if (!playing) return;
        if (e.keyCode === 8) {
            setType(type.slice(0, type.length - 1));
            return;
        }

        if (e.key.length !== 1) {
            return;
        }

        if (type.length >= text.length) return;
    
        setType(`${type}${e.key}`);

        e.preventDefault();
        scrollToFocus();
    }

    function scrollToFocus(focus) {
        var topOfElement = document.querySelector(`#char-${focus || type.length || 1}`).offsetTop - 100;
window.scroll({ top: topOfElement, behavior: "smooth" });
    }

    return (
        <div tabindex="0" id="typer" style={{display: 'flex'}} onKeyDown={onKeyDown}>
            {playing && startTime && currentTime && <div style={{position: 'fixed', bottom: 15, right: 15, padding: 15, backgroundColor: 'black'}}>{
                timeLimit - timeElapsed()
            }</div>}
            {
                Object.assign([], text).map((c, i) => <div key={i} id={`char-${i}`} >
                    
                    <div style={{marginBottom: 10, paddingTop: 60, marginTop: -60, color: i === type.length ? '#F9DC5C' : 'inherit', position: 'relative'}}>
                    {
                        i === type.length ? <div style={{color: 'F9DC5C', position: 'absolute', bottom: '-25px'}}>^</div> : null
                    }
                    {
                    c === ' ' ? <span>&nbsp;</span> : <span>{c}</span>}</div>
                    <div style={{marginBottom: 20, color: i < type.length ? type[i] === text[i] ? '#3185FC' : '#E84855' : 'transparent'}}>{type[i] || <span>&nbsp;</span>}</div>
                </div>)
            }
        </div>
    );
}

export default Typer;