import {useState} from "react";
import ReactDOM from 'react-dom'

function OpenHistory({history}) {
    const [showOverlay, setShowOverlay] = useState(false)

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
                        <div onClick={e => e.stopPropagation()} className="history">
                            {history.length === 0 ? (
                                <p> no history yet </p>
                            ) : (
                                <ul style={{listStyle: 'none', padding: 0}}>
                                    {history.map((item, idx) => (
                                        <li key={idx} style={{marginBottom: '1.5rem'}}>
                                            <strong>Q:</strong> {item.question}<br/>
                                            <strong>A:</strong> {item.answer}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>,
                    document.body
                ))}
        </>
    );
}

export default OpenHistory