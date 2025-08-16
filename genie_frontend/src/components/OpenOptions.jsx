import {useState, useEffect} from "react";
import ReactDOM from "react-dom";

function OpenOptions({guessed, muted, setMuted}) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [word, setWord] = useState("");
    const [stats, setStats] = useState({
        correct: 0,
        wrong: 0,
        percentage_correct: 0,
        percentage_wrong: 0,
    });

    const fetchStats = () => {
        fetch("http://127.0.0.1:8000/today_stats/")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error(err));
    };

    const fetchWord = () => {
        fetch("http://127.0.0.1:8000/fetch_word/")
            .then((res) => res.json())
            .then((data) => setWord(data.word));
    };

    useEffect(() => {
        if (showOverlay) fetchStats();
    }, [showOverlay]);

    useEffect(() => {
        if (guessed) {
            fetchWord();
            setTimeout(() => {
                setShowOverlay(true);
            }, 2500);
        }
    }, [guessed]);

    return (
        <>
            <div>
                <button className="reset-btn" onClick={() => setShowOverlay(true)}>
                    options
                </button>
            </div>

            {showOverlay &&
                ReactDOM.createPortal(
                    <div className="overlay" onClick={() => setShowOverlay(false)}>
                        <div className="history" onClick={(e) => e.stopPropagation()}>
                            <h3>Today's Stats</h3>

                            {guessed && (
                                <div style={{marginBottom: "10px"}}>
                                    Daily Word: {word}
                                </div>
                            )}

                            <div className="bar-container">
                                <div className="bar-label">Correct: {stats.percentage_correct}% ({stats.correct})</div>
                                <div className="bar-background">
                                    <div
                                        className="bar-correct"
                                        style={{width: `${stats.percentage_correct}%`}}
                                    />
                                </div>
                            </div>

                            <div className="bar-container">
                                <div className="bar-label">Wrong: {stats.percentage_wrong}% ({stats.wrong})</div>
                                <div className="bar-background">
                                    <div
                                        className="bar-wrong"
                                        style={{width: `${stats.percentage_wrong}%`}}
                                    />
                                </div>
                            </div>

                            <div style={{marginTop: "20px", textAlign: "center"}}>
                                <button
                                    className="reset-btn"
                                    onClick={() => setMuted(!muted)}
                                >
                                    {muted ? "Unmute" : "Mute"}
                                </button>

                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

export default OpenOptions;
