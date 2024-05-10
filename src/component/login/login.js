import { useState } from "react"
import * as React from 'react';

import axios from "axios"

import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";




const preventDefault = (event)=> event.preventDefault();
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handelLogin = () => {
        axios.post("http://localhost:3001/auth/login", { email, password }).then(res => {
            if (res.data && res.data.Active == 1) {
               
                localStorage.setItem("Token_User", JSON.stringify(res.data.access_token));
                // localStorage.setItem("UserId", JSON.stringify(res.data.id));
                navigate(`Home/Users/?userId=${res.data.id}`)
            }


        }).catch(error => {

            setError(error.response.data.message);

        }
        )
    }


    return (
        <>
            {/* <div className="login-content"> */}
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif" }}>
                
                <Box sx={{ marginTop: "50px", display: "flex", alignItems: "center", gap: 2 }}>
                    <img src="trelloicon.png" style={{ width: "50px", height: "50px" }}></img>
                    <span style={{ fontSize: "25px", fontFamily: "var(--font-family-text,'Charlie Text',sans-serif)" }}>Trello</span>
                </Box>
                <Box sx={{ marginTop: "40px" }}>
                    <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif", fontWeight: "bold", fontSize: "20px" }}>Log in to continue</span>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '400px' },
                        display: "flex", flexDirection: "column", gap: 2, marginTop: "30px"
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField type="text" id="outlined-basic" label="Email" variant="outlined"onChange={(e) => setEmail(e.target.value)} />
                    <TextField type="password"id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
                </Box>

                {/* <div className="btn"> */}
                <Box sx={{ width: "fit-content", marginTop: "20px" }}>
                   
                    <Button sx={{ width: "400px" }} variant="contained" onClick={handelLogin}>Sign in</Button>


                </Box>
                <Box
                    sx={{
                        width:"400px", display:"flex" ,justifyContent:"space-between", marginTop:"15px"
                    }}
                    >
                    <Link to={"/Input-email"}>Forget password?</Link>
                    <Link to={"/register"}>Create an account</Link>
                    
                </Box>
                {/* </div> */}
                {error ?
                    <div>
                        {error}
                    </div> : null

                }
            </Box>
           
            

            {/* </div> */}


        </>
    )

}


export default Login;