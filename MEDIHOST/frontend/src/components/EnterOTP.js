// import React from "react";
// import { Card, CardBody } from "reactstrap";
// //import 'bootstrap/dist/css/bootstrap.css';
// import { Button, Input, Label } from 'reactstrap';
// import './resetpassword.css';
// import Navbar from 'react-bootstrap/Navbar';
// //import Navbar from './Navbar';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import ApiService from "../services/ApiService";
// import { useNavigate } from "react-router-dom";
// import ResetPassword  from "./ResetPassword";

// const EnterOTP = () => {

//     const navigate = useNavigate();

//     const otpEntered = () => {
//         ApiService.processValidateOTP()
//         .then(resp => {
//             navigate('/resetPassword');
//             toast.error("OTP verified successfully", {
//                 position: toast.POSITION.TOP_RIGHT
//               });
//         })
//         .catch(err => {
//             toast.error(err.response.message, {
//             position: toast.POSITION.TOP_RIGHT
//           });

//         })
//     }

//     const emailEntered = () => {
//         navigate('/forgotPassword');
//     }

//     return (
//         <>

//         <Router>
   
//         <Navbar/>
//         <Routes>
//         <Route path="/resetPassword" element={<ResetPassword/>} />
//         </Routes>  
//       </ Router>
        
//         <ToastContainer />

//         </>
//     );
// }

// export default EnterOTP;