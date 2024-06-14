import { Box } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';


const Comment=(props)=>{
    const {comment, TimeDisplay,handelDelComment}= props
    const [isShowModalConfirmDeleteComment, setIsShowModalConfirmDeleteComment]= useState(false)
    
    const showModalCofirmDelete=(title)=>{
   
        return(
      
          <>
          <Box sx={{height:"130px", width:"350px",display:"flex",position:"absolute", flexDirection:"column", backgroundColor:"white",fontSize:"15px", marginLeft:"80px", marginTop:"30px", zIndex:1,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif', borderRadius:"10px"}}>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <span style={{paddingLeft:"90px"}}>Bạn muốn xóa {title}?</span>
            <ClearIcon sx={{marginRight:"10px"}} onClick={(e)=>setIsShowModalConfirmDeleteComment(false)}/>

            </Box>
      
            <span style={{marginTop:"20px", fontSize:"13px", marginLeft:"5px"}}>{title} sẽ bị xóa vĩnh viễn và bạn không thể hoàn tác</span>
            <Box sx={{display:"flex", justifyContent:"center"}}>
            <Button sx={{ ":hover":{backgroundColor:"var(--ds-background-danger-bold-hovered,#ae2a19)"},backgroundColor:"var(--ds-background-danger-bold,#ca3521)", color:"white", fontSize:"13px", fontWeight:"500",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',width:"300px", marginTop:"20px"}} onClick={(e)=> handelDelComment(comment.commentId)}>Xóa {title}</Button>
      
            </Box>
      
      
          </Box>
          
          </>
        )
      
        }
      
        return(

            <>
              <Box sx={{ marginTop: "15px", marginBottom: "25px", display: "flex", gap: 2 }}>
                          <Box>

                            <img style={{ height: "40px", width: "40px", borderRadius: "50%" }} src={comment.user.userInfors.avatarImg}></img>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, marginBottom: "10px" }}>
                                <span style={{ fontSize: "15px", fontWeight: "bold", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif" }}>{comment.user.userInfors.display_name}</span>
                                <span style={{ fontSize: "15px", fontWeight: "400", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif" }}>{TimeDisplay(comment.createdAt)}</span>
                              </Box>
                              <Box sx={{ borderRadius: "10px" }}>
                                <Textarea sx={{ fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif" }} value={comment.contentComment}></Textarea>
                              </Box>
                              <Box>
                                <Box sx={{ display: "flex", gap: 2, marginTop: "10px" }}>
                                <span style={{ fontSize: "13px", color: "var(--ds-text, #172b4d)", textDecoration: "underline", cursor: "pointer", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif" }}> Chỉnh sửa</span>
                                  <span style={{ fontSize: "13px", color: "var(--ds-text, #172b4d)", textDecoration: "underline", cursor: "pointer", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif", position:"relative" }} onClick={ (e)=>setIsShowModalConfirmDeleteComment(true)}> Xóa</span>
                                  {isShowModalConfirmDeleteComment ?


                                    showModalCofirmDelete("Bình luận")
                                    :
                                    null


                                                                              
                                  
                                  }
                                  
                                </Box>
                              </Box>
                            </Box>

                          </Box>


                        </Box>
            
            </>
        )

}
export default Comment;