import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Board=(props)=>{
    const{board}= props
    const nav= useNavigate()
    const handleClick=async ()=>{
       localStorage.setItem("WorkspaceId", board.workspace)
       localStorage.setItem("boardId", board.boardId)
       await axios.get(`http://localhost:3001/board/find-board-by-id/${board.boardId}`).then(res=>{

            if(res.data){
                localStorage.setItem("WorkspaceId", res.data.workspace.workspaceId)
                localStorage.setItem("boardId", board.boardId)
            }

        })

       nav("/home")
    }
    return(

        <>
        <Box onClick={handleClick} sx={{height:"100px", width:"200px", backgroundColor:"aliceblue", cursor:"pointer", backgroundImage:"url('anh-ho.jpg')"}}>
           
            {board.boardname}
            
        </Box>
        </>
    )
}
export default Board;