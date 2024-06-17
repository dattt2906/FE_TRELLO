import { Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Await } from "react-router-dom";

import Textarea from '@mui/joy/Textarea';

import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';


const Attachment = (props) => {
    const { fileAttachment ,handleDelFileAttachment, TimeDisplay} = props
    const delAttachment=()=>{

        handleDelFileAttachment(fileAttachment)
        setIsShowModalDeleteConfirmAttachment(false)
    }

    const [isShowModalDeleteConfirmAttachment, setIsShowModalDeleteConfirmAttachment] = useState(false)
    const showModalCofirmDelete=(title)=>{
   
        return(
      
          <>
          <Box sx={{height:"fit-content", width:"fit-content",display:"flex",position:"absolute", flexDirection:"column", backgroundColor:"white",fontSize:"15px", marginLeft:"80px", marginTop:"30px", zIndex:1,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif', borderRadius:"10px", zIndex:1}}>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <span style={{paddingLeft:"20%"}}>Bạn muốn xóa {title}?</span>
            <ClearIcon sx={{marginRight:"10px"}} onClick={(e)=>setIsShowModalDeleteConfirmAttachment(false)}/>

            </Box>
      
            <span style={{marginTop:"20px", fontSize:"13px", marginLeft:"5px"}}>{title} sẽ bị xóa vĩnh viễn và bạn không thể hoàn tác</span>
            <Box sx={{display:"flex", justifyContent:"center"}}>
            <Button sx={{ ":hover":{backgroundColor:"var(--ds-background-danger-bold-hovered,#ae2a19)"},backgroundColor:"var(--ds-background-danger-bold,#ca3521)", color:"white", fontSize:"13px", fontWeight:"500",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',width:"300px", marginTop:"20px", marginBottom:"20px"}} onClick={ delAttachment}>Xóa {title}</Button>
      
            </Box>
      
      
          </Box>
          
          </>
        )
      
        }
    
   return (

        <>  
     
            <Box sx={{display:"flex"}}>
                <Box>

                <img src={fileAttachment.imageFile} style={{height:"100px", width:"200px"}}></img>

                </Box>


                <Box sx={{flex:1, marginLeft:"10px"}}>
                    <Box sx={{marginTop:"-10px", padding:"0px"}}>

                        <span style={{fontSize:"15px", fontWeight:"bold", color:"var(--ds-text, #172b4d)", fontFamily:"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif"}}>{fileAttachment.filename}</span>

                        
                    </Box>
                    <Box sx={{display:"flex" ,gap:2, fontFamily:"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif"}}>
                    <span style={{fontSize:"15px", color:"var(--ds-text, #172b4d)", fontWeight:"400"}}>{TimeDisplay(fileAttachment.createdAt)}</span>
                    <span onClick={()=>setIsShowModalDeleteConfirmAttachment(true)}style={{fontSize:"15px", color:"var(--ds-text, #172b4d)", textDecoration:"underline",cursor:"pointer", position:"relative"}}> Xóa</span>
                    {
                        isShowModalDeleteConfirmAttachment ?

                        showModalCofirmDelete("Tệp đính kèm")
                        :
                        null
                    }
                    </Box>


                </Box>
                
              </Box>
           </>
    )
}
export default Attachment;