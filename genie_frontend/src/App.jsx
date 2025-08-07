import { useState } from 'react';
import './App.css';
import QuestionBar from './components/QuestionBar';
import GuessBar from "./components/GuessBar.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className={"app-container"}>
          <QuestionBar count = {count} setCount = {setCount}/>
          {count >= 20 && (
              <GuessBar/>
          )}
      </div>
  )
}

export default App;
