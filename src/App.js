import { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';
import Result from './components/Result';
import Typer from './components/Typer';
const excerpts = require('./excerpts.json');

function App() {
  const [textId, setTextId] = useState(null);
  const [playCount, setPlayCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [results, setResults] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [to, setTo] = useState(null);

  const timeLimit = 60;
  const timeElapsed = currentTime && startTime ? Math.round((currentTime.getTime() - startTime.getTime()) / 1000) : 0;
  const timeRemaining = Math.max(timeLimit - timeElapsed, 0);
  const wpmMultiplier = 60 / timeLimit;

  useEffect(() => {

    document.body.addEventListener('keydown', newGameFromKey);
  }, []);

  useEffect(() => {
    if (!playing) {
      clearInterval(to);
      return;
    }

    setStartTime(new Date());
    setCurrentTime(new Date());
    setTo(setInterval(() => {
      setCurrentTime(new Date());
    }, 1000));
  },[playing]);

  useEffect(() => {
    if (!(currentTime && startTime)) return;

    if (timeRemaining <= 0) {
      setPlaying(false);
    }
  }, [currentTime]);

  function newGameFromKey(e, playing) {
    if (playing || e.keyCode !== 13) return; 

    e.preventDefault();
    setTextId(getRandomTextId());
    setPlayCount(playCount + 1);
    setPlaying(true);
  }

  function getRandomTextId() {
    return Math.floor(Math.random() * excerpts.length);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{maxWidth: 200}} />
      </header>
      <div tabIndex="0" autoFocus={true} id='body' className='body'>
        {
           !playing && results === null && 
              <div style={{display: 'flex', height: '100%', fontSize: '2em', justifyContent: 'center', alignItems: 'center'}}>
                Press&nbsp;<b style={{fontSize: '1.2em', marginBottom: 5}}>Enter</b>&nbsp;to begin
              </div>
        }
        { 
          textId !== null && 
            <Typer
              key={playCount}
              textId={textId}
              playing={playing}
              visible={playing || results !== null}
              gameOver={results => { 
                const wpm = (results.wordCount / ((timeRemaining / timeLimit) || 1)) * wpmMultiplier;
                const calcResults = {
                  ...results,
                  wpm,
                  adjusted: Math.floor(wpm * results.accuracy)
                };
                setResults(calcResults); 
                setPlaying(false); 
              }}
            /> 
        }
      </div>
      {
        !playing && results !== null && 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bottom: 0, top: 0, left: 0, right: 0, position: 'fixed', zIndex: 10, backgroundColor: 'transparent'}}>
            <div style={{backgroundColor: 'black', color: 'white', padding: 25, borderRadius: 5, textAlign: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Result score={results.wpm} label='WPM' mid={50} high={75} />
                <Result score={Math.floor(results.accuracy * 100)} label='Accuracy' mid={75} high={90} />
                <Result score={results.adjusted} label='Adj WPM' mid={50} high={75} />
              </div>
              <div style={{marginTop: 25}}>Press <b style={{fontSize: '1.2em'}}>Enter</b> to play again</div>
            </div>
          </div>
      }
      {
        playing && 
          <div style={{position: 'fixed', bottom: 7, right: 10, padding: 15, backgroundColor: 'black'}}>
              Time remaining: {timeRemaining}
          </div>
      }
      <footer style={{padding: 25}}>
        &copy; Tyler Burki {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
