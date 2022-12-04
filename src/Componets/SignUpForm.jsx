import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import { auth,db } from '../firebaseConfig';
// import errorMapping from '../Utils/errorMessages';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';
import errorMapping from '../Utilis/errorMessage';

const SignUpForm = ({handleClose}) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {setAlert} = useAlert();
    const {theme} = useTheme();

    const checkUsernameAvailability =async ()=>{
        const ref= db.collection('usernames').doc(`${username}`);
        const res = await ref.get();
        return !res.exist;
    }

    const handleSubmit = async ()=>{
        if(!email || !password || !confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Please enter all details'
            });
            return;
        }

        if(password!==confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Password Mismatch'
            });
            return;
        }

        if(await checkUsernameAvailability){
            auth.createUserWithEmailAndPassword(email,password).then(async(res)=>{


            const ref = await db.collection('usernames').doc(`${username}`).set({
                uid: res.user.uid
            }).then((response)=>{
                setAlert({
                    open: true,
                    type: 'success',
                    message: 'Account created'
                });
                handleClose();
            }); 
           
        }).catch((err)=>{
            setAlert({
                open: true,
                type: 'error',
                message: errorMapping[err.code] || "Some error occured"
            });
        });
    }
    else{
        setAlert({
            open: true,
            type: 'warning',
            message: 'Username already exist'
        });
    }

    }

  return (
    <Box
        p={3}
        style={{
            display:'flex',
            flexDirection:'column',
            gap:'20px',
            backgroundColor:'transparent',
            padding:10
        }}    
    >
        <TextField
            variant='outlined'
            type='text'
            label='Enter Username'
            onChange={(e)=>setUsername(e.target.value)}
            InputLabelProps={
                {
                    style:{
                        color: theme.title
                    }
                }
            }
            InputProps={{
                style:{
                    color: theme.title
                }
            }}
        >
            </TextField>
        
        <TextField
            variant='outlined'
            type='email'
            label='Enter email'
            onChange={(e)=>setEmail(e.target.value)}
            InputLabelProps={
                {
                    style:{
                        color: theme.title
                    }
                }
            }
            InputProps={{
                style:{
                    color: theme.title
                }
            }}
        >
        
        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Enter password'
            onChange={(e)=>setPassword(e.target.value)}
            InputLabelProps={
                {
                    style:{
                        color: theme.title
                    }
                }
            }
            InputProps={{
                style:{
                    color: theme.title
                }
            }}>

        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Confirm password'
            onChange={(e)=>setConfirmPassword(e.target.value)}
            InputLabelProps={
                {
                    style:{
                        color: theme.title
                    }
                }
            }
            InputProps={{
                style:{
                    color: theme.title
                }
            }}>
        
        </TextField>
        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:theme.title, color: theme.background}}
        onClick={handleSubmit}>
            Signup
        </Button>
    </Box>
  )
}

export default SignUpForm