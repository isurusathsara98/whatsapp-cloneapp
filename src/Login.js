import React from 'react';
import { Button } from "@material-ui/core";
import {auth, provider} from "./firebase";
import"./Login.css";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
function Login() {

    const[{}, dispatch] = useStateValue();
    

    const signIn = (e)=>{
        auth.signInWithPopup(provider).then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user:result.user,
            })
        })
        .catch((error)=>alert(error.message));
    };
    return (
        <div className="login">
           <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png" alt=""/>
             <div className="login__text">
                 <h1>SignIn To Whatsapp</h1>
             </div>

             <Button onClick={signIn}>
                 SignIn with Google
             </Button>


           </div>
        </div>
    )
}

export default Login
