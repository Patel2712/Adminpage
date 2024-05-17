import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import './css/StoreManage.css'
import AdminSidebar from './AdminSidebar';
import { FaCircleExclamation } from "react-icons/fa6";
import Swal from 'sweetalert2';

function Clients() {

  const [data, fetchdata] = useState([]);
  const [loading, setLoading] = useState(false)
  const users = JSON.parse(localStorage.getItem('adminLogin'));
  const admin_id = users.user.id;
  // console.log(admin_id);

  useEffect(() => {
    setLoading(true)
    ClientsFetch()
  }, []);


  async function ClientsFetch() {
    try {

      let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=allfetchuser");

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
          console.log("ClientsFetch", result)
          fetchdata(result.details)
          setLoading(false)
        }
        else if (result.error === true) {
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
                        <h1 style={{ margin: "10px 0" }}>Clients Information not found</h1>
                      </div>
                    </div>
                  ) : (
                    <div className="table-wrapper" style={{ width: "75%" }}>
                      <div className="row table-heading">
                        <table>
                          <thead>
                            <tr>
                              <th className='fs-3'>Clients</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div className="row table-data">
                        <table>
                          <thead>
                            <tr>
                              <th>Sr.no</th>
                              <th>Id</th>
                              <th>Name</th>
                              <th>Address</th>
                              <th>Phone Number</th>
                              <th>Email</th>
                              <th>DateTime</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              data.map((details, index) => (
                                <tr key={details.id}>
                                  <td>{index + 1}</td>
                                  <td>{details.id}</td>
                                  <td>{details.name}</td>
                                  <td>{details.address}</td>
                                  <td>{details.phoneno}</td>
                                  <td>{details.email}</td>
                                  <td>{details.datetime}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
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

export default Clients;