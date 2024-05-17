import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import './css/Admin.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function StoreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id)
  const [formData, setFormData] = useState({
    admin_id: "",
    store_username: '',
    store_password: '',
    owner_name: '',
    store_name: '',
    store_phone: '',
    email: '',
    opening_time: '',
    closing_time: '',
    owner_phone: '',
    store_start_date: '',
    address: '',
    gst_no: '',
    hsn_sac: '',
    status: '1',
    additionalData: [],
  });
  console.log("formdata", formData)
  const [store_license_doc, setStoreLicenseDoc] = useState(null)
  const [owner_doc, setOwnerDoc] = useState(null)
  const [store_image, setStoreImage] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const styles = {
    resize: "none"
  };

  useEffect(() => {
    editData();
  }, []);

  const handleFileChange = (event, setFile, fieldName) => {
    const file = event.target.files[0];
    if (!file) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: `Please select a file for ${fieldName}`
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: null
      }));
      setFile(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.owner_name) {
      newErrors.owner_name = "Owner name is required";
    }

    if (!formData.owner_phone) {
      newErrors.owner_phone = "Owner phone is required";
    } else if (!/^\d{10}$/.test(formData.owner_phone)) {
      newErrors.owner_phone = "Owner phone must be a 10-digit number";
    }

    if (!formData.store_username) {
      newErrors.store_username = "Store Username is required";
    }

    if (!formData.store_name) {
      newErrors.store_name = "Store name is required";
    }

    if (!formData.store_phone) {
      newErrors.store_phone = "Store phone Number is required";
    } else if (!/^\d{10}$/.test(formData.store_phone)) {
      newErrors.store_phone = "Store phone must be a 10-digit number";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.store_start_date) {
      newErrors.store_start_date = "Store start date is required";
    }

    if (!formData.opening_time) {
      newErrors.opening_time = "Opening time is required";
    }

    if (!formData.closing_time) {
      newErrors.closing_time = "Closing time is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    if (!formData.gst_no) {
      newErrors.gst_no = "GST number is required";
    } else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(formData.gst_no)) {
      newErrors.gst_no = "Invalid GST number format";
    }

    if (!formData.store_password) {
      newErrors.store_password = "Store password is required";
    } else if (formData.store_password.length < 8) {
      newErrors.store_password = "Password must be at least 8 characters long";
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(formData.store_password)) {
      newErrors.store_password = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    if (!store_license_doc) {
      newErrors.store_license_doc = "Store license document is required";
    }

    if (!owner_doc) {
      newErrors.owner_doc = "Owner document is required";
    }

    if (!store_image) {
      newErrors.store_image = "Store image is required";
    }

    // if (!formData.status) {
    //     newErrors.status = "Status is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (validateForm()) {
    //   const data = new FormData();
    //   Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    //   data.append('store_license_doc', store_license_doc);
    //   data.append('owner_doc', owner_doc);
    //   data.append('store_image', store_image);

    //   data.append('action', 'addstore');

    //   console.log(data);
    //   try {
    //     let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=updatestoreid", {
    //       method: 'POST',
    //       body: data
    //     });

    //     if (!result.ok) {
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'error',
    //         title: 'Failed to fetch',
    //         text: `Status: ${result.status}`,
    //       });
    //       console.log("Failed to fetch. Status:", result.status);
    //     } else {
    //       result = await result.json();
    //       if (result.error === false) {
    //         Swal.fire({
    //           position: 'center',
    //           icon: 'success',
    //           title: 'Store Updated successfully',
    //           showConfirmButton: false,
    //           timer: 2500,
    //           didClose: () => {
    //             navigate('/storeManage')
    //             console.log("storeUpdate", result.details)
    //           }
    //         });
    //         console.log("StoreRegister", result)
    //       } else if (result.error === true) {
    //         Swal.fire({
    //           position: 'center',
    //           icon: 'error',
    //           title: 'Error',
    //           text: 'An error occurred during updating.'
    //         });
    //       } else {
    //         Swal.fire({
    //           position: 'center',
    //           icon: 'error',
    //           title: 'Error',
    //           text: 'An error occurred during updating.'
    //         });
    //       }
    //     }
    //   } catch (error) {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       title: 'Error',
    //       text: 'An error occurred during updating.',
    //     });
    //     console.error("Error", error);
    //   }
    // }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Updated Successfilly',
      timer:3000,
  });
  }

  async function editData() {
    try {
      let data = { id };
      let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchstoreid", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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
        if (result.error === false) {

          const fetchData = result.details
          setFormData(fetchData);
          console.log("fetchData", fetchData)
        } else if (result.error === true) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: 'An error occurred'
          });
          console.log(result.message)
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: 'An error occurred.'
          });
        }
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'An error occurred.',
      });
      console.error("Error", error);
    }
  }

  console.log("formdata", formData)

  // async function updateData() {
  //   try {
  //     let data = { id }
  //     let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategoryupdate", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!result.ok) {
  //       throw new Error(`HTTP error! Status: ${result.status}`);
  //     } else {
  //       result = await result.json();
  //       if (result.error === false && result.message === "Update operation successful") {
  //         console.log("StoreCategoryUpdate", result);
  //         alert(result.message);
  //         navigate('/storeCategoryFetch');
  //       } else {
  //         alert("not updated");
  //       }
  //     }  } catch (error) {
  //       console.error("Error updating data:", error);
  //       alert("Error updating data. Please try again.");
  //     }
  //   }

  return (
    <div>
      <div className="container-fluid" style={{ overflow: "hidden" }}>
        <div className="row">
          <div className="col-12 scroll" >
            <AdminSidebar>
              <div className="row" style={{ overflowX: "auto" }}>
                <div className="justify-content-center align-items-center parent3 py-5">
                  <Form noValidate onSubmit={handleSubmit} className='text-center justify-content-center align-items-center info3'>



                    <div className='name fs-2 fw-bold'>Store Edit</div>
                    <div className='inputs'>

                      <Row>
                        <Form.Group as={Col} md="6" className="mb-3 ps-0">
                          <Form.Label className='form-adjust'>Owner Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder='Owner name'
                            value={formData.owner_name}
                            onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                            required
                          />
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3 pe-0">
                          <Form.Label className='form-adjust'>Owner Phone</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder='Owner Phone'
                            defaultValue={formData.owner_phone}
                            onChange={(e) => setFormData({ ...formData, owner_phone: e.target.value })}
                            isInvalid={!!errors.owner_phone}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.owner_phone}</Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} md="6" className="mb-3 ps-0">
                          <Form.Label className='form-adjust'>Store Username</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder='Store Username'
                            defaultValue={formData.store_username}
                            onChange={(e) => setFormData({ ...formData, store_username: e.target.value })}
                            isInvalid={!!errors.store_username}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.store_username}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3 pe-0">
                          <Form.Label className='form-adjust'>Store Password</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              placeholder='Store Password'
                              defaultValue={formData.store_password}
                              onChange={(e) => setFormData({ ...formData, store_password: e.target.value })}
                              isInvalid={!!errors.store_password}
                              required>
                            </Form.Control>
                            <InputGroup.Text onClick={() => setShowPassword((prev) => !prev)}>
                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid" className='text-start'>{errors.store_password}</Form.Control.Feedback>

                          </InputGroup>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} md="6" className="mb-3 ps-0">
                          <Form.Label className='form-adjust'>Store Phone</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder='Store Phone'
                            defaultValue={formData.store_phone}
                            onChange={(e) => setFormData({ ...formData, store_phone: e.target.value })}
                            isInvalid={!!errors.store_phone}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.store_phone}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3 pe-0">
                          <Form.Label className='form-adjust'>Store Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder='Store Name'
                            defaultValue={formData.store_name}
                            onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                            isInvalid={!!errors.store_name}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.store_name}</Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} md="6" className="mb-3 ps-0">
                          <Form.Label className='form-adjust'>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder='Email'
                            defaultValue={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            isInvalid={!!errors.email}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3 pe-0">
                          <Form.Label className='form-adjust'>Store Start data</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder='Store start date'
                            defaultValue={formData.store_start_date}
                            onChange={(e) => setFormData({ ...formData, store_start_date: e.target.value })}
                            isInvalid={!!errors.store_start_date}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.store_start_date}</Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} md="6" className="mb-3 ps-0">
                          <Form.Label className='form-adjust'>Store Opening Time</Form.Label>
                          <Form.Control
                            type="time"
                            placeholder='Opening Time'
                            defaultValue={formData.opening_time}
                            onChange={(e) => setFormData({ ...formData, opening_time: e.target.value })}
                            isInvalid={!!errors.opening_time}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.opening_time}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3 pe-0">
                          <Form.Label className='form-adjust'>Store Closing Time</Form.Label>
                          <Form.Control
                            type="time"
                            placeholder='Closing Time'
                            defaultValue={formData.closing_time}
                            onChange={(e) => setFormData({ ...formData, closing_time: e.target.value })}
                            isInvalid={!!errors.closing_time}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.closing_time}</Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} md="6" className="mb-3 ps-0">
                          <Form.Label className='form-adjust'>Store License Doc</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(e) => handleFileChange(e, setStoreLicenseDoc, 'Store Licence Document')}
                            isInvalid={!!errors.store_license_doc}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.store_license_doc}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3 pe-0">
                          <Form.Label className='form-adjust'>Owner Doc</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(e) => handleFileChange(e, setOwnerDoc, 'Owner Document')}
                            isInvalid={!!errors.owner_doc}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.owner_doc}</Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} md="6" className="mb-3 ps-0">
                          <Form.Label className='form-adjust'>Store Image</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(e) => handleFileChange(e, setStoreImage, "Store Image")}
                            isInvalid={!!errors.store_image}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.store_image}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3 pe-0">
                          <Form.Label className='form-adjust'>Gst No</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder='Store Gst no'
                            defaultValue={formData.gst_no}
                            onChange={(e) => setFormData({ ...formData, gst_no: e.target.value })}
                            isInvalid={!!errors.gst_no}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.gst_no}</Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} md="12" className="mb-3 ps-0">
                          <Form.Label className='form-adjust'>Hsn Sac</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder='Store hsn sac'
                            defaultValue={formData.hsn_sac}
                            onChange={(e) => setFormData({ ...formData, hsn_sac: e.target.value })}
                            isInvalid={!!errors.hsn_sac}
                            required>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" className='text-start'>{errors.hsn_sac}</Form.Control.Feedback>
                        </Form.Group>

                        {/* <Form.Group as={Col} md="6" className="mb-3 pe-0">
                                                    <Form.Label className='form-adjust'>Status</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        value="active"
                                                        value={formData.status}
                                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                        isInvalid={!!errors.status}
                                                        disabled readOnly >
                                                        <option value="">Select Status</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Deactive">Deactive</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid" className='text-start'>{errors.status}</Form.Control.Feedback>
                                                </Form.Group> */}
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label className='form-adjust'>Store Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          style={styles}
                          rows={3}
                          placeholder='Store Address'
                          defaultValue={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          isInvalid={!!errors.address}
                          required>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid" className='text-start'>{errors.address}</Form.Control.Feedback>
                      </Form.Group>

                      <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">Update</Button>
                      </div>
                    </div>

                  </Form>
                </div>
              </div>
            </AdminSidebar>
          </div>
        </div >
      </div >
    </div >
  )
}