import React from 'react'
import UserImg from "../../Images/user.png"
import './Header.css';
import Search from "../../Images/search.png"
import SideBar from "../SideBar/SideBar"
import TableNav from "../TableNav/TableNav";
import { context } from "../ContextApi/context"
import { useContext } from 'react';
const Header = () => {
    const { email, myFunction } = useContext(context);
    const user = localStorage.getItem("email").split("@")[0].toUpperCase()
    return (
        <div className='main-container'>
            <div className='sideBar'>
                <SideBar />
            </div>
            <div className='middle-container'>
                <div className='header-container'>
                    <div className='total-contact'>Total Contacts</div>
                    <div className='search'>
                        <img src={Search} alt="" width="20px" />
                        <input type="search"
                            placeholder='Search by Email-Id....'
                            id='myInput'
                            onKeyUp={() => myFunction()}

                        />
                    </div>
                    <div className='user-container'>
                        <div className='user-image'>
                            <img src={UserImg} alt="user" />
                        </div>
                        <div className='user-details'>
                            <p style={{ fontSize: "20px", color: "#0a89e4f0" }}>
                                {user}
                            </p>
                            <p className='user-type'>
                                Super Admin
                            </p>
                        </div>
                    </div>
                </div>
                <div className='tableNav-container'>
                    <TableNav />
                </div>
            </div>
        </div>

    )
}

export default Header