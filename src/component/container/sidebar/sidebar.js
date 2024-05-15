import "./sidebar.css"
import 'font-awesome/css/font-awesome.min.css';
import { Box } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import TableRowsIcon from '@mui/icons-material/TableRows';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import InfoIcon from '@mui/icons-material/Info';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import JoyButton from '@mui/joy/Button';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 150,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const Sidebar = () => {
    // const workspaceId=localStorage.getItem("WorkspaceId")
    const queryString = window.location.search;
    
    const params = new URLSearchParams(queryString);
    const workspaceId = params.get('workspaceId');
    const [workspacename, setWorkspacename] = useState()
    const [boards, setBoards]= useState([])
    const [userId, setUserId]= useState(null)
    const [openModal, setOpenModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleOpenModal = () => {
        
        
        setOpenModal(true);
       
       
    }
    const handleClose = () => {
        setAnchorEl(null);


    };
    const handleCloseModal = () =>{ setOpenModal(false);handleClose() }

    const nav= useNavigate()
   

    useEffect(() => {

        axios.get(`http://localhost:3001/workspace/find-workspace-by-id/${workspaceId}`).then(res => {

            if (res.data) {
                setWorkspacename(res.data.workspacename)
                setBoards(res.data.boards)
                setUserId(res.data.users[0].userId)
            }

        })



    }, [])
    const changeBoard=(boardId)=>{

        const newUrl = `/Page/?userId=${userId}&workspaceId=${workspaceId}&boardId=${boardId}`;
        nav(newUrl)
        window.location.reload()
        
    }
    const handleDisplayWorkspace=(workspaceId)=>{

        const newUrl = `/WorkspaceArea/?userId=${userId}&workspaceId=${workspaceId}`;
        nav(newUrl)
        window.location.reload()
        
    }


    function renderRow(props) {
        const { index ,style} = props;

        return (
            <ListItem  style={style} key={index} component="div" disablePadding>
                
                <ListItemButton>
               
                    <ListItemText primary={`${boards[index].boardname}`} onClick={()=>changeBoard(boards[index].boardId)}/>
            
                </ListItemButton>

               
            </ListItem>
        );
    }

    return (
        <>
            <Box sx={{width: "250px", backgroundColor: "hsla(260,80%,94.1%,0.9)", display: "flex", flexDirection: "column", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif" }}>
                <Box sx={{ marginLeft: "20px", display: "flex", alignItems: "center", width: "230px", height: "80px", fontSize: "30px" }}>

                    {workspacename}
                </Box>
                <Box sx={{height:"calc(100% - 80px)"}}>
                <Box onClick={()=>handleDisplayWorkspace(workspaceId)} sx={{ marginTop: "30px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center", cursor:"pointer"}}>

                    <DashboardIcon />
                    <span style={{ fontSize: "15px" }}>Boards</span>
                </Box>
                <Box sx={{ marginTop: "30px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center", justifyContent:"space-between" }}>
                    <Box sx={{display: "flex", alignItems: "center",gap: 2}}>
                    <PersonIcon />
                    <span style={{ fontSize: "15px" }}>Members</span>
                    </Box>
                    <Box sx={{paddingRight:"10px"}}>
                    <AddIcon onClick={handleOpenModal} sx={{cursor:"pointer"}}/>

                    </Box>


                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="Box">
                                <Box >
                                    <span>Invite to Workspace</span>

                                    <Textarea sx={{marginTop:"20px"}}placeholder="Email address"/>

                                </Box>
                            </Typography>

                        </Box>
                    </Modal>




                </Box>
                <Box sx={{ marginTop: "30px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center", fontWeight: "bold" }}>

                    <InfoIcon />
                    <span style={{ fontSize: "15px" }}>Workspace Detail</span>
                </Box>
                <Box sx={{ marginTop: "40px", marginLeft: "10px", gap: 2, display: "flex", alignItems: "center", fontWeight: "bold" }}>


                    <span style={{ fontSize: "15px" }}>Workspace views</span>
                </Box>
                <Box sx={{ marginTop: "40px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center", fontStyle: "italic" }}>
                    <TableRowsIcon />

                    <span style={{ fontSize: "15px" }}>Table</span>
                </Box>
                <Box sx={{ marginTop: "40px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center", fontStyle: "italic" }}>
                    <CalendarMonthIcon />

                    <span style={{ fontSize: "15px" }}>Calendar</span>
                </Box>
                <Box sx={{ marginTop: "40px", marginLeft: "10px", gap: 2, display: "flex", alignItems: "center", fontWeight: "bold" }}>

                    <Box>
                    <span style={{ fontSize: "15px" }}>Your boards</span>

                    <Box
                        sx={{
                            width: '100%',
                            height: "fit-content",

                        }}
                    >
                        <FixedSizeList
                            height={250}
                            width={240}
                            itemSize={46}
                            itemCount={boards.length}
                            
                        >
                            {renderRow}
                        </FixedSizeList>
                    </Box>
                    </Box>

    

            </Box>
            </Box>
          
                </Box>
 



        </>
    )
}
export default Sidebar;