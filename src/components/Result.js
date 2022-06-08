import React from 'react';

function Result({score, label, mid, high, best}) {
    return (
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <div style={{
                padding: 15, 
                margin: 5, 
                backgroundColor: parseInt(score) >= high ? '#3185FC' : parseInt(score) >= mid ? '#F9DC5C' : '#E84855',
                borderRadius: '50%', 
                border: '5px solid white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 75,
                width: 75
            }}>
                <div style={{
                    fontSize: '1.8rem'
                }}>
                    <b>{score}</b>
                </div>
                <div style={{fontSize: '.6rem'}}>
                    <b>{label}</b>
                </div>
            </div>
            {
                !!best && 
                    <div>
                        Best: {best}
                    </div> 
            }
        </div>
    );
}

export default Result;