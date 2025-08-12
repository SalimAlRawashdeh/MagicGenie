function TopBar ({count, setPhase, setCount}) {
    return (
        <div className="top-bar">
            <div className="counter">
                {count}/20
            </div>
            <button className="reset-btn"
                    onClick={() => {
                        setPhase("guessing");
                        setCount(20);
                    }}>
                guess
            </button>
        </div>
    )
}

export default TopBar