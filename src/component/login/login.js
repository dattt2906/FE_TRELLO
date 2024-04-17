import { useState } from "react"
import "./login.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handelLogin = () => {
        axios.post("http://localhost:3001/auth/login", { username, password }).then(res => {
            if (res.data && res.data.Active == 1) {
                localStorage.setItem("Token_User", JSON.stringify(res.data.access_token));
                localStorage.setItem("UserId", JSON.stringify(res.data.id));
                navigate("Home")
            }


        }).catch(error => {

            setError(error.response.data.message);

        }
        )
    }


    return (
        <>
            <div className="login-content">
                <h1 className="header-login">Trello Login</h1>
                <div className="userName-input">UserName <input className="user" type="text" name="username" onChange={(e) => setUsername(e.target.value)}></input></div>
                <div className="password-input"> Password <input className="pass" type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input> </div>
                <Link to={"/input-email"}>
                    <div style={{ marginTop: "15px" }}><a href="">Forgot password?</a></div>
                </Link>

                <div className="btn">
                    <button className="btn-login" onClick={handelLogin}>Login</button>
                    <Link to={"/register"}>
                        <button className="btn-register">Register</button>
                    </Link>
                </div>
                {error ?
                    <div>
                        {error}
                    </div> : null

                }
            </div>


        </>
    )

}


export default Login;