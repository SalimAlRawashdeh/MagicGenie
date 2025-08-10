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
    const [phase, setPhase] = useState("start");

    return (
        <div className="app-root">
            <div className="counter">
                {count}/20
            </div>

            <div className="speech-bubble-area">
                {phase === "start" && (
                    <img src={initialspeech} className="speech-bubble"/>
                )}

                {phase === "questions" && answer !== "" && (
                    <>
                        {answer === "yes" && <img src={yes} className="speech-bubble"/>}
                        {answer === "no" && <img src={no} className="speech-bubble"/>}
                        {answer !== "yes" && answer !== "no" && (
                            <img src={maybe} className="speech-bubble"/>
                        )}
                    </>
                )}

                {phase === "guessing" && (
                    <>
                        {correct === "true" && <img src={winner} className="speech-bubble"/>}
                        {correct === "false" && <img src={loser} className="speech-bubble"/>}
                    </>
                )}

            </div>

            <div className="hands-container">
                <img src={magichand} className="right-magic-hand"/>
                <img src={magichand} className="left-magic-hand"/>
            </div>

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
