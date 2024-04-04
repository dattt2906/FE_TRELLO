import "./sidebar.css"
import 'font-awesome/css/font-awesome.min.css';

const Sidebar = () => {

    return (
        <>

            <div className="sidebar">
                <div className="nameWorkSpace"></div>
                <div className="list-sidebar">
                    <div><i class="fa fa-bars board-icon" />Board</div>
                    <div><i class="fa fa-user user-icon" />Member <i className="fa fa-plus icon-add-member"></i></div>
                    <div><i class="fa fa-gear setting-icon" />Workspace settings <i class="fa fa-chevron-down icon-down-setting"></i></div>
                    <div>Workspace view</div>
                    <div><i class="fa fa-table table-icon"></i>Table</div>
                    <div><i class="fa fa-calendar calendar-icon"></i>Celedar</div>
                </div>


            </div>

        </>
    )
}
export default Sidebar;