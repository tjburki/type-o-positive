import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Typer from './components/Typer';

function App() {
  const [text, setText] = useState('It was 7 minutes after midnight. The dog was lying on the grass in the middle of the lawn in front of Mrs Shears’ house. Its eyes were closed. It looked as if it was running on its side, the way dogs run when they think they are chasing a cat in a dream. But the dog was not running or asleep. The dog was dead. There was a garden fork sticking out of the dog. The points of the fork must have gone all the way through the dog and into the ground because the fork had not fallen over. I decided that the dog was probably killed with the fork because I could not see any other wounds in the dog and I do not think you would stick a garden fork into a dog after it had died for some other reason, like cancer for example, or a road accident. But I could not be certain about this.');
  const [playing, setPlaying] = useState(false);
  const [results, setResults] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        Type-o Positive
      </header>
      <div>
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
                  <div style={{textAlign: 'center'}}><button onClick={() => setPlaying(true)}>Play Again</button></div>
                  </div>
                </div>
            }
      </div>
    </div>
  );
}

export default App;
