import { useState } from 'react';
import './App.css';
import magichand from './assets/magichand.gif';
import QuestionBar from './components/QuestionBar';
import GuessBar from "./components/GuessBar.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="app-root">
            <div className="hands-container">
                <img src={magichand} className="right-magic-hand" />
                <img src={magichand} className="left-magic-hand" />
            </div>

            <div className="questions-container">
                {count <= 2 ? (
                    <QuestionBar count={count} setCount={setCount} />
                ) : (
                    <GuessBar />
                )}
            </div>
        </div>
    );
}

export default App;
