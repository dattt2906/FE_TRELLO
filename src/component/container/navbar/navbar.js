import Box from '@mui/material/Box';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BoltIcon from '@mui/icons-material/Bolt';
import BoardName from './boardname';
import Button from '@mui/material/Button';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ImageAvatars from './avatarNav';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

const Navbar=()=>{
    const [isCheckedBoard, setIsCheckedBoard]= useState(false)

    const handleCheckedBoard=()=>{

        setIsCheckedBoard(!isCheckedBoard)

    }
    return(
        <>
   
            <Box sx={{height:"80px", display:"flex", alignItems:"center",backgroundColor:"#b5b6f3", justifyContent:"space-between"}}>


            <Box sx={{display:"flex",marginLeft:"20px", gap:2, alignItems:"center"}}>
            <BoardName/>
           
            
            <StarIcon onClick={handleCheckedBoard} sx={{color: isCheckedBoard ? "yellow": "gray", cursor:"pointer"}}/>
            
            <PeopleOutlineIcon/>
            </Box>
            <Box sx={{marginRight:"40px", gap:2,display:"flex", alignItems:"center"}}>
          
                <ImageAvatars/>
                
            <RocketLaunchIcon/>
            <BoltIcon/>
           
                
            </Box>
            
            </Box>

        </>
    )
}
export default Navbar;