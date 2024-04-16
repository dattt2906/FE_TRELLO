import { Link} from "react-router-dom";
import "./forgotPass.css"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";



const ForgotPass=async ()=>{
    
    const forget_token=window.location.search;
    console.log(forget_token)
        
    await axios.post("http://localhost:3001/auth/decodeToken",{forget_token}).then(res=>{

        if(res.data){
           
        }
    })
    
        
           
        

    
    return(
        <>
         <div className="Forgot-pass">
    <h1 className="header-forgot">Retype-Passwork</h1>
    <div className="new-password">New Password<input className="new-pass" type="text" name="username" ></input></div>
    <div className="retype-password">Retype Password<input className="retype" type="password" name="password" ></input> </div>
   
    <div className="btn-Regis">
    <button className="btn-regis">Save</button>
    <Link to={"/"}>
     <button className="btn-back-login">Back Login</button>
     </Link>
     </div>
    
     </div>
        </>
    )
}
export default ForgotPass;