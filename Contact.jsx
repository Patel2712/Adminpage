import React, { useEffect, useState } from 'react'
import './css/StoreManage.css'
import AdminSidebar from './AdminSidebar';


function Contact() {

  const [data, fetchdata] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    contactUs()
  }, []);


  async function contactUs() {
    try {
      let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchcontact");

      if (!result.ok) {
        console.log("Failed to fetch. Status:", result.status);
      } else {
        result = await result.json();
        console.log(result)
        if (result.error === false && result.message === "Data Fetch successful") {
          console.log("ContactFetch", result)
          fetchdata(result.details)
          setLoading(false)
        }
        else if (result.error === true && result.message === "No data found for the given admin_id") {
          alert(result.message)
        }
      }
    } catch (error) {
      console.log("Error", error.result.data)
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
                  
                    <div className="table-wrapper" style={{ width: "75%" }}>
                      <div className="row table-heading">
                        <table>
                          <thead>
                            <tr>
                              <th className='fs-3'>Contact</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div className="row table-data">
                        <table>
                          <thead>
                            <tr>
                              <th>Sr.no.</th>
                              <th>Id</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Subject</th>
                              <th>Message</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              data.map((details, index) =>(
                                <tr key={details.id}>
                                  <td>{index + 1}</td>
                                  <td>{details.id}</td>
                                  <td>{details.name}</td>
                                  <td>{details.email}</td>
                                  <td>{details.subject}</td>
                                  <td>{details.message}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
              </div>
            </AdminSidebar>
          </div>
        </div>
      </div >
    </>

  )
}

export default Contact;