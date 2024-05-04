import "./card.css"
import React, { useState, useEffect } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import JoyButton from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";
import { v4 } from 'uuid';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { imageDb } from "../../../firebase";
import EditIcon from '@mui/icons-material/Edit';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: "fit-content",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Card = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { card, cardDel } = props;
  const [isShowEditCard, setIsShowEditCard] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [showAddImage, setShowAddImage] = useState(false)
  const [rowDetail, setRowDetail] = useState([])
  const [img, setImg] = useState(null)
  const [imageCard, setImageCard] = useState("")

  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: card.rowId,
      data: { ...card }
    })
  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform), //css.translate thi khi keo tha se giu nguyen kich thuoc trong khi dang keo ma khong gap loi hien thi
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #3498db" : undefined,
    opacity: card?.FE_PlaceholderCard ? "0" : "1",
    height: card?.FE_PlaceholderCard ? "0px" : "unset"


  };
  const handleCloseModal = () => { setOpenModal(false); handleClose() }

  const [changeContentCard, setChangeContentCard] = useState(card.content);
  useEffect(() => {
    if (changeContentCard) {
      card.content = changeContentCard;
      // console.log("card:", card)
    }
  }, [changeContentCard])
  useEffect(() => {
    if (img) {
      handleUpload();
    }
  }, [img]);
  const handleUpload = () => {

    const imageRef = ref(imageDb, `images/${v4()}`)
    uploadBytes(imageRef, img).then((snapshot) => {

      getDownloadURL(snapshot.ref).then((img) => {
        setImageCard(img)
      })
    })
  }
  const handleOpenModal = () => {

    axios.get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {
      if (res.data) {
        setRowDetail(res.data)
        console.log("data:", res.data)
      }
    })
    setOpenModal(true);


  }
  const cancelInput = () => {

    setShowAddImage(false)
    setAnchorEl(null);

  }
  const handleClose = () => {
    setAnchorEl(null);
    setShowAddImage(false)

  };

  return (
    <>
      <div className="card"
        ref={setNodeRef}
        style={dndKitCardStyles}
        {...attributes}
        {...listeners}
      >
        {/* <input className="change-content" value={card.content} onClick={handleOpenModal}></input> */}
        <Box sx={{width:"230px", minHeight:"48px",height:"fit-content",borderRadius:"10px", border:"none",fontSize:"20px", display:"flex", justifyContent:"center", flexDirection:"column", gap:2.5}} onClick={handleOpenModal}>
          {imageCard?
          <img style={{width:"280px", height:"300px", borderRadius:"20px"}} src={imageCard}></img>
          :
          null}
          <Box sx={{marginBottom:"10px", marginLeft:"10px"}}>
          {card.content}
          </Box>
          
          </Box>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="Box">
              <Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                  <CreditCardIcon />
                  <span>{rowDetail.content}</span>
                </Box>
                <Box>
                  <span>In list</span>
                </Box>
                <Box sx={{ width: "70%", marginTop: "40px", display: "flex", flexDirection: "column", gap: 5 }}>

                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    {showAddImage === true ?
                      <Box sx={{ position: "absolute", marginTop: "30px", zIndex: 1, marginLeft: "500px" }}>

                        <input type='file' onChange={(e) => { setImg(e.target.files[0]) }} style={{ display: "none" }} />
                        {/* <button onClick={() => { document.querySelector('input[type="file"]').click(); }}>Upload</button> */}
                        <Button onClick={() => { document.querySelector('input[type="file"]').click(); }}> <AddPhotoAlternateIcon /></Button>


                      </Box>
                      :
                      <Box></Box>
                    }

                    <Input sx={{ height: "100px" }} value={rowDetail.description} onClick={() => setShowAddImage(true)}></Input>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                      <Button sx={{ width: "20px", marginTop: "10px" }} variant="contained" disableElevation>
                        Save
                      </Button>
                      <Button onClick={cancelInput} sx={{ width: "20px", marginTop: "10px", backgroundColor: "gray" }} variant="contained" disableElevation>
                        Cancel
                      </Button>
                    </Box>

                  </FormControl>

                  <Box>

                    <span>Attachment</span>

                  </Box>
                  {imageCard ?

                    <img style={{ width: "250px", height: "200px" }} src={imageCard}></img>
                    :
                    null
                  }

                  <FormControl>
                    <FormLabel>Activity</FormLabel>
                    <Input sx={{ height: "100px" }} />
                    <Button sx={{ width: "20px", marginTop: "10px" }} variant="contained" disableElevation>
                      Save
                    </Button>
                  </FormControl>

                </Box>


              </Box>
            </Typography>

          </Box>
        </Modal>
        <i class="fa fa-pencil icon-edit-card" onClick={() => setIsShowEditCard(true)}></i>
      </div>

      {!isShowEditCard === false ?
        <div className="conntent-edit-card">
          <button className="icon-delete" onClick={() => cardDel(card)}> Delete</button>
          <button className="icon-save" onClick={(e) => setChangeContentCard(e.target.value)}>Save</button>
          <i className="fa fa-times icon-cancel-edit" onClick={() => setIsShowEditCard(false)}></i>

        </div>
        :
        <div></div>
      }
    </>

  )

}
export default Card;