import { Box } from "@mui/material";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

const Board = (props) => {
    const { board } = props
    const nav = useNavigate()
    const handleClick = async () => {

        await axios.get(`http://localhost:3001/board/find-board-by-id/${board.boardId}`).then(res => {

            if (res.data) {
                const url = `/Page/?userId=${res.data.workspace.user.userId}&workspaceId=${res.data.workspace.workspaceId}&boardId=${board.boardId}`;

                // Chuyển hướng đến URL mới
                nav(url)
            }

        })

        
    }
    return (

        <>  
     
            <Box onClick={handleClick} sx={{height: "100px", width:"270px", backgroundColor: "aliceblue", backgroundImage:`url(${board.boardbackground})`,backgroundSize: "cover",cursor: "pointer", marginTop:"20px", marginLeft:"50px", marginBottom:"20px", borderRadius:"10px"}}>

               <span style={{fontWeight:"bold",color:"white", paddingLeft:"10px"}}> {board.boardname} </span>

            </Box>
           </>
    )
}
export default Board;