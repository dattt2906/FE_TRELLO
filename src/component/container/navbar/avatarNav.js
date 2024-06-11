import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useToken } from '../../../tokenContext';
import Api from '../../../api';
export default function ImageAvatars() {
    const queryString = window.location.search;
    
  const params = new URLSearchParams(queryString);
  const workspaceId = params.get('workspaceId');
  const[token, setToken]=useState(useToken().token)
  const [users, setUsers]= useState([])
  useEffect(() => {
    Api(token).get(`http://localhost:3001/workspace/find-workspace-by-id/${workspaceId}`).then(res => {

        if (res.data) {
            setUsers(res.data.users)
        }
    })

}, [])

  

  return (
    <Stack direction="row" spacing={2}>
       {users && users.length > 0 && users.map((user, index) => (

<Avatar alt="imageUser" src={user.userInfors.avatarImg} key={index} />
 




))}
      
      
    </Stack>
  );
}