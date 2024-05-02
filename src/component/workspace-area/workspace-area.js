import Header from "../header/header"
import Sidebar from "../container/sidebar/sidebar"

import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import axios from "axios";
import Board from "../userworkspace/board";


const WorkspaceArea = () => {
    const [workspacename, setWorkspacename] = useState()
    const [boards, setBoards] = useState([])
    const queryString = window.location.search

    const params = new URLSearchParams(queryString);
    const workspaceId = params.get('workspaceId');
    useEffect(() => {

        axios.get(`http://localhost:3001/workspace/find-workspace-by-id/${workspaceId}`).then(res => {

            if (res.data) {
                setWorkspacename(res.data.workspacename)
                setBoards(res.data.boards)

            }

        })



    }, [])




    return (
        <>
            <Box sx={{ height: "100vh" }}>
                <Header />

                <Box sx={{ display: "flex" }}>

                    <Sidebar />

                    <Box sx={{ height: "calc(100vh - 70px)", width: "calc(100% - 250px)", backgroundColor: "aliceblue", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                        <Box sx={{ fontSize: "30px", textAlign: "center", marginTop: "20px" }}>


                            {workspacename}
                        </Box>

                        <Box sx={{ fontSize: "30px", marginTop: "70px ", marginLeft: "80px" }}>

                            Boards


                        </Box>
                        <Box sx={{width:"calc(100% - 100px)", height:"fit-content", backgroundColor:"gray",  marginLeft:"50px", marginRight:"50px",display:"flex",flexDirection:" row", gap:1, flexDirection:"row", flexWrap:"wrap",marginTop:"20px", marginLeft:"35px"}}>
                        {boards && boards.length > 0 && boards.map((board) => (
                           
                           <Board
                           key={board.boardId}
                           board={board}

                           />
                           
                       
                   ))}

                        </Box>



                    </Box>
                </Box>

            </Box>





        </>

    )




}
export default WorkspaceArea