import {useState} from "react";

function QuestionBar({count, setCount, setAnswer, setPhase, setHistory}) {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setPhase("questions")

        const res = await fetch("http://127.0.0.1:8000", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
            })
        })

        const data = await res.json()
        if (data.response !== "yes" && data.response !== "no") {
            data.response = "maybe"
        }

        setAnswer(data.response)
        setCount((prevCount) => prevCount + 1);
        setHistory(prev => [...prev, {question: text, answer: data.response}])

        console.log(data.response)
        console.log(data)
    }

     return (
         <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
             <input
                 type="text"
                 placeholder="Ask something..."
                 value={text}
                 onChange={(e) => setText(e.target.value)}
                 className="typing-input"
                 onKeyDown={(e) => {
                     if (e.key === "Enter" && !e.shiftKey && text.trim() !== "" && count < 20) {
                         handleSubmit(e);
                         setText("");
                     }
                 }}
             />
         </div>
     );
}

export default QuestionBar