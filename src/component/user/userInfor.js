import './userInfor.css'
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { imageDb } from '../../firebase';
import { v4 } from 'uuid';

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { settings } from 'firebase/analytics';
import { data } from '../data';
const UserInfor = () => {

    const [userInfor, setUserInfor] = useState(null)
    const [display_name, setDisplayName] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [address, setAddress] = useState("")
    const userId = Number(localStorage.getItem("UserId"))
    const[img,setImg]= useState('')
    const[avatarImg, setAvartarImg]= useState("")



    const changeInfor = () => {
        const userinfo = { display_name, age, sex, address,avatarImg }

        axios.put(`http://localhost:3001/users/update-userinfo/${userId}`, userinfo)
        alert("Cap nhat thong tin user thanh cong")
    }

    const handleUpload=()=>{

     const imageRef=ref(imageDb, `images/${v4()}`)
     uploadBytes(imageRef,img).then((snapshot) =>{

        getDownloadURL(snapshot.ref).then((img)=>{
            setAvartarImg(img)
        })
     })
    }
 
    useEffect(() => {

        axios.get(`http://localhost:3001/users/find-userinfor-by-userId/${userId}`).then(res => {

            if (res.data) {
                setUserInfor(res.data)
                setDisplayName(res.data.display_name)
                setAge(res.data.age)
                setSex(res.data.sex)
                setAddress(res.data.address)
                setAvartarImg(res.data.avatarImg)
            }
        })

    }, [])

    return (
        <>


            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 3, marginTop: "70px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>

                    <img style={{ width: "150px", height: "150px", borderRadius: "50%",border:"1px solid black"}} src={avatarImg}></img>
                    <span style={{ paddingLeft: "20px", fontSize: "40px" }}>{display_name}</span>
                </Box>
                <Box>
                    <input type='file' onChange={(e)=>{setImg(e.target.files[0]);handleUpload()}}></input>
                    
                </Box>

                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '400px', marginTop: "100px" },
                    }}
                    noValidate
                    autoComplete="off">


                    <TextField id="outlined-basic" label="Displayname" variant="outlined" value={display_name} onChange={(e) => setDisplayName(e.target.value)} />

                </Box>
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '400px' },
                    }}
                    noValidate
                    autoComplete="off">


                    <TextField id="outlined-basic" label="Age" variant="outlined" value={age} onChange={(e) => setAge(e.target.value)} />

                </Box >
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '400px' },
                    }}
                    noValidate
                    autoComplete="off">


                    <TextField id="outlined-basic" label="Sex" variant="outlined" value={sex} onChange={(e) => setSex(e.target.value)} />

                </Box>
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '400px' },
                    }}
                    noValidate
                    autoComplete="off">


                    <TextField id="outlined-basic" label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />



                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "400px", height: "40px" }}>
                    <Button variant="contained" onClick={changeInfor}>Save Changes</Button>
                    <Link to={"/Change-password"}>
                        <Button variant="contained">Change password</Button>
                    </Link>


                </Box>

            </Box>




        </>
    )


}

export default UserInfor;