import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom'
import './css/AdminHome.css';
import Dashboard from './Dashboard';



export default function AdminHome() {
    const navigate = useNavigate();
    useEffect(() => {
        let users = JSON.parse(localStorage.getItem("adminLogin"))
        let id = users.user.id;
        if (!id) {
            navigate('/')
        }
    }, []);

    return (
        <>
            <div className="container-fluid" style={{ overflow: "hidden" }}>
                <AdminSidebar>
                    <div style={{ overflow: "auto" }}>
                        <div>
                            <p className='text-start fs-2 fw-bold dashboard-label px-5'>Dashboard</p>
                        </div>
                        <Dashboard></Dashboard>
                    </div>
                </AdminSidebar >
            </div>
        </>
    )
}
