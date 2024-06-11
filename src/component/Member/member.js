import Header from "../header/header"
import Sidebar from "../container/sidebar/sidebar"

import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import axios from "axios";
import Board from "../userworkspace/board";
import { useToken } from "../../tokenContext";
import Api from "../../api";


const Member = () => {
    const [workspacename, setWorkspacename] = useState()
    const queryString = window.location.search
    const [users, setUsers]= useState([])

    const params = new URLSearchParams(queryString);
    const workspaceId = params.get('workspaceId');
    const userId= params.get("userId")
    const [token, setToken]= useState(useToken().token)
    
    useEffect(() => {

        Api(token).get(`http://localhost:3001/workspace/find-workspace-by-id/${workspaceId}`).then(res => {

            if (res.data) {
                setWorkspacename(res.data.workspacename)
                // setBoards(res.data.boards)
                setUsers(res.data.users)

            //     const userExists = res.data.users.some(user => user.userId === userId);

            //     if (!userExists) {
            //         // Nếu userId không tồn tại, thêm user vào workspace
            //         axios.post("http://localhost:3001/workspace/add-user-in-workspace", { workspaceId, userId })
            //             .then(res => {
            //                 console.log("User added:", res.data);
            //             })
            //             .catch(error => {
            //                 console.error("Error adding user:", error);
            //             });
            //     }

            }
        })



    }, [])


    return (
        <>
            <Box sx={{ height: "100vh" }}>
                <Header />

                <Box sx={{ display: "flex" }}>

                    <Sidebar />

                    <Box sx={{ height: "calc(100vh - 70px)", width: "calc(100% - 250px)", backgroundColor: "white", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                        <Box sx={{ fontSize: "30px", textAlign: "center", marginTop: "20px" }}>


                        Thành viên trong dự án {workspacename}
                        </Box>

                        <Box sx={{ fontSize: "30px", marginTop: "70px ", marginLeft: "80px" }}>

                        Thành viên


                        </Box>
                        <Box sx={{width:"calc(100% - 100px)", height:"fit-content",  marginLeft:"50px", marginRight:"50px",display:"flex",flexDirection:" row", gap:1, flexDirection:"column", flexWrap:"wrap",marginTop:"20px", marginLeft:"35px"}}>

                        {users && users.length > 0 && users.map((user) => (

                           <Box sx={{marginLeft:"100px", marginTop:"20px", display:"flex", marginBottom:"20px"}}>
                           
                            <Box>
                                
                            <img style={{height:"50px", width:"50px", borderRadius:"50%"}} src={user.userInfors.avatarImg}></img>
                            </Box>
                            <Box sx={{flex:1, marginLeft:"10px"}}>
                                <Box sx={{display:"flex", flexDirection:"column"}}>
                            <span style={{fontWeight:"bold", fontSize:"20px"}}>{user.userInfors.display_name}</span>
                            <span  style={{ fontSize:"20px"}}>{user.email}</span>
                            </Box>
                            </Box>
                            </Box>
                          
                           
                       
                   ))}

                        </Box>



                    </Box>
                </Box>

            </Box>





        </>

    )




}
export default Member




