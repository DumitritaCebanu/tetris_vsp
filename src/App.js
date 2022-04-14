import './App.css';
import Tetrominos from './Tetrominos.jsx';
function App() {



  return (
    <div className="container">
        <div className="board">
            <Tetrominos/>
            <div className="item"></div>
        </div>
    </div>
  );
}

export default App;
