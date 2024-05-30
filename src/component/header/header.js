import { useEffect, useState } from "react"

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
import Create from "./menus/create";
import Button from '@mui/material/Button';
import Logo from "./menus/logo";
import { useSocket } from "../../socket/socketProvider";


import AppsIcon from '@mui/icons-material/Apps';
import Teamplates from "./menus/teamplate";
const Header = () => {
    const [displayName, setDisplayName] = useState("");
    const [isShowModalNoti, setIsShowModalNoti]= useState(false)
    const [socket, setSocket]= useState(null)
    const [countRead, setCountRead]= useState(0)
 
  
    const newSocket= useSocket()
    // console.log("socket in header:", newSocket)
    useEffect(()=>{

        
        if(newSocket){
        setSocket(newSocket) 

        }

    },[])

    useEffect(()=>{
        
        socket?.on("message-add-column", (data) => {
            console.log("data header:", data)
         setCountRead(countRead+1)
        }
        )
    },[socket])

    const clear = () => {

        localStorage.clear();
    }
    const showSetting=()=>{

        var content = document.querySelector(".modal-settings");
        if (content) {
            content.style.display = "block";
        }
    }
    const handleShowModalNoti=()=>{

        setIsShowModalNoti(!isShowModalNoti)
    }

    return (
    
    
    <>
    <Box sx={{height:"70px", display:"flex", justifyContent:"space-between", backgroundColor:"#F7B0F5"}}>
        <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", height:"70px",gap:2,marginLeft:"20px"}}>
        <AppsIcon/>
        

        <Logo />
        <Workspaces/>
        <Recents/>
        
        <Create/>
        
        
        </Box>
        <Box sx={{display:"flex", alignItems:"center", gap:2, marginRight:"20px"}}>

        <Search/>
        <Box sx={{display:"flex"}}>
        <NotificationsIcon onClick={handleShowModalNoti} sx={{cursor:"pointer", position:"relative"}}>
          
        </NotificationsIcon>
        <Box sx={{zIndex:1,width:"15px", height:"15px",marginLeft:"-10px",marginTop:"5px", borderRadius:"50%", backgroundColor:"#E50F1E",display:"flex", justifyContent:"center"}}>
               <span style={{fontSize:"10px", color:"white"}}> {countRead}</span>
            </Box>
            </Box>
        <HelpOutlineIcon/>
        <ImageAvatars/>
        {isShowModalNoti ?
        <Box sx={{position:"absolute",marginTop:"770px",marginLeft:"80px",backgroundColor:"white", height:"700px", width:"400px",zIndex:1, display:"flex", flexDirection:"column"}}>
                
                <span style={{fontSize:"15px", fontWeight:"bold", paddingLeft:"20px", paddingTop:"20px"}}>
                Thông báo
                </span>

                
                
            </Box>
            :
            null
            }
        
    </Box>
            
    </Box>
    
    
    </>
       
    )
}
export default Header