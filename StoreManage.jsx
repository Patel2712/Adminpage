import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import './css/StoreManage.css'
import AdminSidebar from './AdminSidebar';
import { MdDelete, MdModeEdit } from "react-icons/md";
import Swal from 'sweetalert2';
import { FaCircleExclamation } from "react-icons/fa6";


function StoreManage() {

  const [data, fetchdata] = useState([]);
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const users = JSON.parse(localStorage.getItem('adminLogin'));
  const admin_id = users.user.id;
  // console.log(admin_id);

  useEffect(() => {
    setLoading(true)
    fetchcode1()
  }, []);


  async function fetchcode1() {
    try {
      let data = { admin_id }
      let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchstore", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!result.ok) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to fetch',
          text: `Status: ${result.status}`,
        });
        console.log("Failed to fetch. Status:", result.status);
      } else {
        result = await result.json();
        if (result.error === false && result.message === "Data Fetch successful") {
          console.log("StoreManage", result)
          fetchdata(result.details)
          setLoading(false)
        }
        else if (result.error === true && result.message === "No data found for the given admin_id") {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: "No data Found",
          });
          setLoading(false)
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: 'An error occurred'
          });
        }
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'An error occurred',
      });
      console.error("Error", error);
    }
  }

  async function deleteData(id) {
    try {
      const result = await Swal.fire({
        title: 'Are you sure you want to delete this store?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const data = { id };
        const response = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=deletestore", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Failed to fetch',
            text: `Status: ${result.status}`,
          });
          console.log("Failed to fetch. Status:", result.status);
        }
        else {
          const responseData = await response.json();

          if (responseData.error === false && responseData.message === "Delete operation successful") {
            Swal.fire(
              'Deleted!',
              'Your store has been deleted.',
              'success'
            );
            fetchcode1();
            setLoading(false)// Refresh the data after deletion
          } else if (response.error === true) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error',
              text: "No data Found",
            });
            setLoading(false)
          } else {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the store.',
              'error'
            );
            setLoading(false)
          }
        }
      }
    } catch (error) {
      console.error("Error deleting store:", error);
      Swal.fire(
        'Error!',
        'An error occurred while deleting the store.',
        'error'
      );
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
                        <h1 style={{ margin: "10px 0" }}>Stores not found</h1>
                      </div>
                    </div>
                  ) : (
                    <div className="table-wrapper" style={{ width: "90%" }}>
                      <div className="row table-heading" style={{ width: "90%" }}>
                        <table>
                          <thead>
                            <tr>
                              <th className='fs-3'>Store Manage</th>
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
                                <th>Action</th>
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

                                    <td>
                                      <span className="d-flex justify-content-center">
                                        <Link>
                                          <Link to={"/storeEdit/" + details.id}><MdModeEdit style={{ marginRight: "10px" }} /></Link>
                                        </Link>
                                        <Link>
                                          <MdDelete onClick={() => deleteData(details.id)} className='text-danger' />
                                        </Link>
                                      </span>
                                    </td>
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

export default StoreManage;