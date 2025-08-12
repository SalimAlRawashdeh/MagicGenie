function StartButton ({setHasStarted}) {
    return (
        <div className="overlay">
            <button onClick={() => setHasStarted(true)} className="reset-btn">
                start game
            </button>
        </div>
    );
}

export default StartButton