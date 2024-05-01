import "./sidebar.css"
import 'font-awesome/css/font-awesome.min.css';
import { Box } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import TableRowsIcon from '@mui/icons-material/TableRows';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useState } from "react";
import axios from "axios";

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useNavigate } from "react-router-dom";



const Sidebar = () => {
    // const workspaceId=localStorage.getItem("WorkspaceId")
    const queryString = window.location.search;
    
    const params = new URLSearchParams(queryString);
    const workspaceId = params.get('workspaceId');
    const [workspacename, setWorkspacename] = useState()
    const [boards, setBoards]= useState([])

    const nav= useNavigate()
   

    useEffect(() => {

        axios.get(`http://localhost:3001/workspace/find-workspace-by-id/${workspaceId}`).then(res => {

            if (res.data) {
                setWorkspacename(res.data.workspacename)
                setBoards(res.data.boards)
            }

        })



    }, [])
    const changeBoard=(boardId)=>{

        const newUrl = queryString.replace(/(boardId=)\d+/, '$1' + boardId);
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

            {/* <div className="sidebar">
                <div className="nameWorkSpace"></div>
                <div className="list-sidebar">
                    <div><i class="fa fa-bars board-icon" />Board</div>
                    <div><i class="fa fa-user user-icon" />Member <i className="fa fa-plus icon-add-member"></i></div>
                    <div><i class="fa fa-gear setting-icon" />Workspace settings <i class="fa fa-chevron-down icon-down-setting"></i></div>
                    <div>Workspace view</div>
                    <div><i class="fa fa-table table-icon"></i>Table</div>
                    <div><i class="fa fa-calendar calendar-icon"></i>Celedar</div>
                </div>


            </div> */}
            <Box sx={{width: "250px", backgroundColor: "hsla(260,80%,94.1%,0.9)", display: "flex", flexDirection: "column", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                <Box sx={{ marginLeft: "20px", display: "flex", alignItems: "center", width: "230px", height: "80px", fontSize: "30px" }}>

                    {workspacename}
                </Box>
                <Box sx={{height:"calc(100% - 80px)"}}>
                <Box sx={{ marginTop: "30px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center" }}>

                    <DashboardIcon />
                    <span style={{ fontSize: "15px" }}>Boards</span>
                </Box>
                <Box sx={{ marginTop: "30px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center" }}>

                    <PersonIcon />
                    <span style={{ fontSize: "15px" }}>Members</span>
                </Box>
                <Box sx={{ marginTop: "30px", marginLeft: "20px", gap: 2, display: "flex", alignItems: "center", fontWeight: "bold" }}>

                    <SettingsIcon />
                    <span style={{ fontSize: "15px" }}>Workspace settings</span>
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
                            height={150}
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