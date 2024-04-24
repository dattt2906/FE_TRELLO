import { useState } from "react"

import axios from "axios";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Workspaces from "./menus/workspace";
import Recents from "./menus/recent";
import Starred from "./menus/starred";
import Search from "./menus/search";
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ImageAvatars from "./menus/avartar";


import AppsIcon from '@mui/icons-material/Apps';
import Teamplates from "./menus/teamplate";
const Header = () => {
    const [displayName, setDisplayName] = useState("");
    const userId = Number(localStorage.getItem("UserId"))
    const workspaceId= Number(localStorage.getItem("WorkspaceId"))
    const boardId= Number(localStorage.getItem("boardId"))



    // axios.get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res => {
    //     if (res.data) {
    //         setDisplayName(res.data.username)

    //     }


    // })
    const clear = () => {

        localStorage.clear();
    }
    const showSetting=()=>{

        var content = document.querySelector(".modal-settings");
        if (content) {
            content.style.display = "block";
        }
    }

    return (
    
    
    <>
    <Box sx={{height:"70px", display:"flex", justifyContent:"space-between"}}>
        <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", height:"70px",gap:2,marginLeft:"20px"}}>
        <AppsIcon/>
        <Box sx={{display:"flex", alignItems:"center", gap:2, height:"70px"}}>
        <img style={{width:"30px", height:"30px"}}src="trelloicon.png"></img>
        <span style={{ fontSize:"30px", fontWeight:'bold', fontFamily:""}}>Trello</span>
        </Box>
        <Workspaces/>
        <Recents/>
        <Starred/>
        <Teamplates/>
        
        </Box>
        <Box sx={{display:"flex", alignItems:"center", gap:2, marginRight:"20px"}}>

        <Search/>
        <NotificationsIcon/>
        <HelpOutlineIcon/>
        <ImageAvatars/>



        </Box>
       

        
    



    </Box>
    
    </>
        // <div className="header">
        //     <div className="icon-left">
        //         <h1><i className="fa fa-trello"></i>Trello</h1>
        //         <div>Workspaces <i class="fa fa-chevron-down"></i></div>
        //         <div>Recent <i class="fa fa-chevron-down"></i></div>
        //         <div>Starred <i class="fa fa-chevron-down"></i></div>
        //         <div>Create<i class="fa fa-chevron-down"></i></div>
        //     </div>

        //     <div className="icon-right">
        //         <div className="block-input"><input type="text" className="input-search" placeholder="Search"></input></div>
        //         <div className="icon-bell"><i className="fa fa-bell"></i></div>
        //         <div className="icon-question"><i className="fa fa-question"></i></div>
        //         <div className="icon-user-display"><i className="fa fa-user"></i></div>

        //         <div className="display_name"> {displayName}</div>
        //         <div className="image-avatar"><img src="logo192.png" onClick={showSetting}/></div>
        //         <div className="modal-settings">
        //             <ul className="list-setting">
        //                 <Link to={"/User-Info"}>
        //                 <li>Edit info</li>
        //                 </Link>
        //                 <Link to={"/"}>
        //                 <li onClick={clear}> 
        //                    Logout

                      
        //                 </li>
        //                 </Link>

        //             </ul>
        //         </div>



        //     </div>
        // </div>
    )
}
export default Header