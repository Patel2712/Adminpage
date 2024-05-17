import React from 'react'
import './css/AdminSidebar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaStore, FaBars } from 'react-icons/fa'
import { IoPeople } from "react-icons/io5";
import { MdPreview, MdAddIcCall } from "react-icons/md";
import { FaPowerOff, FaListCheck } from "react-icons/fa6";
import { IoIosAddCircle, IoIosUnlock } from "react-icons/io";
import { FcFeedback } from "react-icons/fc";
import { IoSettings } from "react-icons/io5";
import { SlEnvolopeLetter } from "react-icons/sl";
import { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import AdminNavbar from './AdminNavbar';
import AdminHome from './AdminHome';
import Clients from './Clients';
import StoreRegister from './StoreRegister';
import StoreManage from './StoreManage';
import Contact from './Contact';
import FeedBack from './FeedBack';
import AllFetchStore from './AllFetchStore';
import NewsLetter from './NewsLetter';
import ForgetPassword from './ForgetPassword';



const routes = [
    {
        path: '/adminHome',
        name: 'Dashboard',
        icon: <FaHome />,
        component: AdminHome,
    },
    {
        path: '/allFetchStore',
        name: 'StoreList',
        icon: <FaListCheck />,
        component: AllFetchStore,
    },
    {
        path: '/clients',
        name: 'Clients',
        icon: <IoPeople />,
        component: Clients,
    },
    {
        path: '/contact',
        name: 'Contact',
        icon: <MdAddIcCall />,
        component: Contact,
    },
    {
        path: '/feedback',
        name: 'FeedBack',
        icon: <FcFeedback />,
        component: FeedBack,
    },
    {
        path: '/newsletter',
        name: 'Post design',
        icon: <SlEnvolopeLetter />,
        component: NewsLetter,
    },
    {
        name: 'Settings',
        icon: <IoSettings />,
        subRoutes: [
            {
                path: '/changePassword',
                name: 'Change_Password',
                icon: <IoIosUnlock />,
                component: ForgetPassword,
            },
        ],
    },
];

const AdminSidebar = ({ children }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [selectedRoute, setSelectedRoute] = useState(routes[0]);

    const handleRouteClick = (route) => {
        setSelectedRoute(route);
        // setIsOpen(false)
    };

    function handleLogout() {
        localStorage.removeItem("adminLogin");
        navigate('/')
    }

    return (
        <div className='main-container'>
            <div style={{ width: isOpen ? "220px" : "36px" }} className='sidebar'>
                <div className="top_section" >
                    {isOpen && <>
                        <Link to="/adminHome" style={{ textDecoration: "none", color: "white", cursor: "pointer" }}>
                            <h1 className='logo'>GRACE ADS</h1>
                        </Link>
                    </>
                    }
                    <div className="bars" style={{ cursor: "pointer" }}>
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <section className='routes'>
                    {routes.map((route, index) => {
                        if (route.subRoutes) {
                            return <SidebarMenu route={route} key={route.name} isOpen={isOpen} />
                        }
                        return (
                            <NavLink activeclassname="active" to={route.path}
                                key={index} className="link" onClick={() => handleRouteClick(route)}>
                                <div className="icons">{route.icon}</div>
                                {isOpen && <div className="link_text">{route.name}</div>}
                            </NavLink>
                        );
                    })}
                </section>
                <div className='logout-btn' activeclassname="active-class" onClick={handleLogout}>
                    <div className='icons'><FaPowerOff></FaPowerOff></div>
                    {isOpen && <div className='link-text'>Logout</div>}
                </div>
            </div>
            <div className="content-wrapper">
                <header className='navbar-content'>
                    <AdminNavbar></AdminNavbar>
                </header>
                <main className='center-content'>
                    <div className="container-fluid">
                        {
                            selectedRoute && (
                                <div>
                                    {selectedRoute.component}
                                    {children}
                                </div>
                            )
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminSidebar;