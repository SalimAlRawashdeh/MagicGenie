import {useState} from "react";

function QuestionBar({setCorrect, setPhase, guessed, setGuessed}) {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setPhase("guessing")

        const res = await fetch("http://127.0.0.1:8000/guess/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guess: text,
            })
        })

        const data = await res.json()
        setGuessed(true)
        setCorrect(data.response)
        console.log(data.response)
    }

    return (
        <input
            type="text"
            placeholder="Guess something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="typing-input"
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && text.trim() !== "") {
                    if (!guessed) {
                        handleSubmit(e);
                        setText("")
                    }
                }
            }}
        />
    );
}

export default QuestionBar