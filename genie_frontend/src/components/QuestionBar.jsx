import {useState} from "react";

function QuestionBar({count, setCount}) {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:8000", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
            })
        })

        const response = await res.json()
        console.log(response)
    }

     return (
          <input
            type="text"
            placeholder="Ask something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="typing-input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && text.trim() !== "" && count < 20) {
                  handleSubmit(e);
                  setCount(count + 1)
                  setText("")
              } else if (count >= 20 && e.key === "Enter"){
                  console.log("All questions asked!")
              }
            }}
          />
    );
}

export default QuestionBar