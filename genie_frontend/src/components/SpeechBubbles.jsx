import initialspeech from "../assets/initialspeech.webm";
import yes from "../assets/yes.webm";
import no from "../assets/no.webm";
import maybe from "../assets/maybe.webm";
import winner from "../assets/winner.webm";
import loser from "../assets/loser.webm";

function SpeechBubbles({phase, answer, correct}) {
    return (
        <div className="speech-bubble-area">
            {phase === "start" && (
                <video src={initialspeech} autoPlay playsInline muted
                    onEnded={(e) => e.currentTarget.pause()}
                    className="speech-bubble"
                />
            )}

            {phase === "questions" && answer !== "" && (
                <>
                    {answer === "yes" && <video src={yes} autoPlay playsInline muted
                                                onEnded={(e) => e.currentTarget.pause()}
                                                className="speech-bubble"
                    />}

                    {answer === "no" && <video src={no} autoPlay playsInline muted
                                               onEnded={(e) => e.currentTarget.pause()}
                                               className="speech-bubble"
                    />}

                    {answer !== "yes" && answer !== "no" && (
                        <video src={maybe} autoPlay playsInline muted
                               onEnded={(e) => e.currentTarget.pause()}
                               className="speech-bubble"
                        />
                    )}
                </>
            )}

            {phase === "guessing" && (
                <>
                    {correct === "true" && <video src={winner} autoPlay playsInline muted
                                                  onEnded={(e) => e.currentTarget.pause()}
                                                  className="speech-bubble"
                    />}

                    {correct === "false" && <video src={loser} autoPlay playsInline muted
                                                   onEnded={(e) => e.currentTarget.pause()}
                                                   className="speech-bubble"
                    />}
                </>
            )}

        </div>
    )
}

export default SpeechBubbles