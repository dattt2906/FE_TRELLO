import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import Board from "./board"

const Workspace = (props) => {
    const { workspace } = props
    const Boards = workspace.boards
    const [boards, setBoards] = useState(Boards)

    useEffect(() => {

        setBoards(Boards) //moi khi cards duoc thay doi thi luu cards moi vao vi neu chi thay doi ben column thi cards se khong the biet su thay doi do
        console.log(Boards)

    }, [Boards])

    return (

        <>
            <Box>
                <Box sx={{marginLeft:"50px"}}>
                {workspace.workspacename}
                </Box>

                <Box sx={{display:"flex" ,gap:3, marginTop:"20px", flexWrap:"wrap"}}>

                    {boards && boards.length > 0 && boards.map((board) => (
                           
                            <Board
                            key={board.boardId}
                            board={board}

                            />
                            
                        
                    ))}
                     

                       


                </Box>


            </Box>
        </>
    )
}
export default Workspace