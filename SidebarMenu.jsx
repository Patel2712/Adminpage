import React, { useState } from 'react'
import { FaAngleDown, FaAngleRight } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import './css/AdminSidebar.css'


export default function SidebarMenu({ route, isOpen }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
        <>
            <div className="menu" onClick={toggleMenu}>
                <div className="menu-item">
                    <div className="icons">{route.icon}</div>
                    {isOpen && <div className="link_text">{route.name}</div>}
                </div>
                {(isMenuOpen) &&  (isOpen)  &&                
                        <FaAngleRight style={{margin:"8px 0 2px 0 "}} />                  
                }
                {(!isMenuOpen) && (isOpen)  && 
                        <FaAngleDown style={{margin:"8px 0 2px 0 "}} />
                }
            </div>
            {isMenuOpen && isOpen && (
                <div className="menu-container">
                    {route.subRoutes.map((subRoute, i) =>
                        <NavLink activeClassName="active" to={subRoute.path} key={i} className="link">
                            <div className="icons">{subRoute.icon}</div>
                            <div className="link_text">{subRoute.name}</div>
                        </NavLink>
                    )}
                </div>
            )}
        </>
    )
}
