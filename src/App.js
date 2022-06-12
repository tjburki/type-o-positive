import logo from './logo.png';
import './App.css';
import Game from './components/Game';
import DonateButton from './components/DontateButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{maxWidth: 125}} />
      </header>
      <div id='body' className='body'>
        <Game />  
      </div>
      <footer style={{padding: 25, display: 'flex', justifyContent: 'space-between'}}>
        <span>
          &copy; Tyler Burki {new Date().getFullYear()}
        </span>
        <span>
          <DonateButton />
        </span>
      </footer>
    </div>
  );
}

export default App;
