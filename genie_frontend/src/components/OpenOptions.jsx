import {useState} from "react";
import ReactDOM from 'react-dom'

function OpenOptions() {
    const [showOverlay, setShowOverlay] = useState(false)

    return (
        <>
            <div>
                <button className="reset-btn"
                        onClick={() => setShowOverlay(true)}>
                    options
                </button>
            </div>

            {showOverlay && (
                ReactDOM.createPortal(
                    <div className="overlay" onClick={() => setShowOverlay(false)}>
                        <div onClick={e => e.stopPropagation()} className="history">

                        </div>
                    </div>,
                    document.body
                ))}
        </>
    );
}

export default OpenOptions