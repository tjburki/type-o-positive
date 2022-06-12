import logo from './logo.png';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{maxWidth: 125}} />
      </header>
      <div id='body' className='body'>
        <Game />  
      </div>
      <footer style={{padding: 25}}>
        &copy; Tyler Burki {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
