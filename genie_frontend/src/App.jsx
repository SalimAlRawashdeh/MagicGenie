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
import useLocalStorage from "./components/LocalStorage.jsx";

function App() {
    const today = new Date().toISOString().slice(0, 10);
    const [savedDate, setSavedDate] = useLocalStorage("savedDate", today);

    const [count, setCount] = useLocalStorage("count", 0);
    const [answer, setAnswer] = useLocalStorage("answer", "");
    const [correct, setCorrect] = useLocalStorage("correct", "");
    const [phase, setPhase] = useLocalStorage("phase", "start");
    const [history, setHistory] = useLocalStorage("history", []);
    const [guessed, setGuessed] = useLocalStorage("guessed", false);
    const [muted, setMuted] = useLocalStorage("muted", false);
    const [hasStarted, setHasStarted] = useLocalStorage("hasStarted", false);
    const [appeared, setAppeared] = useLocalStorage("appeared", false)

    useEffect(() => {
        if (savedDate !== today) {
            localStorage.clear();
            setCount(0);
            setAnswer("");
            setCorrect("");
            setPhase("start");
            setHistory([]);
            setGuessed(false);
            setMuted(false);
            setHasStarted(false);
            setAppeared(false);
            setSavedDate(today);
        }
    }, [savedDate, today, setSavedDate]);

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
            {hasStarted && <AutoMusic muted={muted}/>}


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
                        <GuessBar setCorrect={setCorrect} setPhase={setPhase} guessed={guessed}
                                  setGuessed={setGuessed}/>
                    )}
                </div>

                <div className="open-options-wrapper">
                    <OpenOptions guessed={guessed} muted={muted} setMuted={setMuted} appeared={appeared}
                                 setAppeared={setAppeared}/>
                </div>

            </div>


            {!hasStarted && (
                <StartButton setHasStarted={setHasStarted}/>
            )}
        </div>
    );
}

export default App;
