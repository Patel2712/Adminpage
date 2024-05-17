import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import './css/StoreManage.css'
import AdminSidebar from './AdminSidebar';
import { FaCircleExclamation } from "react-icons/fa6";



function AllFetchStore() {

    const [data, fetchdata] = useState([]);
    const [loading, setLoading] = useState(false)
    const users = JSON.parse(localStorage.getItem('adminLogin'));
    const admin_id = users.user.id;
    // console.log(admin_id);

    useEffect(() => {
        setLoading(true)
        FetchStore()
    }, []);


    async function FetchStore() {
        try {

            let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=allfetchstore");

            if (!result.ok) {
                console.log("Failed to fetch. Status:", result.status);
            } else {
                result = await result.json();
                if (result.error === false && result.message === "Data Fetch successful") {
                    console.log("FetchStore", result)
                    fetchdata(result.details)
                    setLoading(false)
                }
                else if (result.error === true) {
                    alert(result.message)
                }
            }
        } catch (error) {
            console.log("Error", error.result.data)
        }

    }


    const openAddressInNewWindow = (address) => {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`<div>${address}</div>`);
    };

    const openOwner = (documentUrl) => {
        window.open(`http://clickandcall.spectricssolutions.com/apilist/adsmaker/${documentUrl}`, '_blank');
    };

    const openStore = (documentUrl) => {
        window.open(`http://clickandcall.spectricssolutions.com/apilist/adsmaker/${documentUrl}`, '_blank');
    };

    return (
        <>
            <div className="container-fluid" style={{ overflowX: "hidden" }}>
                <div className="row">
                    <div className="col-12 scroll">
                        <AdminSidebar>
                            <div className="row table-content" style={{ overflow: "auto" }}>
                                <div className="d-flex justify-content-center align-items-start py-5">
                                    {loading ? (
                                        <Spinner animation="border" variant="dark" />
                                    ) : data.length === 0 ? (
                                        <div className="no-data-found ">
                                            <div className="text-center text-dark rounded bg-primary-subtle" style={{ padding: "80px 50px" }}>
                                                <FaCircleExclamation className='fs-1'></FaCircleExclamation>
                                                <h1 style={{ margin: "10px 0" }}>Store not found</h1>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="table-wrapper" style={{ width: "90%" }}>
                                            <div className="row table-heading" style={{ width: "90%" }}>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th className='fs-3'>Stores</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                            <div className="row table-data">
                                                <div style={{ overflow: "auto", maxHeight: "400px", width: '90%', padding: "0" }}>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Sr.no.</th>
                                                                <th>Id</th>
                                                                <th>Username</th>
                                                                <th>OwnerName</th>
                                                                <th>StoreName</th>
                                                                <th>Email</th>
                                                                <th>OpeningTime</th>
                                                                <th>ClosingTime</th>
                                                                <th>OwnerPhone</th>
                                                                <th>Licence</th>
                                                                <th>Documents</th>
                                                                <th>StartDate</th>
                                                                <th>Address</th>
                                                                <th>Image</th>
                                                                <th>GstNo</th>
                                                                <th>HsnSac</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data.map((details, index) =>
                                                                    <tr key={details.id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{details.id}</td>
                                                                        <td>{details.store_username}</td>
                                                                        <td>{details.owner_name}</td>
                                                                        <td>{details.store_name}</td>
                                                                        <td>{details.email}</td>
                                                                        <td>{details.opening_time}</td>
                                                                        <td>{details.closing_time}</td>
                                                                        <td>{details.owner_phone}</td>
                                                                        <td>
                                                                            {details.store_license_doc && (
                                                                                <button
                                                                                    style={{ color: "white", border: "none", backgroundColor: "blue", padding: "3px 8px", borderRadius: "2px", marginTop: "5px", fontWeight: "bold", marginLeft: "5px" }}
                                                                                    onClick={() => openStore(details.store_license_doc)}>                                                                                Licence
                                                                                </button>
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {details.owner_doc && (
                                                                                <button
                                                                                    style={{ color: "white", border: "none", backgroundColor: "blue", padding: "3px 8px", borderRadius: "2px", marginTop: "5px", fontWeight: "bold", marginLeft: "5px" }}
                                                                                    onClick={() => openOwner(details.owner_doc)}>
                                                                                    Document
                                                                                </button>
                                                                            )}
                                                                        </td>
                                                                        <td>{details.store_start_date}</td>
                                                                        <td>{details.address && (
                                                                            <button
                                                                                style={{ color: "white", border: "none", backgroundColor: "blue", padding: "3px 8px", borderRadius: "2px", marginTop: "5px", fontWeight: "bold", marginLeft: "5px" }}
                                                                                onClick={() => openAddressInNewWindow(details.address)}>
                                                                                Address
                                                                            </button>
                                                                        )}</td>
                                                                        <td>
                                                                            {details.store_image && (
                                                                                <button
                                                                                    style={{ color: "white", border: "none", backgroundColor: "blue", padding: "3px 8px", borderRadius: "2px", marginTop: "5px", fontWeight: "bold", marginLeft: "5px" }}
                                                                                    onClick={() => window.open(`http://clickandcall.spectricssolutions.com/apilist/adsmaker/${details.store_image}`, '_blank')}>
                                                                                    Image
                                                                                </button>
                                                                            )}
                                                                        </td>
                                                                        <td>{details.gst_no}</td>
                                                                        <td>{details.hsn_sac}</td>
                                                                        {details.status == "1" ? (
                                                                            <td>
                                                                                <span className="text-success bg-success-subtle px-2 py-1">
                                                                                    active
                                                                                </span>
                                                                            </td>
                                                                        ) : (
                                                                            <td>
                                                                                <span className=" text-danger bg-danger-subtle px-2 py-1">
                                                                                    inactive
                                                                                </span>
                                                                            </td>
                                                                        )}
                                                                    </tr>
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </AdminSidebar>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AllFetchStore;