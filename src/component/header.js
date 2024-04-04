import { useState } from "react"
import "./header.css"
import axios from "axios";
import {Link} from "react-router-dom"
const Header = () => {
    const [displayName, setDisplayName]= useState("");
    const userId= Number(localStorage.getItem("UserId"))



    axios.get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res=>{
        if(res.data){
            setDisplayName(res.data.username)
            
        }


        })
    const clear=()=>{

        localStorage.clear();
    }

    return (
        <div className="header">
            <div className="icon-left">
                <h1><i className="fa fa-trello"></i>Trello</h1>
                <div>Workspaces <i class="fa fa-chevron-down"></i></div>
                <div>Recent <i class="fa fa-chevron-down"></i></div>
                <div>Starred <i class="fa fa-chevron-down"></i></div>
                <div>Create<i class="fa fa-chevron-down"></i></div>
            </div>

            <div className="icon-right">
                <div className="block-input"><input type="text" className="input-search" placeholder="Search"></input></div>
                <div className="icon-bell"><i className="fa fa-bell"></i></div>
                <div className="icon-question"><i className="fa fa-question"></i></div>
                <div className="icon-user-display"><i className="fa fa-user"></i></div>
                
               <div className="display_name"> {displayName}</div>
                <Link to={"/"}>
                    <button onClick={clear}>Logout</button>

                </Link>
                
                
            </div>
        </div>
    )
}
export default Header