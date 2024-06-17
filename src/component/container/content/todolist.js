import { Box } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import ClearIcon from '@mui/icons-material/Clear';
import Textarea from '@mui/joy/Textarea';
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/joy/Checkbox';
import axios from "axios";
import Todo from "./todo";
import Api from "../../../api";
import { useToken } from "../../../tokenContext";







const Todolist = (props) => {
  const { todolist, updateTodoLists, handleDelTodoList, handleDelTodo } = props
  const todoListId = todolist.todoListId
  const [countChecked, setCountChecked] = useState(0)
  const [todoTitle, setTodoTitle] = useState("")
  const [token,setToken]=useState(useToken().token)
  const[isShowModalConfirmDeleteList, setIsShowModalConfirmDeleteList]=useState(false)
  const countCheck = (todolist) => {

    if (todolist && todolist.todos) {
      const checkedCount = todolist.todos.filter(todo => todo.isChecked).length;
      setCountChecked(checkedCount);
    }
  }
  const handleAddTodo = (todoListId) => {

    if(todoTitle && todoTitle.trim().length > 0){


    Api(token).post("http://localhost:3001/todolist/create-todo", { todoTitle, todoListId }).then(res => {
      if (res.data) {

        updateTodoLists()
        setTodoTitle("")

      }
    })
  }
  else{
    return null;
  }


  }
  useEffect(() => {
    countCheck(todolist)

  }, [todolist])

  const delTodoList=()=>{

    setIsShowModalConfirmDeleteList(false)
    handleDelTodoList(todolist.todoListId)
  }


  const showModalCofirmDelete=(title)=>{
   
    return(
  
      <>
      <Box sx={{height:"fit-content", width:"fit-content",display:"flex",position:"absolute", flexDirection:"column", backgroundColor:"white",fontSize:"15px", marginLeft:"0px", marginTop:"0px", zIndex:1,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif', borderRadius:"10px"}}>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
        <span style={{paddingLeft:"90px"}}>Bạn muốn xóa {title}?</span>
        <ClearIcon sx={{marginRight:"10px"}} onClick={(e)=>setIsShowModalConfirmDeleteList(false)}/>

        </Box>
  
        <span style={{marginTop:"20px", fontSize:"13px", marginLeft:"5px"}}>{title} sẽ bị xóa vĩnh viễn và bạn không thể hoàn tác</span>
        <Box sx={{display:"flex", justifyContent:"center"}}>
        <Button sx={{ ":hover":{backgroundColor:"var(--ds-background-danger-bold-hovered,#ae2a19)"},backgroundColor:"var(--ds-background-danger-bold,#ca3521)", color:"white", fontSize:"13px", fontWeight:"500",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',width:"300px", marginTop:"20px", marginBottom:"20px"}} onClick={ delTodoList}>Xóa {title}</Button>
  
        </Box>
  
  
      </Box>
      
      </>
    )
  
    }


  return (
    <>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CheckBoxIcon sx={{ color: "gray" }} />
            {todolist.todoListTitle}
          </Box>

          <Box>

            <Button onClick={ (e)=> setIsShowModalConfirmDeleteList(true)} sx={{ position:"relative",width: "20px", marginTop: "10px", marginBottom: "10px", backgroundColor: "gray" }} variant="contained" disableElevation>
              Xóa
            </Button>
            {isShowModalConfirmDeleteList ?
            showModalCofirmDelete("List công việc")
            :
            null  
          }

          </Box>

        </Box>
        {todolist.todos.length !== 0 ?

          <Box sx={{display:"flex", alignItems:"center", gap:2}}>

            <span style={{ fontSize: "15px" , fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif', fontWeight:"500", fontSize:"15px"}}>{Math.floor((countChecked / todolist.todos.length) * 100)}%</span>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" value={(countChecked / todolist.todos.length) * 100} sx={{ marginLeft: "0px" }} />
          </Box>
          :

          <Box sx={{display:"flex", alignItems:"center", gap:2}}>

            <span style={{ fontSize: "15px" }}>0%</span>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" value={0} sx={{ marginLeft: "0px" }} />
          </Box>
        }
        {todolist && todolist.todos.map((todo, index) => (


          <Todo
            key={index}
            todo={todo}
            updateTodoLists={updateTodoLists}
            handleDelTodo={handleDelTodo}
          />

        ))}

        <Textarea placeholder="Thêm một mục" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)}></Textarea>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button sx={{ width: "20px", marginTop: "10px", marginBottom: "10px" }} variant="contained" disableElevation onClick={() => handleAddTodo(todolist.todoListId)}>
            Thêm
          </Button>
          <Button sx={{ width: "20px", marginTop: "10px", marginBottom: "10px", backgroundColor: "gray" }} variant="contained" disableElevation>
            Hủy
          </Button>
        </Box>





      </Box>

    </>


  )

}
export default Todolist;


