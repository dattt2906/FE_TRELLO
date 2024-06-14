import "./card.css"
import React, { useState, useEffect, useRef } from 'react';
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
import Textarea from '@mui/joy/Textarea';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { display } from "@mui/system";
import { Socket } from "socket.io-client";
import Checkbox from '@mui/joy/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ClearIcon from '@mui/icons-material/Clear';
import Slider from '@mui/material/Slider';
import Todolist from "./todolist";
import Attachment from "./attachment";
import Api from "../../../api";
import { useToken } from "../../../tokenContext";
import moment from "moment"
import Comment from "./comment";

// import {Editor} from '@tinymce/tinymce-react'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: "fit-content",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  overflowX: "hidden",
  backgroundColor: "#F9EAEA"

};
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const Card = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { card, cardDel, socket, boardId } = props;
  // console.log(card)
  const [isShowEditCard, setIsShowEditCard] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [showAddImage, setShowAddImage] = useState(false)
  const [content, setContent] = useState("")
  const [img, setImg] = useState("")

  const [description, setDescription] = useState("")
  const [activity, setActivity] = useState("")
  const [attachment, setAttachment] = useState("")
  const [fileAttachments, setFileAttachments] = useState([])
  const [isShowDatePicker, setIsShowDatePicker] = useState(false)

  const [isShowDueDate, setIsShowDueDate] = useState(false)
  const [time, setTime] = useState("")
  const [Deadline, setDeadline] = useState(null)
  const [overdue, setOverdue] = useState(false)
  const [duesoon, setDuesoon] = useState(false)
  const [complete, setComplete] = useState(false)
  const [showTimeInCard, setShowTimeInCard] = useState(false)
  const [timeCard, setTimeCard] = useState("")
  const [comments, setComments] = useState([])
  const [contentComment, setContentComment] = useState("")
  // const [commentChange, setCommentChange]= useState(false)
  const [showModalAddCheckList, setShowModalAddCheckList] = useState(false)
  const [todoLists, setTodoLists] = useState([])
  const [todoListTitle, setTodoListTitle] = useState("")
  const [token, setToken] = useState(useToken().token)
  const [isChangeDescription, setIsChangeDescription] = useState(false)
  const [isChangeComment, setIsChangeComment]= useState(false)


  const TimeDisplay = (date) => {
    // Thời gian tạo của tập tin (sử dụng định dạng ISO 8601)
    const createdTime = moment(date);

    // Thời gian hiện tại
    const currentTime = moment();

    // Đặt thời gian về đầu ngày để so sánh chính xác theo ngày
    const createdTimeStartOfDay = createdTime.clone().startOf('day');
    const currentTimeStartOfDay = currentTime.clone().startOf('day');

    // Kiểm tra sự chênh lệch ngày
    const daysDifference = currentTimeStartOfDay.diff(createdTimeStartOfDay, 'days');
    console.log("day diff", daysDifference);

    // Trả về chuỗi thời gian trôi qua
    let timeElapsedString;
    if (daysDifference === 0) {
      timeElapsedString = createdTime.format('[Hôm nay lúc] HH:mm');
    } else if (daysDifference === 1) {
      timeElapsedString = createdTime.format('[Hôm qua lúc] HH:mm');
    } else {
      timeElapsedString = createdTime.format('DD [tháng] MM [năm] YYYY [lúc] HH:mm');
    }

    return (
      <span className="date past" title={createdTime.format('DD [tháng] MM [năm] YYYY [lúc] HH:mm')}>
        {timeElapsedString}
      </span>
    );
  };


  



  const queryString = window.location.search;

  const params = new URLSearchParams(queryString);
  const userId = (params.get('userId'));

  const editorRef = useRef()
  const handleDelFileAttachment = async (fileAttachment) => {
    const fileId = fileAttachment.fileId
    const filename = fileAttachment.filename
    await Api(token).delete(`http://localhost:3001/files/delete/${filename}`)
    await Api(token).delete(`http://localhost:3001/files/del-file-by-id/${fileId}`)
    updateAttachment()
  }





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


  const handleChangeDescription = (e) => {

    setDescription(e.target.value)
  }

  useEffect(() => {
   
    if ( description && description.trim().length == 0) {

      setIsChangeDescription(false)
    }
    else if(description &&description.trim().length > 0 ){

    setIsChangeDescription(true)
    }
    else{
      setIsChangeDescription(false)
    }


  }, [description])


  useEffect(() => {
    
    if (contentComment && contentComment.trim().length ==0 ) {

      setIsChangeComment(false)
    }
    else if(contentComment && contentComment.trim().length > 0){

      setIsChangeComment(true)
    }
    else{
      setIsChangeComment(false)
    }


  }, [contentComment])



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
      handleUploadImageCard();
    }
  }, [img]);

  const handleUploadImageCard = async () => {



    const formData = new FormData();
    formData.append("file", img)

    console.log("formData:", formData)

    await Api(token).post('http://localhost:3001/files/upload', formData).then(res => {
      if (res.data) {
        const filename = res.data.filename
        const imageFile = ("http://localhost:3001/api/images/" + res.data.filename)

        const rowId = card.rowId

        if (filename && imageFile && rowId) {

          Api(token).post("http://localhost:3001/files/create", { filename, imageFile, rowId }).then(res => {


            if (res.data) {
              updateAttachment()
            }
          })
        }

      }
    })
  }


  const updateAttachment = async () => {

    await Api(token).get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {

      setFileAttachments(res.data.files)

    })
  }


  const handleDelTodoList = async (todoListId) => {

    await Api(token).delete(`http://localhost:3001/todolist/del-todolist-by-id/${todoListId}`)

    await Api(token).get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {
      if (res.data) {
        setTodoLists(res.data.todoLists)
        updateTodoLists()
      }


    })
  }
  const handelDelComment = async (commentId) => {
    await Api(token).delete(`http://localhost:3001/comment/delete-comment/${commentId}`)

    updateComments()


  }


  const handleDelTodo = async (todoId) => {

    await Api(token).delete(`http://localhost:3001/todolist/del-todo-by-id/${todoId}`)

    await Api(token).get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {
      if (res.data) {
        updateTodoLists()
      }


    })
  }



  const handleAddTodoList = () => {
    if(todoListTitle && todoListTitle.trim().length > 0){
    setShowModalAddCheckList(false)
    const rowId = card.rowId

    Api(token).post("http://localhost:3001/todolist/create-todolist", { todoListTitle, rowId }).then(res => {

      if (res.data) {

        Api(token).get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {

          if (res.data) {
            setTodoLists(res.data.todoLists)
            updateTodoLists()
            setTodoListTitle("")
          }
        })
      }
    })
  }
  else{
    return null
  }

  }



  const updateComments = async () => {
    await Api(token).get(`http://localhost:3001/table/find-row-by-id/${card.rowId}`).then(res => {

      setComments(res.data.comments)

    })
  }


  const updateTodoLists = () => {
    Api(token).get(`http://localhost:3001/table/find-row-by-id/${card.rowId}`).then(res => {
      if (res.data.todoLists && res.data.todoLists.length > 0) {
        setTodoLists(res.data.todoLists)
      }
    })
  }


  useEffect(() => {
    Api(token).get(`http://localhost:3001/table/find-row-by-id/${card.rowId}`).then(res => {
      if (res.data.comments && res.data.comments.length > 0) {
        setComments(res.data.comments)
      }
    })
  }, [])

  useEffect(() => {

    socket?.on("message-add-deadline", (data) => {
      console.log(data)
      setDateSocket()
    }

    )
    socket?.on("message-add-comment", (data) => {
      console.log(data)
      updateComments()
    }

    )

  }, [socket])


  const setDateSocket = async () => {
    await Api(token).get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {
      if (res.data.deadline) {
        setFormDate(res.data.deadline)
        setDateTimeCard(res.data.deadline)
        setShowTimeInCard(true)
        setIsShowDueDate(true)

      }
    })

  }



  useEffect(() => {
    Api(token).get(`http://localhost:3001/table/find-row-by-id/${card.rowId}`).then(res => {
      if (res.data.todoLists && res.data.todoLists.length > 0) {
        setTodoLists(res.data.todoLists)
      }
    })

  }, [])

  const setFormDate = (date) => {
    {

      if (dayjs(date).month() - dayjs(Date()).month() === 0 && dayjs(date).date() - dayjs(Date()).date() === 0) {
        setTime(`Hôm nay lúc ${dayjs(date).hour()}:${dayjs(date).format("mm")} `)
        if (dayjs(date).hour() - dayjs(Date()).hour() > 0) {
          setDuesoon(true)
          setOverdue(false)
          // console.log("cùng ngày giờ đặt lớn hơn")
        }
        else if (dayjs(date).hour() - dayjs(Date()).hour() === 0 && dayjs(date).minute() - dayjs(Date()).minute() > 0) {
          setDuesoon(true)
          setOverdue(false)
          // console.log("cùng ngày cùng giờ  phút đặt lớn hơn")
        }
        else if (dayjs(date).hour() - dayjs(Date()).hour() === 0 && dayjs(date).minute() - dayjs(Date()).minute() < 0) {
          setOverdue(true)
          setDuesoon(false)
          // console.log("cùng ngày cùng giờ  phút đặt nhỏ hơn")
        }
        else if (dayjs(date).hour() - dayjs(Date()).hour() < 0) {
          setOverdue(true)
          setDuesoon(false)
          // console.log("cùng ngày giờ nhỏ hơn")
        }


      }
      else if (dayjs(date).month() - dayjs(Date()).month() === 0 && dayjs(date).date() - dayjs(Date()).date() === 1) {
        setOverdue(false)
        setDuesoon(false)
        setTime(`Ngày mai lúc ${dayjs(date).hour()}:${dayjs(date).format("mm")} `)
      }
      else if (dayjs(date).month() - dayjs(Date()).month() === 0 && dayjs(date).date() - dayjs(Date()).date() > 1) {
        setOverdue(false)
        setDuesoon(false)
        setTime(`${monthNames[dayjs(date).month()]} ${dayjs(date).date()} at ${dayjs(date).hour()}:${dayjs(date).format("mm")}`)
      }

      else if (dayjs(date).month() - dayjs(Date()).month() > 0) {
        setTime(`${monthNames[dayjs(date).month()]} ${dayjs(date).date()} at ${dayjs(date).hour()}:${dayjs(date).format("mm")}`)

      }
      else {

        setOverdue(true)
        setDuesoon(false)
        setTime(`${monthNames[dayjs(date).month()]} ${dayjs(date).date()} at ${dayjs(date).hour()}:${dayjs(date).format("mm")}`)

      }


    }
  }

  const setDateTimeCard = (date) => {
    setTimeCard(`${monthNames[dayjs(date).month()]} ${dayjs(date).date()}`)




  }


  const handleShowDatePicker = () => {
    setIsShowDatePicker(true)

  }
  const confirmDateCard = async () => {
    setIsShowDatePicker(false)
    setIsShowDueDate(true)
    setShowTimeInCard(true)
    const deadline = Deadline.$d


    await Api(token).put(`http://localhost:3001/table/update-deadline-by-rowId/${card.rowId}`, { deadline }).then(res => {
      if (res.data) {
        socket.emit("add-deadline", boardId)
      }
    })
    setFormDate(Deadline.$d)
    setDateTimeCard(Deadline.$d)

  }

  // useEffect(() => {
  //   if (attachment) {
  //     axios.put(`http://localhost:3001/table/update-rowDetail/${card.rowId}`, { description, attachment, activity }).then(res => {
  //       if (res.data) {
  //       }
  //     })
  //   }

  // }, [attachment])


  useEffect(() => {
    Api(token).get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {
      if (res.data) {
        setContent(res.data.content)
        setDescription(res.data.description)
        setActivity(res.data.activity)
        setFileAttachments(res.data.files)
        // setAttachment(res.data.attachment)
        if (res.data.deadline) {
          setShowTimeInCard(true)
          setIsShowDueDate(true)
          setFormDate(res.data.deadline)
          setDateTimeCard(res.data.deadline)


        }

      }
    })


  }, [])


  const handleOpenModal = () => {


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

  const changeRowDetail = () => {

    Api(token).put(`http://localhost:3001/table/update-rowDetail/${card.rowId}`, { description, attachment, activity }).then(res => {
      if (res.data) {
        alert("Cap nhat thong tin card thanh cong")
      }
    })

  }
  const handleAddComment = async () => {

    if (contentComment && contentComment.trim().length > 0) {

      const rowId = card.rowId
      Api(token).post("http://localhost:3001/comment/create-comment", { userId, contentComment, rowId }).then(res => {
        if (res.data) {
          socket.emit("add-comment", boardId)
          Api(token).get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {

            if (res.data) {
              setComments(res.data.comments)
              updateComments()
              setContentComment("")
            }
          })
        }
      })
    }
    else {

      return null;
    }



  }

  return (
    <>
      <div className="card"
        ref={setNodeRef}
        style={dndKitCardStyles}
        {...attributes}
        {...listeners}
      >
        {/* <input className="change-content" value={card.content} onClick={handleOpenModal}></input> */}

        <Box sx={{ width: "230px", minHeight: "48px", height: "fit-content", borderRadius: "10px", border: "none", fontSize: "20px", display: "flex", justifyContent: "center", flexDirection: "column", gap: 2.5 }} onClick={handleOpenModal}>

          {attachment ?
            <img style={{ width: "280px", height: "200px", borderRadius: "10px" }} src={attachment}></img>
            :
            null
          }
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ marginBottom: "5px", marginLeft: "10px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif"' }}>

              {card.content}


            </Box>
            {
              showTimeInCard ?




                <Box sx={{ display: "flex", justifyContent: "center", marginLeft: "10px", marginBottom: "5px", backgroundColor: overdue ? "#ed3333" : (duesoon ? "#c9c727" : "gray"), width: "100px", color: "white", gap: 1, borderRadius: "5px", fontSize: "17px" }}>
                  <AccessTimeIcon sx={{ fontSize: "25px" }} />
                  <span style={{ height: "0px" }}>{timeCard}</span>
                </Box>
                :
                null
            }

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
              <Box sx={{ overflowY: "no-scroll", height: "600px" }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CreditCardIcon />
                    <span>{content}</span>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Box onClick={handleShowDatePicker} sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", marginRight: "100px" }}>
                      <AccessTimeIcon />
                      <span>Ngày</span>
                    </Box>
                  </Box>




                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ marginTop: "30px", width: "250px", fontSize: "15px" }}>
                    <span>Trong danh sách {card.cols.columnName}</span>

                  </Box>
                  {isShowDueDate ?
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "0px" }}>
                      <Box sx={{ marginTop: "30px", fontSize: "15px" }}>
                        <span>Ngày hết hạn</span>


                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Checkbox />
                        <span style={{ fontSize: "15px" }}>{time}</span>
                      </Box>

                    </Box>
                    :
                    null
                  }
                  {overdue ?
                    <Box sx={{ backgroundColor: "#D53A3A", color: "white", height: "30px", display: "flex", alignItems: "center", marginTop: "50px", marginLeft: "20px", gap: 0.5 }}>
                      <AccessTimeIcon />
                      <span style={{ fontSize: "15px" }}>Quá hạn</span>




                    </Box>
                    :
                    null}
                  {duesoon ?
                    <Box sx={{ backgroundColor: "#D5D03A", color: "white", height: "30px", display: "flex", alignItems: "center", marginTop: "50px", marginLeft: "20px", gap: 1 }}>
                      <AccessTimeIcon />
                      <span style={{ fontSize: "15px" }}>Sắp hết hạn</span>



                    </Box>
                    :
                    null
                  }
                  {complete ?
                    <Box sx={{ backgroundColor: "#19DF47", color: "white", height: "30px", display: "flex", alignItems: "center", marginTop: "60px", marginLeft: "20px", gap: 1 }}>

                      <span>Hoàn thành</span>



                    </Box>
                    :
                    null
                  }
                </Box>
                {isShowDatePicker ?
                  <Box sx={{ width: "fit-content", position: "relative", marginLeft: "620px", marginTop: "-50px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                          sx={{ height: '60px' }}
                          label="Ngày hết hạn"
                          value={Deadline}
                          onChange={(newValue) => setDeadline(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <JoyButton onClick={confirmDateCard}>Lưu</JoyButton>
                      <ClearIcon sx={{ color: "gray" }} onClick={() => setIsShowDatePicker(false)} />
                    </Box>
                  </Box>
                  :
                  null
                }
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box onClick={(e) => setShowModalAddCheckList(true)} sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", marginTop: "20px", marginLeft: "700px", position: "relative" }}>
                    <CheckBoxIcon sx={{ color: "gray" }} />
                    <span>Việc cần làm</span>


                  </Box>
                  {showModalAddCheckList ?
                    <Box sx={{ left: "690px", position: "absolute", marginTop: "60px", width: "250px", height: "200px", backgroundColor: "white", zIndex: 1, borderRadius: "10px" }}>
                      <Box sx={{ marginTop: "10px", color: "black", display: "flex", alignItems: "center" }}>

                        <span style={{ textAlign: "center", fontSize: "15px", width: "200px", paddingLeft: "40px" , fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif', fontWeight:"500"}}> Thêm việc cần làm</span>
                        <ClearIcon onClick={(e) => setShowModalAddCheckList(false)} sx={{ color: "gray", marginLeft: "30px" }} />

                      </Box>
                      <Box sx={{ display: "flex", marginLeft: "10px", width: "calc(100% - 20px)", marginRight: "10px" }}>
                        <Box sx={{ marginTop: "15px" }}>
                          <FormControl>
                            <FormLabel>Tiêu đề</FormLabel>
                            <Input placeholder="Việc cần làm" onChange={(e) => setTodoListTitle(e.target.value)} />

                          </FormControl>
                          <Box sx={{ marginTop: "20px" }}>
                            <JoyButton type='submit' sx={{ width: "70px", fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif', fontWeight:"500" , fontSize:"15px"}} onClick={handleAddTodoList}>Thêm</JoyButton>

                          </Box>
                        </Box>

                      </Box>
                    </Box>
                    :
                    null
                  }
                </Box>

                <Box sx={{ width: "70%", marginTop: "40px", display: "flex", flexDirection: "column", gap: 5 }}>

                  <FormControl>
                    <FormLabel>Mô tả</FormLabel>
                    {showAddImage === true ?
                      <Box sx={{ display: "flex", position: "absolute", marginTop: "30px", zIndex: 1, marginLeft: "550px", marginTop: "20px" }}>

                        <input type='file' className="imageCard" onChange={(e) => { setImg(e.target.files[0]) }} style={{ display: "none" }} />
                        <Button onClick={() => { document.querySelector('input[type="file"].imageCard').click(); }}> <AddPhotoAlternateIcon /></Button>


                      </Box>
                      :
                      <Box></Box>
                    }


                    <Textarea sx={{ border: "none", paddingTop: "30px", width: "100%", minHeight: "100px", height: "fit-content", wordBreak: "break-all" }} value={description} onClick={() => setShowAddImage(true)} onChange={handleChangeDescription}></Textarea>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                      <Button className="button-1" sx={{ width: "20px", marginTop: "10px", backgroundColor: isChangeDescription ? "#1976d2" : "gray", cursor:isChangeDescription?"pointer":"not-allowed", ":hover": { backgroundColor: isChangeDescription ? '#1976d2' : 'gray' } }} variant="contained" disableElevation onClick={changeRowDetail}>
                        Lưu
                      </Button>
                      <Button onClick={cancelInput} sx={{ width: "20px", marginTop: "10px", backgroundColor: "gray" }} variant="contained" disableElevation>
                        Hủy
                      </Button>
                    </Box>

                  </FormControl>





                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
                      <AttachFileIcon sx={{ transform: "rotate(50deg)", fontSize: "20px" }} />
                      <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif", color: "var(--ds-text, #172b4d)" }}> Các tệp tin đính kèm</span>
                    </Box>
                    <Box sx={{ marginTop: "20px" }}>
                      {fileAttachments && fileAttachments.length > 0 && fileAttachments.map((fileAttachment, index) => (

                        <Attachment
                          key={index}
                          fileAttachment={fileAttachment}
                          handleDelFileAttachment={handleDelFileAttachment}
                          TimeDisplay={TimeDisplay}

                        />


                      ))}
                    </Box>

                  </Box>


                  {todoLists && todoLists.length > 0 && todoLists.map((todolist, index) =>
                  // countCheck(todolist)


                  (

                    <Todolist
                      todolist={todolist}
                      key={index}
                      updateTodoLists={updateTodoLists}
                      handleDelTodoList={handleDelTodoList}
                      handleDelTodo={handleDelTodo}
                    />

                  ))}
                  <Box>
                    <FormControl>
                      <FormLabel>Hoạt động</FormLabel>
                      <Box>
                        {/* <img style={{height:"40px", width:"40px", borderRadius:"50%"}} src={card.comments.user.}></img> */}
                        <Textarea placeholder="Viết một bình luận..." value={contentComment} sx={{ border: "none", width: "100%", minHeight: "30px", height: "fit-content", wordBreak: "break-all" }} onChange={(e) => setContentComment(e.target.value)} ></Textarea>
                      </Box>
                      <Button sx={{ width: "20px", marginTop: "10px", marginBottom: "10px",backgroundColor: isChangeComment?"#1976d2" : "gray", cursor:isChangeComment?"pointer":"not-allowed", ":hover": { backgroundColor: isChangeComment ? '#1976d2' : 'gray'  } }} onClick={handleAddComment} variant="contained" disableElevation>
                        Lưu
                      </Button>
                      {comments && comments.length > 0 && comments.map((comment) => (



                       <Comment
                       comment={comment}
                       TimeDisplay={TimeDisplay}
                       handelDelComment={handelDelComment}

                       
                       />



                      ))}
                    </FormControl>
                  </Box>

                </Box>


              </Box>
            </Typography>

          </Box>
        </Modal>

        <i class="fa fa-pencil icon-edit-card" onClick={() => setIsShowEditCard(true)}></i>

      </div>

      {!isShowEditCard === false ?
        <div className="conntent-edit-card">
          <button className="icon-delete" onClick={() => cardDel(card)} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif', fontWeight: "500" }}> Delete</button>
          <button className="icon-save" onClick={(e) => setChangeContentCard(e.target.value)} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif', fontWeight: "500" }}>Save</button>
          <i className="fa fa-times icon-cancel-edit" onClick={() => setIsShowEditCard(false)}></i>

        </div>
        :
        <div></div>
      }
    </>

  )

}
export default Card;