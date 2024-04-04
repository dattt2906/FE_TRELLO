import "./navbar.css"
const Navbar=()=>{

    return(
        <>
            <div className="navbar">
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
                
            </div>

        </>
    )
}
export default Navbar;