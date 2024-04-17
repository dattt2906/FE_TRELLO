import { Link } from "react-router-dom";
import "./forgotPass.css"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { data } from "../data";



const ForgotPass = () => {
    const [password, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("")
    const [updateSuccess, setUpdateSucess] = useState("")

    const forget_token = window.location.search;
    const token = forget_token.replace("?", "");
    const [userId, setUserId] = useState(null)
    useEffect(() => {

        axios.post("http://localhost:3001/auth/decodeToken", { token }).then(res => {
            if (res.data) {
                setUserId(res.data.sub)
            }
        })

    }, [])



    const handleResetPass = async () => {
        if (password && retypePassword && password === retypePassword) {
            axios.put(`http://localhost:3001/auth/update-user-password/${userId}`, { password }).then(res => {
                if (res.data) {
                    setUpdateSucess("Cap nhat thanh cong. Vui long quay lai trang chu de dang nhap voi mat khau moi")
                    setError("")
                }

            }).catch(error => {
                setError(error.response.data.message)
                setUpdateSucess("")
            })
        }
        else {

            setError("mat khau nhap lai phai trung voi mat khau moi")
            setUpdateSucess("")
        }
    }
    return (
        <>
            <div className="Forgot-pass">
                <h1 className="header-forgot">Retype-Passwork</h1>
                <div className="new-password">New Password<input className="new-pass" type="password" name="username" onChange={(e) => setNewPassword(e.target.value)}></input></div>
                <div className="retype-password">Retype Password<input className="retype" type="password" name="password" onChange={(e) => setRetypePassword(e.target.value)}></input> </div>

                <div className="btn-Regis">
                    <button className="btn-regis" onClick={handleResetPass}>Save</button>
                    <Link to={"/"}>
                        <button className="btn-back-login">Back Login</button>
                    </Link>
                </div>
                {error ?
                    <div>
                        {error}
                    </div> : null

                }
                {updateSuccess ?
                    <div style={{ color: "red" }}>
                        {updateSuccess}
                    </div> : null

                }

            </div>
        </>
    )
}
export default ForgotPass;