import {useState} from 'react';
import './App.css';
import magichand from './assets/magichand.gif';
import initialspeech from './assets/initialspeech.gif'
import yes from './assets/yes.gif'
import no from './assets/no.gif'
import maybe from './assets/maybe.gif'
import winner from './assets/winner.gif'
import loser from './assets/loser.gif'
import QuestionBar from './components/QuestionBar';
import GuessBar from "./components/GuessBar.jsx";

function App() {
    const [count, setCount] = useState(0);
    const [answer, setAnswer] = useState("")
    const [correct, setCorrect] = useState("")
    const [phase, setPhase] = useState("asking");

    return (
        <div className="app-root">
            <div className="speech-bubble-area">
                {count === 0 ? (
                    <img src={initialspeech} className="speech-bubble"/>
                ) : count < 2 && answer !== "" ? (
                    answer === "yes" ? (
                        <img src={yes} className="speech-bubble"/>
                    ) : answer === "no" ? (
                        <img src={no} className="speech-bubble"/>
                    ) : (
                        <img src={maybe} className="speech-bubble"/>
                    )
                ) : (
                    correct === "true" ? (
                        <img src={winner} className="speech-bubble"/>
                    ) : (
                        <img src={loser} className="speech-bubble"/>
                    )
                )}
            </div>

            <div className="hands-container">
                <img src={magichand} className="right-magic-hand"/>
                <img src={magichand} className="left-magic-hand"/>
            </div>

            <div className="questions-container">
                {count < 2 ? (
                    <QuestionBar count={count} setCount={setCount} setAnswer={setAnswer}/>
                ) : (
                    <GuessBar setCorrect = {setCorrect}/>
                )}
            </div>
        </div>
    )
        ;
}

export default App;
