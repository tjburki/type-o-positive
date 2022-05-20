import React, { useState, useEffect } from 'react';

function Word({word, activated = false, onComplete, onBack, playing, top}) {
    const input = React.useRef();
    const [type, setType] = useState('');

    useEffect(() => {
        if (!activated) return;

        const selection = window.getSelection();  
        const range = document.createRange();  
        selection.removeAllRanges();  
        range.selectNodeContents(input.current);  
        range.collapse(false);  
        selection.addRange(range);  

        input.current.focus();
    }, [activated, type]);

    useEffect(() => {
        if (!activated) return;

        const body = document.getElementById('body');
        body.scrollTo({
            top: input.current.offsetTop - (window.innerHeight * .4),
            behavior: "smooth"
        });
        
    }, [activated, input]);

    return (
        <div style={{marginBottom: 25, padding: 10, display: 'inline-block'}}>
            <div style={{
                marginBottom: 15, 
                color: activated ? '#F9DC5C' : 'inherit', 
                display: 'flex'
            }}>
                {
                    Object.assign([], word + ' ').map((c, i) =>
                        <div key={i} style={{position: 'relative'}}>
                            {c}
                            {
                                activated && i === type.length &&
                                    <div style={{position: 'absolute', textAlign: 'center', bottom: -25, left: 0, right: 0}}>^</div>
                            }
                        </div>
                    )
                }
            </div>
            <span 
                ref={input} 
                onKeyDown={e => {
                    e.preventDefault();

                    if (!playing || e.keyCode === 13) return;
                
                    if (e.keyCode === 8) {
                        if (!type.length) onBack();
                        setType(type.slice(0, type.length - 1));

                        return;
                    }

                    if (e.key === ' ') {
                        onComplete(type); 
                        return;
                    }

                    if (e.key.length > 1) return;

                    setType(type + e.key);
                }} 
                contentEditable={true}
                style={{display: 'inline-block', whiteSpace: 'nowrap'}}>
                    {
                        Object.assign([], type).map((c, i) =>
                            <span key={i} style={{color: i < word.length && word[i] === c ? '#3185FC' : '#E84855'}}>
                                {c}
                            </span>
                        )
                    }
            </span>
        </div>
    );
}

export default Word;