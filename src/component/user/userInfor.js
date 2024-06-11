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
import { useToken } from '../../tokenContext';
import Api from '../../api';
const UserInfor = () => {


    const [userInfor, setUserInfor] = useState(null)
    const [display_name, setDisplayName] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [address, setAddress] = useState("")
    // const userId = Number(localStorage.getItem("UserId"))
    const userIdUrl = window.location.search
    const userId = Number(userIdUrl.replace("?", ""))
    const [img, setImg] = useState(null)
    const [avatarImg, setAvartarImg] = useState("")
    const [token, setToken] = useState(useToken().token)

    console.log("Api:", Api(token))

    const headers = {
        'Authorization': `${token}`,  // Ví dụ: Token xác thực
        'Content-Type': 'application/json',          // Ví dụ: Định dạng dữ liệu gửi đi là JSON
        'Custom-Header': 'Custom-Value'              // Tiêu đề tùy chỉnh khác nếu cần
    };



    const changeInfor = () => {
        const userinfo = { display_name, age, sex, address, avatarImg }

        Api(token).put(`/users/update-userinfo/${userId}`, userinfo)
        alert("Cap nhat thong tin user thanh cong")
    }

    const handleUpload = async () => {

        const formData = new FormData();
        formData.append("file", img)

        console.log("formData:", formData)

        await Api(token).post('/files/upload', formData).then(res => {
            setAvartarImg("http://localhost:3001/api/images/" + res.data.filename)


        })

    }
    useEffect(() => {

        Api(token).get(`http://localhost:3001/users/find-userinfo-by-userId/${userId}`).then(res => {

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

    useEffect(() => {
        if (img) {
            handleUpload();
        }
    }, [img]);

    return (
        <>


            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 3, marginTop: "70px" }}>

                <Box sx={{ width: '480px' }}>

                    <img style={{ width: "150px", height: "150px", borderRadius: "50%", border: "1px solid black" }} src={avatarImg}></img>

                </Box>

                <Box sx={{ width: '480px' }}>
                    {/* <input type='file' onChange={(e)=>{setImg(e.target.files[0])}}></input>
                    <button onClick={handleUpload}>Upload</button> */}
                    <input type='file' onChange={(e) => { setImg(e.target.files[0]) }} style={{ display: "none" }} />
                    {/* <button onClick={() => { document.querySelector('input[type="file"]').click(); }}>Upload</button> */}
                    <Button variant="contained" onClick={() => { document.querySelector('input[type="file"]').click(); }}>Tải ảnh lên</Button>
                </Box>
                <Box sx={{ width: '480px', marginTop: "50px" }}>

                    <span style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "inherit" }}>Về bạn</span>

                </Box>

                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '480px', marginTop: "20px" },
                    }}
                    noValidate
                    autoComplete="off">


                    <TextField id="outlined-basic" label="Tên hiển thị" variant="outlined" value={display_name} onChange={(e) => setDisplayName(e.target.value)} />

                </Box>
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '480px' },
                    }}
                    noValidate
                    autoComplete="off">


                    <TextField id="outlined-basic" label="Tuổi" variant="outlined" value={age} onChange={(e) => setAge(e.target.value)} />

                </Box >
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '480px' },
                    }}
                    noValidate
                    autoComplete="off">


                    <TextField id="outlined-basic" label="Giới tính" variant="outlined" value={sex} onChange={(e) => setSex(e.target.value)} />

                </Box>
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '480px' },
                    }}
                    noValidate
                    autoComplete="off">


                    <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />



                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "480px", height: "40px" }}>
                    <Button variant="contained" onClick={changeInfor}>Lưu thay đổi</Button>
                    <Link to={`/Change-password/user/?${userId}`}>
                        <Button variant="contained">Đổi mật khẩu</Button>
                    </Link>


                </Box>

            </Box>




        </>
    )


}

export default UserInfor;