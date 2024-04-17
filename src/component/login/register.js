import { Link } from "react-router-dom";
import "./register.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [verifiEmail, setVerifiEmail] = useState("")
    const navigate = useNavigate()

    const handleRegis = async () => {
        await axios.post("http://localhost:3001/auth/regis", { username, password }).then(res => {
            if (res.data.regis_token) {
                // axios.post("http://localhost:3001/mailer/send-email")
                setVerifiEmail("Dang Ki thanh cong. Vui long kiem tra mail de xac nhan")
                setError("")

            }
        }).catch(error => {
            console.log(error)
            setError(error.response.data.message)
            setVerifiEmail("")

        })

    }



    return (
        <>
            <div className="register-content">
                <h1 className="header-regis">Trello Register</h1>
                <div className="userName-input-regis">UserName <input className="user" type="text" name="username" onChange={(e) => setUsername(e.target.value)} /></div>
                <div className="password-input-regis"> Password <input className="pass" type="password" name="password" onChange={(e) => setPassword(e.target.value)} /></div>

                <div className="btn-Regis">
                    <button className="btn-regis" onClick={handleRegis}>Register</button>
                    <Link to={"/"}>
                        <button className="btn-back-login">Back Login</button>
                    </Link>
                </div>

                {error ?
                    <div>
                        {error}
                    </div> : null

                }

                {verifiEmail ?
                    <div style={{ color: "red" }}>
                        {verifiEmail}
                    </div> : null

                }
            </div>



        </>
    )

}


export default Register;