import React, {useRef, useEffect, useState} from "react";
import music from "../assets/music.mp3"

function AutoMusic () {
    const audioRef = useRef(null)
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startAudio = () => {
            if(audioRef.current && !started) {
                audioRef.current.loop = true;
                audioRef.current.play()
                setStarted(true);
            }
        };

        window.addEventListener("click", startAudio)
        return () => {
            window.removeEventListener("click", startAudio)
        }
    }, [started]);

    return (
        <audio ref = {audioRef} src = {music} preload = "auto" />
    )
}

export default AutoMusic