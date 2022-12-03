import {useState, createContext, useContext} from "react";

const AlertContext = createContext();

export const AlertContextProvider = ({children})=>{
   
    const [alert,setAlert]= useState({
        open:false,
        type:'',
        message:''
    });
    // const [open, setOpen] = useState(false);
    // const [type, setType] = useState('');
    // const [message, setMessage] = useState('');



    const values = {
        alert,
        setAlert
    }

    return (<AlertContext.Provider value={values}>{children}</AlertContext.Provider>)

}

export const useAlert = ()=>useContext(AlertContext);
