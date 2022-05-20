import React from 'react';

function Result({score, label, mid, high, best}) {
    return (
        <div>
            <div style={{
                padding: 50, 
                margin: 25, 
                backgroundColor: parseInt(score) >= high ? '#3185FC' : parseInt(score) >= mid ? '#F9DC5C' : '#E84855',
                borderRadius: '50%', 
                border: '5px solid white',
                height: 100,
                width: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <div style={{
                    fontSize: '2.5em'
                }}>
                    <b>{score}</b>
                </div>
                <div style={{fontSize: '.8em'}}>
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