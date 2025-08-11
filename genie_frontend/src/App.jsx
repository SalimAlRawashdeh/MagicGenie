import {useState} from 'react';
import './App.css';
import QuestionBar from './components/QuestionBar';
import GuessBar from "./components/GuessBar.jsx";
import TopBar from "./components/TopBar.jsx";
import SpeechBubbles from "./components/SpeechBubbles.jsx";
import HandsContainer from "./components/HandsContainer.jsx";
import AutoMusic from "./components/AutoMusic.jsx";

function App() {
    const [count, setCount] = useState(0);
    const [answer, setAnswer] = useState("")
    const [correct, setCorrect] = useState("")
    const [phase, setPhase] = useState("start");

    return (
        <div className="app-root">
            <AutoMusic/>

            <TopBar count={count} setCount={setCount} setPhase={setPhase}/>

            <SpeechBubbles phase={phase} correct={correct} answer={answer}/>

            <HandsContainer/>

            <div className="questions-container">
                {count < 20 ? (
                    <QuestionBar count={count} setCount={setCount} setAnswer={setAnswer} setPhase={setPhase}/>
                ) : (
                    <GuessBar setCorrect={setCorrect} setPhase={setPhase}/>
                )}
            </div>
        </div>
    )
        ;
}

export default App;
