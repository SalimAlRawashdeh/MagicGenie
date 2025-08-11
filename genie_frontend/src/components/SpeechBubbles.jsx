import initialspeech from "../assets/initialspeech.gif";
import yes from "../assets/yes.gif";
import no from "../assets/no.gif";
import maybe from "../assets/maybe.gif";
import winner from "../assets/winner.gif";
import loser from "../assets/loser.gif";

function SpeechBubbles ({phase, answer, correct}) {
    return (
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
    )
}

export default SpeechBubbles