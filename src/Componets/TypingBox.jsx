import React, { useState, createRef, useEffect, useRef, useMemo } from "react";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";
import UpperMenu from "./UpperMenu";

var randomWords = require("random-words");

const TypingBox = () => {

   const { testTime,testMode,testWords } = useTestMode();
    const [currWordIndex, setcurrWordIndex] = useState(0);
    const [currCharIndex, setcurrCharIndex] = useState(0);
    const [countDown, setcountDown] = useState(()=>{
      if(testMode=='words'){
        return 180;
      }
      else{
        return testTime;
      }
    });
    const [testStart, settestStart] = useState(false);
    const [testOver, settestOver] = useState(false);
    const [correctChars, setcorrectChars] = useState(0);
    const [correctWords, setcorrectWords] = useState(0);
    const [incorrectChars, setincorrectChars] = useState(0);
    const [extraChars, setextraChars] = useState(0);
    const [missedChars, setmissedChars] = useState(0);
    const [graphData, setgraphData] = useState([])
    const inputTextRef = useRef(null);
    
    const [intervalId, setintervalId] = useState(null);
    const [wordsArray, setwordsArray] = useState(() => {
      if(testMode === 'words'){
        return randomWords(testWords);
      }
      return randomWords(100);

    });
    
  const words = useMemo(() => {
    return wordsArray;
  }, [wordsArray]);



  const wordSpanRef = useMemo(() => {
    return Array(words.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [words]);

  const resetWordSpanRefClassNames = ()=>{
    wordSpanRef.map(i=>{
        Array.from(i.current.childNodes).map(j=>{
            j.className = 'char';
        })
    });
    wordSpanRef[0].current.childNodes[0].className = 'char current';
}

  // console.log(words);

  // const wordSpanRef =



  // timer
  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);

    setintervalId(intervalId);

    function timer() {
      setcountDown((prevCountDown) => {
        setcorrectChars((correctChars)=>{
          setgraphData((data)=>{

              const startTime = (testMode==='words')?180:testTime;
              return [...data,[startTime-prevCountDown,Math.round((correctChars/5)/((startTime-prevCountDown+1)/60))]];
          });
          return correctChars;
      });
        


        if (prevCountDown === 1) {
          clearInterval(intervalId);
          setcountDown(0);
          settestOver(true);
        } 
        else {
          return prevCountDown - 1;
        }
      });
    }
  };
  // console.log(graphData)

  const handleKeyDown = (e) => {
    if (!testStart) {
      startTimer();
      settestStart(true);
    }
    // startTimer();
    let allChidrenSpans = wordSpanRef[currWordIndex].current.childNodes;
    // console.log(allChidrenSpans);

    //  logic spaces

    if (e.keyCode === 32) {

      
      const correctChar = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');
      const incorrectChar = wordSpanRef[currWordIndex].current.querySelectorAll('.incorrect');
      setmissedChars(missedChars + (allChidrenSpans.length-(incorrectChar.length+correctChar.length)));

      if(correctChar.length === allChidrenSpans.length){
        setcorrectWords(correctWords+1);
      }
      // const incorrectChar = wordSpanRef[currWordIndex].current.querySelectorAll('.incorrect');

      if (allChidrenSpans.length <= currCharIndex) {
        allChidrenSpans[currCharIndex - 1].classList.remove("right");
      }
       else {
        allChidrenSpans[currCharIndex].className = allChidrenSpans[
          currCharIndex
        ].className.replace("current", "");
      }

      // cursor to next word
      wordSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "char current";

      setcurrWordIndex(currWordIndex + 1);

      setcurrCharIndex(0);

      return;
    }

    // backspace

    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (currCharIndex === allChidrenSpans.length) {
          if (allChidrenSpans[currCharIndex - 1].className.includes("extra")) {
            allChidrenSpans[currCharIndex - 1].remove();
            allChidrenSpans[currCharIndex - 2].className += " right";
          } else {
            allChidrenSpans[currCharIndex - 1].className = " char current";
          }
          setcurrCharIndex(currCharIndex - 1);
          return;
        }
        allChidrenSpans[currCharIndex].className = "char";
        allChidrenSpans[currCharIndex - 1].className = "char current";
        setcurrCharIndex(currCharIndex - 1);
      } 
      return;
    }

    if (currCharIndex === allChidrenSpans.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;

      newSpan.className = "char incorrect right extra";
      allChidrenSpans[currCharIndex - 1].className = allChidrenSpans[
        currCharIndex - 1
      ].className.replace("right", "");

      wordSpanRef[currWordIndex].current.append(newSpan);
      setcurrCharIndex(currCharIndex + 1);
      setextraChars(extraChars+1);
      return;
    }
    //    characters incor and corr
    if (e.key === allChidrenSpans[currCharIndex].innerText) {
      allChidrenSpans[currCharIndex].className = "char correct";
      setcorrectChars(correctChars+1);
    } else {
      allChidrenSpans[currCharIndex].className = "char incorrect";
      setincorrectChars(incorrectChars+1);

    }

    if(currCharIndex+1 === allChidrenSpans.length){
      allChidrenSpans[currCharIndex].className+=' right';
  }
  else{
      allChidrenSpans[currCharIndex+1].className = 'char current';
  }
  
  setcurrCharIndex(currCharIndex+1);
    // console.log("key press", e.key);
  };

  // calculation
const calculateWPM =()=>{
   return Math.round((correctChars/5)/(testTime/60))
}

const calculateAccuracy =() =>{
  return Math.round((correctWords/currWordIndex)*100);
}

  const resetTest = () => {
      setcurrCharIndex(0);
      setcurrWordIndex(0);
      settestOver(false);
      settestStart(false);
      clearInterval(intervalId);
      setcountDown(testTime);
      if(testMode==="words"){

        let random = randomWords(testWords);
        setwordsArray(random);
        setcountDown(180);
      }
      else{
        let random = randomWords(100);
        setwordsArray(random);
      }
      resetWordSpanRefClassNames();
    };
    
    const focusInput = () => {
        inputTextRef.current.focus();
    };

    useEffect(()=>{
      resetTest();
  },[testTime,testMode,testWords])

  useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = 'char current';
  }, []);

  return (
    <div>
       {/* <h1>{countDown}</h1>  */}
       {testOver ? ( 
         <Stats wpm={calculateWPM()} accuracy={calculateAccuracy()} graphData={graphData} correctChars={correctChars} incorrectChars={incorrectChars} extraChars={extraChars} missedChars={missedChars}/>
         ) : (
          <>
          <UpperMenu countDown={countDown} />
           <div className="type-box" onClick={focusInput}>
           <div className="words">
             {/* words and chars */}
             {words.map((word, index) => (
               <span className="word" key={index} ref={wordSpanRef[index]}>
                 {word.split("").map((char, i) => (
                   <span className="char" key={`char${i}`}>
                   {char}
                  </span>
                  ))}
            </span>
              ))}
            </div>
          </div>
     </>
     )
     }

      {/*  */}
       <input
        type="text"
        className="hidden-input"
        ref={inputTextRef}
        onKeyDown={((e) => handleKeyDown(e))}
      /> 
      
    </div>
  );
};

export default TypingBox;
