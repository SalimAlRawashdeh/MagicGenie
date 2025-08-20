import {useEffect, useState} from "react";
import ReactDOM from 'react-dom'

function OpenHistory({history}) {
    const [showOverlay, setShowOverlay] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        if (showOverlay && history.length > 0) {
            setQuestion(history[0].question);
            setAnswer(history[0].answer);
        }
    }, [showOverlay, history]);

    return (
        <>
            <div>
                <button className="reset-btn"
                        onClick={() => setShowOverlay(true)}>
                    history
                </button>
            </div>

            {showOverlay && (
                ReactDOM.createPortal(
                    <div className="overlay" onClick={() => setShowOverlay(false)}>
                        {history.length !== 0 && (
                            <div className="sidebar" onClick={e => e.stopPropagation()}>
                                <ul className="sidebar-list">
                                    {history.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                className={`sidebar-btn ${question === item.question ? 'clicked' : ''}`}
                                                onClick={() => {
                                                    setQuestion(item.question);
                                                    setAnswer(item.answer);
                                                }}
                                            >
                                                {item.question.length > 25
                                                    ? item.question.slice(0, 25) + "..."
                                                    : item.question}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                        }

                        <div onClick={e => e.stopPropagation()} className="history">
                            {history.length === 0 ? (
                                <p>No history yet</p>
                            ) : (
                                <ul style={{listStyle: 'none', padding: 0}}>
                                    <li style={{marginBottom: '0rem'}}>
                                        <strong>Q:</strong> {question}<br/>
                                        <strong>A:</strong> {answer}
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>,
                    document.body
                )
            )}

        </>
    );
}

export default OpenHistory