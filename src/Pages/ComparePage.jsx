import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom'
import Graph from '../Componets/Graph';
import { auth, db } from '../firebaseConfig';


const ComparePage = () => {

    const{username}= useParams();
    const [loggedInData, setloggedInData] = useState([]);
    const [loggedInGraphData, setloggedInGraphData] = useState([]);
     const [compareUserDAta, setcompareUserData] = useState([]);
     const [compareUserGraphData, setcompareUserGraphData] = useState([]);

    const getUid=async()=>{
        const ref = db.collection('usernames').doc(`${username}`);
        const response = await ref.get();
        return response.data().uid;
    }

    const getData = async() =>{
        const userUID = await getUid();
        const {uid} = auth.currentUser;
        const resultRef = db.collection('Results');
        let tempData = [];
        let tempGraphData = [];
        resultRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp,doc.data().wpm]);
                setloggedInData(tempData);
                setloggedInGraphData(tempGraphData);
            });
        });
          let tempData1 = [];
        let tempGraphData1 = [];
        resultRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                tempData1.push({...doc.data()});
                tempGraphData1.push([doc.data().timeStamp,doc.data().wpm]);
                setcompareUserData(tempData1);
                setcompareUserGraphData(tempGraphData1);
            });
        });
    }
    useEffect(() => {
      getData();
    }, [])
    
  return (
    <div>
        <Graph graphData={loggedInGraphData} type='data'></Graph>
        <Graph graphData={compareUserGraphData} type='data'></Graph>
    </div>
  )
}

export default ComparePage