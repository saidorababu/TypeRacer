/* eslint-disable no-unused-vars */
import React from "react";
import './TypingTestPage.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRef } from "react";

function TypingTestPage({username,email,socket,room,setIsJoined}) {
    const navigate = useNavigate();
    
    const redirectLoadProfilePage = () => {
        navigate("/profile");
    }

    const [words, setWords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [allProgress, setAllProgress] = useState([]);
    const [speed, setSpeed] = useState(0);
    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [bool, setBool] = useState(false);
    const [input, setInput] = useState();
    const inputRef = useRef(null);
    
    socket.on("updateProgress", (allProgress) => {
        setAllProgress(allProgress);
    });

    socket.on("updateParticipants",participants => {
        console.log("participants:",participants);
    });

    const handleProgress = async () => {
        if(words && index <= words.length){
            var progress = Math.round((index / (words.length-1)) * 100);
            setProgress(progress);
            socket.emit("progressUpdate",room,username,progress,speed);
        }
    }

    useEffect(() => {
        var wpm = Math.round(((index /(timer+1)) * 60));
        setSpeed(wpm);
    }, [index,timer]);

    if(!words){
        axios.get("http://localhost:4000/api/words")
        .then((response) => {
            let words = response.data.data.content.split(" ");
            setWords(words);
            setLoading(false);
        }).catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
    // Check if all words are typed
        if (words && index === words.length) {
            setFinished(true);
        }
    }, [index,words]);

    useEffect(() => {
        if(finished){
            clearInterval(intervalId);
            setTimeout(()=>{alert("YOU WON");setIsJoined(false)},1000);
        }
    }, [intervalId,finished]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        if (!started) {
            var intervalId = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
            setIntervalId(intervalId);
            setStarted(true);
        }
        // Check if the input matches the current word
        if (value === words[index]) {
            // Increment the index and the score
            setIndex((index) => index + 1);
            handleProgress();
            setInput("");
        }
    };

    return (
        <div className="typingTestPage">
            <div className="headingContainer">
                <h1>Online Type Racer</h1>
                <h1>Race room:{room}</h1>
            </div>
            {words && (
                <div className="TypingArea">
                <div className="words">
                  {words.map((word, i) => (
                    <span
                      key={i}
                      className={
                        i < index
                          ? "correct"
                          : i === index
                          ? input === word
                            ? "correct"
                            : "current"
                          : ""
                      }
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={handleChange}
                  ref={inputRef}
                  disabled={finished}
                />
                <div className="stats">
                  <p>WPM: {(index === 0) ?0:speed}</p>
                </div>
              </div>
            )
            }
            {(<div className="progress-bar">
                {allProgress.map((item,i) => {
                    return (<div className="container">
                        <div className="progresscontainer" key={i}>
                            <div className="progress" style={{width: `${item.progress}%`, minWidth: '60px'}}>{item.wpm} WPM</div>
                        </div>
                        <p style={{fontWeight:800}}>{item.username}</p>
                    </div>);
                })}
                </div>
                )
            }
            <button className="back-btn" style={{width:'100px'}} onClick={() => {setIsJoined(false)}}>
            Back
            </button>
        </div>

    );
}
export default TypingTestPage;




