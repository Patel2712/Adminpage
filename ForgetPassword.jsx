import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, InputGroup } from 'react-bootstrap';
import './css/Admin.css';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Swal from 'sweetalert2';

export default function ForgetPassword() {


  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateSchema = Yup.object().shape({
    admin_username: Yup.string().required("Username is required"),
    old_password: Yup.string().required("Old Password is required")
      .min(8, "Password must be 8 0r more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    new_password: Yup.string()
      .required("New Password is required")
      .notOneOf([Yup.ref("old_password")], "New Password must be different from Old Password")
      .min(8, "Password must be 8 0r more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
  });


  const formik = useFormik({
    initialValues: {
      admin_username: "",
      old_password: "",
      new_password: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (data) => {
      try {
        let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=admin_change_password", {
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
          console.log(result)
          if (result.error === false && result.message === "Password changed successfully") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Password Changed Successfull",
              showConfirmButton: false,
              timer: 2500,
              didClose: () => {
                console.log("PasswordChange", result)
                navigate('/')
              }
            });
          } else if (result.error === true && result.message === "Incorrect old password") {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Invalid old password',
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error',
              text: 'An error occurred in changing password.'
            });
          }
        }
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'An error occurred in changing password.'
        });
        console.error("Error", error.result.data);
      }
    },
  });



  return (
    <div className='bg'>
      <Container className="justify-content-center align-items-center parent">
        <Row>
          <Col xs className='info1'>
            <p className='fs-1 fw-bold text-center m-0' style={{ fontFamily: "cursive" }}>Grace Ads</p>
            <p className='fs-4 fw-bold text-center text-primary-emphasis'>Change Password</p>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="admin_username"
                  id="admin_username"
                  placeholder="Username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.admin_username}
                  className={formik.touched.admin_username && formik.errors.admin_username ? "form-control is-invalid" : "form-control"}
                >
                </Form.Control>
                <p>{formik.touched.admin_username && formik.errors.admin_username ? (
                  <Form.Text className="text-danger">{formik.errors.admin_username}</Form.Text>
                ) : null}</p>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Old Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showOldPassword ? 'text' : 'password'}
                    name="old_password"
                    id="old_password"
                    placeholder='Old Password'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={formik.touched.old_password && formik.errors.old_password ? "form-control is-invalid" : "form-control"}
                    value={formik.values.old_password}>
                  </Form.Control>
                  <InputGroup.Text onClick={() => setOldShowPassword((prev) => !prev)}>
                    {showOldPassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
                <p>{formik.touched.old_password && formik.errors.old_password ? (
                  <Form.Text className="text-danger">{formik.errors.old_password}</Form.Text>
                ) : null}</p>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showNewPassword ? 'text' : 'password'}
                    name="new_password"
                    id="new_password"
                    placeholder='New Password'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={formik.touched.new_password && formik.errors.new_password ? "form-control is-invalid" : "form-control"}
                    value={formik.values.new_password}>
                  </Form.Control>
                  <InputGroup.Text onClick={() => setNewShowPassword((prev) => !prev)}>
                    {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
                <p>{formik.touched.new_password && formik.errors.new_password ? (
                  <Form.Text className="text-danger">{formik.errors.new_password}</Form.Text>
                ) : null}</p>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className='mb-2 mt-2'>Change Password</Button>
              </div>

            </Form>
          </Col>
        </Row>
      </Container >
    </div >
  )
}
