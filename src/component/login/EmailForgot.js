
import axios from "axios";
import "./EmailForgot.css"
import { Link } from "react-router-dom";
import { useState } from "react";
const EmailForgot=()=>{
    const [username, setUserName]= useState("")

    const forgotPassword=async ()=>{
       
      await axios.post("http://localhost:3001/auth/forget-pass", {username}).then(res=>{
                if(res.data){
                    console.log("send email successfully")
                }
        })


    }

    return(
        <>
        <div className="forgot-password">Forgot Password
        <div className="input-email"><input placeholder="Enter Email" onChange={(e)=>setUserName(e.target.value)}></input></div>
        <div className="btn-confirm">

           <div className="confirm"><button onClick={forgotPassword}>Confirm</button></div>

           <Link to={"/"}>
            <div className="back-login"><button >Back</button></div>
            </Link>
        </div>
        </div>
        
        </>
    )
}
export default EmailForgot;