import { useState } from 'react';
import './App.css';
import Typer from './components/Typer';
const excerpts = require('./excerpts.json');

function App() {
  const [text, setText] = useState(excerpts[Math.floor(Math.random() * excerpts.length)]);
  const [playing, setPlaying] = useState(false);
  const [results, setResults] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        Type-o Positive
      </header>
      <div className='body'>
        {
           !playing && results === null && <div style={{textAlign: 'center'}}><button onClick={() => setPlaying(true)}>Start</button></div>
        }
              { (playing || results !== null) && <Typer
                text={text}
                playing={playing}
                gameOver={results => { setResults(results); setPlaying(false); }}
              /> }
                    {
                !playing && results !== null && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bottom: 0, top: 0, left: 0, right: 0, position: 'fixed', zIndex: 10, backgroundColor: 'transparent'}}>
                  <div style={{backgroundColor: 'black', color: 'white', padding: 15}}>
                  <div style={{marginBottom: 15}}>WPM: {results.wpm}</div>
                  <div style={{marginBottom: 15}}>Errors: {results.errors}</div>
                  <div style={{marginBottom: 15}}>Adjusted WPM: {results.adjusted}</div>
                  <div style={{textAlign: 'center'}}><button onClick={() => { setText(excerpts[Math.floor(Math.random() * excerpts.length)]); setPlaying(true); }}>Play Again</button></div>
                  </div>
                </div>
            }
      </div>
      <footer style={{padding: 25}}>
        &copy; Tyler Burki {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
