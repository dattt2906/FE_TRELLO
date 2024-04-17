import './userInfor.css'
import axios from 'axios'

import { useEffect, useState } from 'react'
const UserInfor=() => {

    const [userInfor, setUserInfor]= useState(null)
    const [displayname, setDisplayName]= useState("")
    const [age, setAge]= useState(null)
    const [sex, setSex]= useState(null)
    const [address, setAddress]= useState("")
    const userId=Number(localStorage.getItem("UserId"))
    
    const handleUpdateDisplayName=()=>{
        axios.put(`http://localhost:3001/users/update-display_name/${userId}`,{displayname});


    }
    const handleUpdateAge=()=>{
        axios.put(`http://localhost:3001/users/update-age/${userId}`,{age});
        
    }
    const handleUpdateSex=()=>{
        axios.put(`http://localhost:3001/users/update-sex/${userId}`,{sex});
        
    }
    const handleUpdateAddress=()=>{
        axios.put(`http://localhost:3001/users/update-address/${userId}`,{address});
        
    }


    useEffect(()=>{

        axios.get(`http://localhost:3001/users/find-userinfor-by-userId/${userId}`).then(res=>{

            if(res.data){
                setUserInfor(res.data)
            }
        })

    },[])
  
    return(
        <>
        {/* <Header></Header> */}
            <div className="user-infor">
                <div className="header-user-infor">USER INFO</div>
                <div className="display_name_userInfo">
                    
                    <input type='text' value={userInfor?.display_name} onChange={(e)=>setDisplayName(e.target.value)}/>
                    <button onClick={handleUpdateDisplayName}>Save</button>
                </div>
                <div className="age">
                  
                    <input type='text' value={userInfor?.age} onChange={(e)=>setAge(e.target.value)}/>
                    <button onClick={handleUpdateAge}>Save</button>
                </div>
                <div className="sex">
                    
               
                    <input type='text' value={userInfor?.sex} onChange={(e)=>setSex(e.target.value)}/>
                    <button onClick={handleUpdateSex}>Save</button>
                </div>
                <div className="address">
                    
                
                    <input type='text'value={userInfor?.address} onChange={(e)=>setAddress(e.target.value)}/>
                    <button onClick={handleUpdateAddress}>Save</button>
                </div>
               

            </div>

        </>
    )


}

export default UserInfor;