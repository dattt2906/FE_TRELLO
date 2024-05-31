// import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect ,useState} from 'react';
import axios from 'axios';
import Textarea from '@mui/joy/Textarea';
import { useLocation } from 'react-router-dom';



// function MyFormHelperText() {
//   const { focused } = useFormControl() || {};

//   const helperText = React.useMemo(() => {
//     if (focused) {
//       return 'This field is being focused';
//     }

//     return 'Helper text';
//   }, [focused]);

//   return <FormHelperText>{helperText}</FormHelperText>;
// }

export default function BoardName() {
    // const boardId= Number(localStorage.getItem("boardId"))
    const queryString = window.location.search;
    const location=useLocation()
    const [boardName, setBoardName]= useState('')
    const params = new URLSearchParams(queryString);
    const [boardId, setBoardId] = useState(params.get("boardId"))
useEffect(()=>{
 axios.get(`http://localhost:3001/board/find-board-by-id/${boardId}`).then(res=>{

    if(res.data){
       setBoardName(res.data.boardname)
    }

})


},[boardId])


useEffect(()=>{
  setBoardId(params.get("boardId"))

},[location])



  return (
    <form noValidate autoComplete="off">
      <FormControl sx={{ width: '25ch' }}>
        <Textarea sx={{backgroundColor:"#b5b6f3;", border:"none", color:"white", fontWeight:"bold", fontSize:"20px"}} value={boardName}  spellCheck="false"></Textarea>
        {/* <MyFormHelperText /> */}
      </FormControl>
    </form>
  );
}
