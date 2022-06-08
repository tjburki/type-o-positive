import { useState } from 'react';

function TimeRemainingDisplay({remaining, onStop}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div onClick={onStop} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{cursor: 'pointer', position: 'fixed', fontSize: '1rem', width: 150, textAlign: 'center', top: 17, right: 10, padding: 10, backgroundColor: 'black'}}>
            {
                !hovered 
                    ?   <span>Time remaining: {remaining}</span>
                    :   <span style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                            <span>x</span><span style={{paddingLeft: 10}}>End</span>
                        </span>
            }
        </div>
    );
}

export default TimeRemainingDisplay;