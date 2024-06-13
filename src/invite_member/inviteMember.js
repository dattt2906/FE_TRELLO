
import { useNavigate } from "react-router-dom";
import Api from "../api";
import { useEffect, useState } from "react";
import { useToken } from "../tokenContext";

const InviteMember=()=>{

    const navigate = useNavigate()
    const [userId, setUserId]= useState(null)
    const [workspaceId, setWorkspaceId]= useState(null)
    const inviteMember_token = window.location.search;
    const token = inviteMember_token.replace("?", "");
    const {setToken}= useToken()

    useEffect(() => {
       localStorage.setItem("Token_User", JSON.stringify(token))
       setToken(token)
       

    }, [token])
    useEffect(() => {
        if (userId && workspaceId) {
            navigate(`/WorkspaceArea/?userId=${userId}&workspaceId=${workspaceId}`);
        }
    }, [userId, workspaceId, navigate]);

    useEffect(()=>{
        Api(token).post("http://localhost:3001/auth/decodeToken", { token }).then(res => {
            if (res.data) {
                console.log("data,", res.data)
                setUserId(res.data.sub)
                setWorkspaceId(res.data.workspaceId)
               
            }
        })


    },[])
        
        return(

            <>
                null
            </>
        )
}
export default InviteMember