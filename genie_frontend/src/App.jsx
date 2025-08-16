import {useState, useEffect} from 'react';
import './App.css';
import QuestionBar from './components/QuestionBar';
import GuessBar from "./components/GuessBar.jsx";
import TopBar from "./components/TopBar.jsx";
import SpeechBubbles from "./components/SpeechBubbles.jsx";
import HandsContainer from "./components/HandsContainer.jsx";
import AutoMusic from "./components/AutoMusic.jsx";
import StartButton from "./components/StartButton.jsx";
import OpenHistory from "./components/OpenHistory.jsx";
import OpenOptions from "./components/OpenOptions.jsx";

function App() {
    const [count, setCount] = useState(0);
    const [answer, setAnswer] = useState("")
    const [correct, setCorrect] = useState("")
    const [phase, setPhase] = useState("start");
    const [hasStarted, setHasStarted] = useState(false)
    const [history, setHistory] = useState([])
    const [guessed, setGuessed] = useState(false)

    useEffect(() => {
        const preventScroll = (e) => {
            e.preventDefault();
        };

        window.addEventListener('wheel', preventScroll, {passive: false});
        window.addEventListener('touchmove', preventScroll, {passive: false});

        return () => {
            window.removeEventListener('wheel', preventScroll, {passive: false});
            window.removeEventListener('touchmove', preventScroll, {passive: false});
        };
    }, []);

    return (
        <div className="app-root">
            {hasStarted && (
                <AutoMusic/>
            )}

            <TopBar count={count} setCount={setCount} setPhase={setPhase}/>

            <SpeechBubbles phase={phase} correct={correct} answer={answer}/>

            <HandsContainer/>

            <div className="question-row">
                <div className="open-history-wrapper">
                    <OpenHistory history={history}/>
                </div>
                <div className="questions-container">
                    {count < 20 ? (
                        <QuestionBar
                            count={count}
                            setCount={setCount}
                            setAnswer={setAnswer}
                            setPhase={setPhase}
                            setHistory={setHistory}
                        />
                    ) : (
                        <GuessBar setCorrect={setCorrect} setPhase={setPhase} guessed={guessed} setGuessed={setGuessed}/>
                    )}
                </div>

                <div className = "open-options-wrapper">
                    <OpenOptions guessed = {guessed}/>
                </div>
                
            </div>


            {!hasStarted && (
                <StartButton setHasStarted={setHasStarted}/>
            )}
        </div>
    );
}

export default App;
