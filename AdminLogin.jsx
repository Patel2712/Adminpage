import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, InputGroup } from 'react-bootstrap';
import './css/Admin.css';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';


export default function AdminLogin() {

    const [rememberme, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({
        admin_username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required").min(8, "Password must be 8 0r more characters")
            .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
        rememberme: Yup.boolean(),
    });
    const formik = useFormik({
        initialValues: {
            admin_username: '',
            password: '',
            rememberme: false,
        },
        validationSchema: validateSchema,
        onSubmit: async (data, { resetForm }) => {
            try {
                let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=login", {
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
                    if (result.error === false && result.message === "Login successfull") {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login Successfull",
                            showConfirmButton: false,
                            timer: 2500,
                            didClose: () => {
                                console.log("AdminLogin", result);
                                localStorage.setItem('adminLogin', JSON.stringify(result));
                                navigate('/adminHome');
                            }
                        });
                    } else if (result.error === true && result.message === "Invalid username or password") {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Invalid username or password',     //by default ok button will come                        
                        });
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Error',
                            text: 'An error occurred during login.'
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred during login.',
                });
                console.log("Error", error.result.data)
            }
        },
    });

    return (

        <div className='bg'>
            <Container className="justify-content-center align-items-center parent">
                <Row>
                    <Col xs className='info1'>
                        <p className='fs-1 fw-bold text-center m-0' style={{ fontFamily: "cursive" }}>Grace Ads</p>
                        <p className='fs-4 fw-bold text-center text-primary-emphasis'>Admin Login</p>
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="admin_username"
                                    id="admin_username"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.admin_username}
                                    onChange={formik.handleChange}
                                    className={formik.touched.admin_username && formik.errors.admin_username ? "form-control is-invalid" : "form-control"}
                                    placeholder="Username"></Form.Control>
                                <p>{formik.touched.admin_username && formik.errors.admin_username ?
                                    (<Form.Text className='text-danger'>{formik.errors.admin_username}</Form.Text>) : null}</p>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        className={formik.touched.password && formik.errors.password ? "form-control is-invalid" : "form-control"}
                                        placeholder='Password'>
                                    </Form.Control>
                                    <InputGroup.Text onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </InputGroup.Text>
                                </InputGroup>
                                <p>{formik.touched.password && formik.errors.password ?
                                    (<Form.Text className='text-danger'>{formik.errors.password}</Form.Text>) : null}</p>
                            </Form.Group>

                            <div>
                                <div className="form-check" style={{ fontSize: "12px", textAlign: "left" }}>
                                    <input className="form-check-input" id="checkbox" name="rememberMe" type="checkbox" checked={rememberme} onChange={() => setRememberMe(!rememberme)} />
                                    <label htmlFor='checkbox'>Remember me?</label>
                                    <span style={{ fontSize: "11px", marginLeft: "130px" }}>
                                        <Link to="/changePassword" className='links'>Forget your Password?</Link>
                                    </span>
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" className='mb-2 mt-2'>LOGIN</Button>
                            </div>

                            <Form.Group>
                                <p className="mb-3 text-center">Don't have a account? <Link to="/adminRegister" className='links'>Register</Link></p>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </Container >
        </div>

    )
}
