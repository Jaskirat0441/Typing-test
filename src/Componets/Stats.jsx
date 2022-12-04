import React,{useEffect}from 'react'
import Graph from './Graph'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAlert } from '../Context/AlertContext';
import { auth, db } from '../firebaseConfig';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


const Stats = ({wpm,accuracy,graphData, correctChars,incorrectChars,extraChars,missedChars,resetTest}) => {
    const [user] = useAuthState(auth);
    const {setAlert}= useAlert();
    var timeSet = new Set();
    
    const newGraph = graphData.filter((i)=>{
        if(!timeSet.has(i[0])){
          timeSet.add(i[0]);
          return i;
        }
      });
    // push to db
    const pushResultToDB = async()=>{
        const resultsRef = db.collection('Results');
        const{uid}= auth.currentUser;

        if(!isNaN(accuracy)){
            await resultsRef.add({
                userId:uid,
                wpn:wpm,
                accuracy:accuracy,
                characters:`${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
                timeStamp:new Date()
            }).then((res)=>{
                setAlert({
                    open:true,
                    type:'success',
                    message:'result save to db'
                });
            })
        }
        else{
            setAlert({
                open:true,
                type:'error',
                message:'invalid test'
            });
        }
    }
    // console.log(graphData);
    useEffect(() => {
        if(user){
            pushResultToDB();
        }
        else{
            setAlert({
                open:true,
                type:'warning',
                message:'login to save results!'
            });
        }
    }, []);
    

  return (
    <div className="stats-box">
        <div className="left-stats">
            <div className="stats">

            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}%</div>
            <div className="title">Characters</div>
            <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
            </div>
            <RestartAltIcon onclick={resetTest} className='reset-btn'/>
        </div>
        <div className="right-stats">
            <Graph graphData={newGraph} />
        </div>
    </div>
  )
}

export default Stats