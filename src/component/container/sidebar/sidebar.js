import "./sidebar.css"
import 'font-awesome/css/font-awesome.min.css';
import { Box, Button } from "@mui/material";
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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import JoyButton from '@mui/joy/Button';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation } from "react-router-dom";
import Api from "../../../api";
import { useToken } from "../../../tokenContext";
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
    const [boards, setBoards] = useState([])


    const [openModal, setOpenModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [email, setEmail] = useState("")
    const userId = params.get('userId')
    const [recentboards, setRecentBoards] = useState([])
    const location = useLocation()
    const [isShowSucessSendMail, setIsShowSucessSendMail] = useState(false)
    const [isShowSFailSendMail, setIsShowFailSendMail] = useState(false)
    const[token,setToken]= useState(useToken().token)


    const handleOpenModal = () => {


        setOpenModal(true);


    }
    const handleClose = () => {
        setAnchorEl(null);


    };
    const handleShowMember = () => {

        const newUrl = `/Member/?userId=${userId}&workspaceId=${workspaceId}`;
        nav(newUrl)

    }
    const handleCloseModal = () => { setOpenModal(false);setIsShowFailSendMail(false); setIsShowSucessSendMail(false); handleClose() }

    const nav = useNavigate()


    const handleInviteLink = () => {


        Api(token).post("http://localhost:3001/auth/invite-member", { email, workspaceId }).then(res => {
            if (res.data) {
                setIsShowSucessSendMail(true)
                setIsShowFailSendMail(false)
            }
        }).catch(error => {

            setIsShowFailSendMail(true)
            setIsShowSucessSendMail(false)
        })



    }


    useEffect(() => {


        Api(token).get(`http://localhost:3001/workspace/find-workspace-by-id/${workspaceId}`).then(res => {

            if (res.data) {
                setWorkspacename(res.data.workspacename)
                setBoards(res.data.boards)
                // setUserId(res.data.user.userId)
            }

        })



    }, [location])

    const changeBoard = async (boardId) => {
        await Api(token).get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res => {
            if (res.data) {
                setRecentBoards(res.data.recentBoards)

                const recentboardExits = res.data.recentBoards.some(recentboard => recentboard.boardId === boardId)
                if (!recentboardExits) {

                    Api(token).post("http://localhost:3001/recentboard/create-recent-board", { userId, boardId })
                }

            }
        })
        const newUrl = `/Page/?userId=${userId}&workspaceId=${workspaceId}&boardId=${boardId}`;
        nav(newUrl)

    }
    const handleDisplayWorkspace = (workspaceId) => {

        const newUrl = `/WorkspaceArea/?userId=${userId}&workspaceId=${workspaceId}`;
        nav(newUrl)


    }


    function renderRow(props) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} component="div" disablePadding>

                <ListItemButton sx={{ display: "flex", gap: 0.7 }}>
                    <img style={{ height: "20px", width: "20px" }} src={boards[index].boardbackground}></img>
                    <ListItemText primary={`${boards[index].boardname}`} onClick={() => changeBoard(boards[index].boardId)} />

                </ListItemButton>


            </ListItem>
        );
    }

    return (
        <>
            <Box sx={{ width: "250px", backgroundColor: "hsla(260,80%,94.1%,0.9)", display: "flex", flexDirection: "column", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif" }}>
                <Box sx={{ cursor: "pointer", marginLeft: "20px", display: "flex", alignItems: "center", width: "230px", height: "80px", fontSize: "25px", color: "black", fontWeight: "bold" }}>

                    {workspacename}

                </Box>
                <hr style={{ width: '100%', marginTop: "1px" }} />
                <Box sx={{ height: "calc(100% - 80px)" }}>
                    <Box onClick={() => handleDisplayWorkspace(workspaceId)} sx={{ marginTop: "30px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center", cursor: "pointer" }}>

                        <DashboardIcon />
                        <span style={{ fontSize: "15px" }}>Bảng</span>
                    </Box>
                    <Box sx={{ marginTop: "30px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box onClick={handleShowMember} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <PersonIcon />
                            <span style={{ fontSize: "15px", cursor: "pointer" }}>Thành viên</span>
                        </Box>
                        <Box sx={{ paddingRight: "10px" }}>
                            <AddIcon onClick={handleOpenModal} sx={{ cursor: "pointer" }} />

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
                                        <span>Thêm thành viên vào dự án</span>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>

                                            <Textarea onChange={(e) => setEmail(e.target.value)} sx={{ width: "600px" }} placeholder="Địa chỉ email" />
                                            <JoyButton onClick={handleInviteLink}>Gửi link mời</JoyButton>
                                        </Box>
                                    </Box>
                                    {isShowSucessSendMail ?
                                        <Box sx={{ marginTop: "20px" }}>
                                            <Stack sx={{ width: '50%' }} spacing={2}>
                                                <Alert variant="outlined" severity="success">
                                                    Đã gửi link mời thành công
                                                </Alert>
                                            </Stack>
                                        </Box>
                                        :
                                        null


                                    }
                                    {isShowSFailSendMail ?

                                        <Box sx={{ marginTop: "20px" }}>
                                            <Stack sx={{ width: '50%' }} spacing={2}>
                                                <Alert variant="outlined" severity="error">
                                                    Tài khoản người dùng không tồn tại
                                                </Alert>
                                            </Stack>
                                        </Box>
                                        :
                                        null
                                    }

                                </Typography>

                            </Box>
                        </Modal>




                    </Box>
                    <Box sx={{ marginTop: "30px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center", fontWeight: "bold" }}>

                        <InfoIcon />
                        <span style={{ fontSize: "15px", cursor: "pointer" }}>Thông tin dự án</span>
                    </Box>
                    <Box sx={{ marginTop: "40px", marginLeft: "10px", gap: 2, display: "flex", alignItems: "center", fontWeight: "bold" }}>

                        <Box>
                            <span style={{ fontSize: "15px" }}>Bảng của bạn</span>

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