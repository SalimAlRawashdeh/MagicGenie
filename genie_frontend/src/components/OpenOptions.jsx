import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function OpenOptions() {
  const [showOverlay, setShowOverlay] = useState(false);
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

  useEffect(() => {
    if (showOverlay) fetchStats();
  }, [showOverlay]);

  return (
    <>
      <div>
        <button className="reset-btn" onClick={() => setShowOverlay(true)}>
          Options
        </button>
      </div>

      {showOverlay &&
        ReactDOM.createPortal(
          <div className="overlay" onClick={() => setShowOverlay(false)}>
            <div className="history" onClick={(e) => e.stopPropagation()}>
              <h3>Today's Stats</h3>

              <div className="bar-container">
                <div className="bar-label">Correct: {stats.correct}</div>
                <div className="bar-background">
                  <div
                    className="bar-correct"
                    style={{ width: `${stats.percentage_correct}%` }}
                  />
                </div>
              </div>

              <div className="bar-container">
                <div className="bar-label">Wrong: {stats.wrong}</div>
                <div className="bar-background">
                  <div
                    className="bar-wrong"
                    style={{ width: `${stats.percentage_wrong}%` }}
                  />
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default OpenOptions;
