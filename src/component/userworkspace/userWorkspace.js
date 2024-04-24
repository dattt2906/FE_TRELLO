import { useEffect, useState } from "react";
import Header from "../header/header";
import { Box } from "@mui/material";
import axios from "axios";
import Workspace from "./workspace";

const UserWorkspace = () => {
    const [workspaces, setWorkspaces] = useState([])
    // const [boards, setBoards] = useState([])
    const userId = Number(localStorage.getItem("UserId"))

    useEffect(() => {
        axios.get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res => {

            if (res.data) {
                console.log("workspace:", res.data.workspaces)
                setWorkspaces(res.data.workspaces)
            }
        })

    }, [])

    return (
        <>
            <Header />

            <Box sx={{ display: "flex", marginTop: "50px" }}>

                <Box sx={{ width: "400px", display: "flex", height: "fit-content", backgroundColor: "aliceblue", marginLeft: "200px" }}>
                    <Box sx={{ fontSize: "24px", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif", marginTop: "20px", marginLeft: "20px", width: "100%" }}>

                        Workspaces
                        <Box sx={{ marginTop: "50px", display: "flex", flexDirection: "column", gap: 5 }}>
                            {workspaces && workspaces.length > 0 && workspaces.map((workspace) => (

                                <Box sx={{ width: "100%", height: "50px", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif" }}>
                                    {workspace.workspacename}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                </Box>
                <Box sx={{ flex: 1,width:"calc(100% - 600px)", height: "fit-content", backgroundColor: "violet", marginRight: "180px" }}>


                    <Box sx={{ fontSize: "24px", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif", marginTop: "20px", marginLeft: "20px", marginBottom:"20px", marginRight:"20px"}}>

                        Your workspaces
                        <Box sx={{ marginTop: "50px", display: "flex", flexDirection: "column", gap: 5 }}>
                        {workspaces && workspaces.length > 0 && workspaces.map((workspace) => (

                            // <Box sx={{ width: "100%", height: "fit-content", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif"}}>
                            //     {workspace.workspacename} 
                            //     <Box sx={{marginTop:"10px", display:"flex", gap:2}}>
                            //     <Box sx={{height:"100px", width:"200px",backgroundColor:"aliceblue", }}>


                            //     </Box>
                            //     <Box sx={{height:"100px", width:"200px",backgroundColor:"aliceblue", }}>


                            //     </Box>
                            //     <Box sx={{height:"100px", width:"200px",backgroundColor:"aliceblue", }}>


                            //     </Box>
                            //     <Box sx={{height:"100px", width:"200px",backgroundColor:"aliceblue", }}>


                            //     </Box>
                            //     </Box>
                            // </Box>
                            <Workspace
                            key={workspace.id}
                            workspace={workspace}
                            
                            />
                        ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

        </>
    )
}
export default UserWorkspace;