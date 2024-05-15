import React,{ useEffect, useState } from "react";
import Header from "../header/header";
import { Box } from "@mui/material";
import axios from "axios";
import Workspace from "./workspace";
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Textarea from '@mui/joy/Textarea';
import JoyButton from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Typography from '@mui/material/Typography';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UserWorkspace = () => {
    const [workspaces, setWorkspaces] = useState([])
    // const [boards, setBoards] = useState([])
    // const userId = Number(localStorage.getItem("UserId"))
    const queryString = window.location.search;
    const [workspacename,setWorkspacename]= useState("")
    const [workspaceDetail, setWorkspaceDetail]= useState("")
    const nav= useNavigate()
    const [openModal, setOpenModal] = React.useState(false);
    const handleClose = () => {
        setAnchorEl(null);


    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handelCreateWorkspace=()=>{
        axios.post("http://localhost:3001/workspace/create-workspace", { workspacename, userId ,workspaceDetail}).then(res => {
            if (res.data) {
                // let newBoardId = res.data.boardId; // Đây là giá trị mới bạn muốn thay thế
                const newUrl=`/Home/Users/?userId=${userId}`
                
                nav(newUrl)
                window.location.reload()
                
                

            }
        }).catch(error => {
            console.log("create workspace failed")
        })


    }
    const handleOpenModal = () => {
        
        
        setOpenModal(true);
       
       
    }
    const handleCloseModal = () =>{ setOpenModal(false);handleClose() }


    const params = new URLSearchParams(queryString);
    const userId = params.get('userId');

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
            <Box sx={{ overflowY: "unset" }}>
                <Header />

                <Box sx={{ display: "flex", marginTop: "50px", justifyContent: "center" }}>

                    <Box sx={{ overflow: "auto", width: "100%", height: "700px", marginRight: "300px", marginLeft: "300px" }}>


                        <Box sx={{ fontSize: "24px", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif", marginTop: "20px", marginLeft: "20px", marginBottom: "20px", marginRight: "20px" }}>

                            Your workspaces
                            <Box sx={{ marginTop: "50px", display: "flex", flexDirection: "column", gap: 5 }}>
                                <Box   onClick={handleOpenModal} sx={{ height: "100px", width: "270px", cursor: "pointer", backgroundColor: "gray", marginTop: "20px", marginLeft: "50px", marginBottom: "20px", display: "flex", alignItems: "center" }}>

                                    <span style={{ color: "white", paddingLeft: "20px" }}> Create new workspace </span>

                                </Box>

                                <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="Box">
                                <Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <span style={{ textAlign: "center", width: "100%" }}>Create workspace</span>
                                    </Box>
                                    <Box sx={{width:"70%", marginTop:"40px", display:"flex", flexDirection:"column", gap:5}}>

                                        <FormControl>
                                            <FormLabel>WorkspaceName</FormLabel>
                                            <Input placeholder="workspacename" onChange={(e)=> setWorkspacename(e.target.value)} />

                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>WorkspaceDetail</FormLabel>
                                            {/* <Input sx={{height:"200px"}} onChange={(e)=> setWorkspaceDetail(e.target.value)}/> */}
                                            <Textarea sx={{height:"200px"}} onChange={(e)=> setWorkspaceDetail(e.target.value)}></Textarea>
                                        </FormControl>

                                    </Box>
                                    <Box sx={{marginTop:"20px"}}>
                                    <JoyButton type='submit' sx={{ width: "270px" }} onClick={handelCreateWorkspace}>Create</JoyButton>

                                    </Box>

                                </Box>
                            </Typography>

                        </Box>
                    </Modal>
                                {workspaces && workspaces.length > 0 && workspaces.map((workspace) => (


                                    <Workspace
                                        key={workspace.id}
                                        workspace={workspace}

                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </>
    )
}
export default UserWorkspace;