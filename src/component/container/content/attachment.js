import { Box } from "@mui/material";
import axios from "axios";
import { Await } from "react-router-dom";


const Attachment = (props) => {
    const { fileAttachment ,handleDelFileAttachment, TimeDisplay} = props
  
    
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
                    <span onClick={()=>handleDelFileAttachment(fileAttachment)}style={{fontSize:"15px", color:"var(--ds-text, #172b4d)", textDecoration:"underline",cursor:"pointer"}}> Xóa</span>
                    </Box>


                </Box>
                
              </Box>
           </>
    )
}
export default Attachment;