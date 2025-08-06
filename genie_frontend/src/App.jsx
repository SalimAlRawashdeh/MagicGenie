import { useState } from 'react';
import './App.css';

function App() {
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
    <div className="app-container">
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="typing-input"
        onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && text.trim() !== ""){
                handleSubmit(e);
        }
        }}
      />
    </div>
  );
}

export default App;
