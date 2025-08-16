import React, {useRef, useEffect, useState} from "react";
import music from "../assets/music.mp3"

function AutoMusic({muted}) {
    const audioRef = useRef(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (audioRef.current && !started) {
            audioRef.current.loop = true;
            audioRef.current.play().catch(() => {
                // ignore autoplay error
            });
            setStarted(true);
        }
    }, [started]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = muted;
        }
    }, [muted]);

    return <audio ref={audioRef} src={music} preload="auto"/>;
}


export default AutoMusic