import React from 'react';
import './css/AdminNavbar.css'
// import user from './css/images/user.jpg'y
import user from './css/images/user.jpg'

const AdminNavbar = () => {

    let name = localStorage.getItem("adminLogin");
    let userDetails = JSON.parse(name);
    let username = userDetails ? userDetails.user.admin_username : "";

    return (
        <div>
            <header className='header'>
                <nav className='navbar d-flex justify-content-end'>
                    {/* <div className="search">
                        <input type="text" placeholder='Search here...'></input>
                        <button type="submit" title='Search'><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div> */}

                    <div className='d-flex justify-content-end icons'>
                        {/* <div className='setting d-flex align-items-center px-3'>
                            <i class="fa-regular fa-bell fa-lg pb-2" title='notifications'></i>
                        </div>
                        <div className='message d-flex align-items-center px-3'>
                            <i class="fa-regular fa-message fa-lg pb-2" title='messages'></i>
                        </div> */}
                        <div className='d-flex align-items-center mx-2 username-container'>

                            <img src={user} alt='User' height="40px" width="40px" className='user'></img>
                            <p className='user-name'>Hii,{username}</p>
                            
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};
export default AdminNavbar;