import { Link } from "react-router-dom";
import "./register.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register=()=>{

    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [error, setError]= useState("")
    const navigate= useNavigate()

    const handleRegis=()=>{
        axios.get(`http://localhost:3001/users/find-user-by-name/${username}`,{username}).then(res=>{
        if(res.data){
        setError("Ten dang nhap da co nguoi su dung")
            
        }
        else{
            const display_name=username
            axios.post("http://localhost:3001/users/create-user",{username, password,display_name}).then(res=>{
                if(res.data){
                    console.log(res)
                        navigate("/")
                }
    
                })
            
        }
    })

    }



    return(
    <>
    <div className="register-content">
    <h1 className="header-regis">Trello Register</h1>
    <div className="userName-input-regis">UserName <input className="user" type="text" name="username" onChange={(e)=>setUsername(e.target.value)}/></div>
    <div className="password-input-regis"> Password <input className="pass" type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/></div>

    <div className="btn-Regis">
    <button className="btn-regis" onClick={handleRegis}>Register</button>
    <Link to={"/"}>
     <button className="btn-back-login">Back Login</button>
     </Link>
     </div>
     
     {error ? 
     <div>
     {error}
     </div>:null
     
     }
    </div>
    
   
    
    </>
    )
    
}


export default Register;