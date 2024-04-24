import Box from '@mui/material/Box';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BoltIcon from '@mui/icons-material/Bolt';
import BoardName from './boardname';
const Navbar=()=>{

    return(
        <>
            {/* <div className="navbar">
                <div className="navbar-left">
                <h1 className="todothings">Công việc hàng ngày</h1>
                <i className="fa fa-user icon-users"></i>
                <div><button className="select-board"><i className="fa fa-trello"></i>Board</button></div>
                </div>

                <div className="navbar-right">
                <i className="fa fa-slack icon-slack"></i>
                <i className="fa fa-rocket icon-rocket"></i>
                <i className="fa fa-bolt icon-bolt"></i>
                <div className="add-user"><button value="Share" className="button-add-user"><i className="fa fa-user-plus icon-add-user"></i>Share</button></div>
                </div>
                
            </div> */}
            <Box sx={{height:"80px", display:"flex", alignItems:"center",backgroundColor:"gray", justifyContent:"space-between"}}>


            <Box sx={{display:"flex",marginLeft:"20px", gap:2, alignItems:"center"}}>
            <BoardName/>
            <StarBorderIcon/>

            <PeopleOutlineIcon/>
            </Box>
            <Box sx={{marginRight:"20px", gap:2,display:"flex"}}>
            <RocketLaunchIcon/>
            <BoltIcon/>
                
            </Box>
            
            </Box>

        </>
    )
}
export default Navbar;