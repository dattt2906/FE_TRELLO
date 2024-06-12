import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Api from '../../../api';
import { useToken } from '../../../tokenContext';

export default function Recents() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const userId=params.get("userId")
    const [recentboards, setRecentBoards]= useState([])
    const location=useLocation()
    const nav= useNavigate()
    const [token,setToken]= useState(useToken().token)

    useEffect(()=>{
 
    
        Api(token).get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res=>{
          if(res.data){
            setRecentBoards(res.data.recentBoards)
          }
        })
      
      

    },[location])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeBoardInRecent=(workspaceId, boardId)=>{
    handleClose()
    const newUrl = `/Page/?userId=${userId}&workspaceId=${workspaceId}&boardId=${boardId}`;
    nav(newUrl)
    
  }

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:"black", fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize:"17px"}}
      >
        Gần đây
        <KeyboardArrowDownIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
         {recentboards && recentboards.length > 0 && recentboards.map((recentboard,index) => (
         <MenuItem sx={{width:"300px"}} onClick={()=>handleChangeBoardInRecent(recentboard.workspaceId, recentboard.boardId)}>
        
            <Box sx={{display:"flex" ,gap:1}}>
           
            <Box>
            <img style={{height:"40px", width:"60px"}} src={recentboard.recentBoardBackGround}></img>
            
            </Box>
            <Box sx={{flex:1}}>
              <Box sx={{display:"flex",flexDirection:"column"}}>
              <span style={{fontWeight:"bold",fontSize:"17px"}}>{recentboard.recentBoardName}</span>
              <span style={{fontSize:"11px"}}>{recentboard.workspaceName}</span>
            
            </Box>
            </Box>
            </Box>
         
         
         </MenuItem>
      ))}
      
      </Menu>
      </Box>
  );
}