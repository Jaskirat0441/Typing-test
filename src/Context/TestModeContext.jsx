import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({children})=>{

    const [testTime, setTestTime] = useState(15);
    //time or words
    const [testMode, settestMode] = useState('time'); 
    const [testWords, setTestWords] = useState(10);

    const values = {
        testTime,
        setTestTime,
        testMode,
        settestMode,
        testWords,
        setTestWords

    }

    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>);
}

export const useTestMode = () => useContext(TestModeContext);

