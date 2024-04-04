import "./container.css"
import Sidebar from "./sidebar"
import Navbar from "./navbar"
import Content from "./content"
import Column from "./column"
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import ReactDOM from 'react-dom';

const Container = () => {


    return (

        <>
            <div className="container">
                <Sidebar></Sidebar>
                <div className="main-content">
                    <Navbar></Navbar>
                    <Content>
                    </Content>
                </div>
            </div>



        </>

    )
}
export default Container