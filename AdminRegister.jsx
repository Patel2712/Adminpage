import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './css/Admin.css';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateSchema = Yup.object().shape({
        admin_username: Yup.string().required("Username is required"),
        email: Yup.string().email("Please enter a valid email").required("Email is required"),
        password: Yup.string().required("Password is required").min(8, "Password must be 8 0r more characters").matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
        confirmPassword: Yup.string().when("password", (password, field) => {
            if (password) {
                return field.required("Confirm Password is required").oneOf([Yup.ref("password")], "Passwords do not match");
            }
        }),
        phoneno: Yup.string().required('Phone number is required')
            .matches(/^[0-9]{10}$/, 'Phone number is not valid'),
        acceptTerms: Yup.boolean().oneOf([true], 'You must accept all terms and conditions'),
    });

    const formik = useFormik({
        initialValues: {
            admin_username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneno: "",
            acceptTerms: false,
        },
        validationSchema: validateSchema,
        onSubmit: async (data, { resetForm }) => {
            try {
                let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=register", {
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
                    console.log("AdminRegister", result)
                    if (result.error === false && result.message === 'User registered successfully') {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Admin registered successfully',
                            showConfirmButton: false,
                            timer: 2500,
                            didClose: () => {
                                navigate('/');
                                const recipientEmail = result.user.email; // Replace with recipient's email
                                const subject = 'Registration Confirmation';
                                const body = 'Thank you for registering.';

                                const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                                window.location.href = mailtoLink;
                            }
                        });
                    } else if (result.error === true && result.message === 'User already registered') {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Admin already registered',
                            showConfirmButton: true,
                            didClose: () => {
                                resetForm();
                            }
                        });
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Error',
                            text: 'An error occurred during registration.'
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred during registration.',
                });
                console.error("Error", error.result.data);
            }
        },
    });

    return (
        <div className='bg parent1'>
            <Container className="justify-content-center align-items-center parent">
                <Row>
                    <Col xs className='info1 info2'>
                        <p className='fs-1 fw-bold text-center m-0' style={{ fontFamily: "cursive" }}>Grace Ads</p>
                        <p className='fs-4 fw-bold text-center text-primary-emphasis'>Admin Registration</p>
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            {/* <Form> */}
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="admin_username"
                                    id="admin_username"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.admin_username}
                                    // onChange={(e) => setAdminUsername(e.target.value)}
                                    // value={admin_username}
                                    placeholder='Name'
                                    className={formik.touched.admin_username && formik.errors.admin_username ? "form-control is-invalid" : "form-control"}
                                />
                                <p>{formik.touched.admin_username && formik.errors.admin_username ? (
                                    <Form.Text className="text-danger">{formik.errors.admin_username}</Form.Text>
                                ) : null}</p>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    id="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    // value={email}
                                    placeholder='Email'
                                    className={formik.touched.email && formik.errors.email ? "form-control is-invalid" : "form-control"}

                                />
                                <p>{formik.touched.email && formik.errors.email ? (
                                    <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
                                ) : null}</p>
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col} md="6" className='ps-0'>
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            id="password "
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            placeholder='Password'
                                            className={formik.touched.password && formik.errors.password ? "form-control is-invalid" : "form-control"}
                                        />
                                        <InputGroup.Text onClick={() => setShowPassword((prev) => !prev)}>
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </InputGroup.Text>
                                    </InputGroup>
                                    <p> {formik.touched.password && formik.errors.password ? (
                                        <Form.Text className="text-danger">{formik.errors.password}</Form.Text>
                                    ) : null}</p>
                                </Form.Group>

                                <Form.Group as={Col} md="6" className='pe-0'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.confirmPassword}
                                            placeholder='Confirm Password'
                                            className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "form-control is-invalid" : "form-control"}
                                        />
                                        <InputGroup.Text onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                        </InputGroup.Text>
                                    </InputGroup>
                                    <p>{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <Form.Text className="text-danger">{formik.errors.confirmPassword}</Form.Text>
                                    ) : null}</p>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="phoneno"
                                    id="phoneno"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.phoneno}
                                    // onChange={(e) => setPhoneno(e.target.value)}
                                    // value={phoneno}
                                    placeholder='Phone Number'
                                    className={formik.touched.phoneno && formik.errors.phoneno ? "form-control is-invalid" : "form-control"}

                                />
                                <p>{formik.touched.phoneno && formik.errors.phoneno ? (
                                    <Form.Text className="text-danger">{formik.errors.phoneno}</Form.Text>
                                ) : null}</p>
                            </Form.Group>

                            <div>
                                <div className="form-check" style={{ fontSize: "12px", textAlign: "left" }}>
                                    <input
                                        className={`form-check-input ${formik.touched.acceptTerms && formik.errors.acceptTerms ? "is-invalid" : ""}`}
                                        type="checkbox"
                                        id="checkbox"
                                        name="acceptTerms"
                                        checked={formik.values.acceptTerms}
                                        onChange={formik.handleChange} />
                                    <label htmlFor='checkbox'>I accept the terms and conditions</label>
                                    <p>{formik.touched.acceptTerms && formik.errors.acceptTerms ?
                                        (<Form.Text className='text-danger'>{formik.errors.acceptTerms}</Form.Text>) : null}</p>
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" className='mb-2 mt-2'>
                                    Register
                                </Button>
                            </div>

                            <Form.Group >
                                <p className="mb-3 text-center">Already have an account? <Link to="/" className='links'>Login</Link></p>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </div>
    );
};

export default AdminRegister;
