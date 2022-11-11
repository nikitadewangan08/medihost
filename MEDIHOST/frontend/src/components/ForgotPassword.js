import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Button, Input, Label } from 'reactstrap';
import './resetpassword.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import ApiService from "../services/ApiService";
import { ToastContainer, toast } from 'react-toastify';
import EnterOTP from "./EnterOTP";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [otp, setOTP] = useState(null);
    const [password, setPassword] = useState(null);
    const [showOTP, setShowOTP] = useState(true);
    const [showReset, setShowReset] = useState(true);
    const [errormsg, setErrorMsg] = useState(null);

    // const navigate = useNavigate();
    function emailEntered() {

        console.log("email = " + email);
        let dto = {"email" : email};
        ApiService.processForgotPassword(dto)
            .then(resp => {
                if (resp.data === "Verification OTP sent to the given email address") {
                    // navigate('/enterOTP');
                   // history.push("/enterOTP");
                   setShowOTP(false);
                    toast.success("OTP has been sent to the registered email id", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
            .catch((e) => {
                setShowOTP(true);
                toast.error(e.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            })
    }

    function otpEntered() {

        console.log("otp = " + otp);
        
        ApiService.processValidateOTP(otp)
            .then(resp => {
                if (resp.data === "OTP Verified Successfully") {
                    // navigate('/enterOTP');
                   // history.push("/enterOTP");
                   setShowReset(false);
                    toast.success("OTP verified", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
            .catch((e) => {
                console.log(e);
                setShowReset(true);
                toast.error(e.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            })
    }

    function processResetPassword() {

       let resetpassword = {"email" : email,  "password" : password};
        
        ApiService.processResetPassword(resetpassword)
            .then(resp => {
                if (resp.data === "password updated successfully") {
                    navigate('/login', {state: {message : "Password updated successfully. Please login."}});
                }
            })
            .catch((e) => {
                toast.error(e.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            })
    }

    function checkConfirmPassword(e){
        if(e.target.value === password){
            setErrorMsg(null);
        }
        else{
            setErrorMsg("Password not matching");
        }
    }

    return (
        <>
        <div>
            <div className="passwordcontainer mt-5">
                <Card className="text-center p-3">
                <CardTitle className="p-3" tag="h5">Update Password</CardTitle>
                    <CardBody>
                        {/* <Label for="email" className="text-align-left">
                            Enter your Registered Mail Id :
                        </Label> */}
                        <div className="d-flex justify-content-center">
                            <Input id="email" name="email" placeholder="Enter Email" type="email" onChange={e => setEmail(e.target.value)} />
                            <Button className="mx-4" color="secondary" onClick={emailEntered}>Submit</Button>
                        </div>  

                        <div className="mt-5 d-flex justify-content-center">
                            <Input disabled={showOTP} id="otp" name="otp" placeholder="Enter OTP" type="text" onChange={e => setOTP(e.target.value)} />
                        
                            <Button disabled={showOTP} className="mx-4" color="secondary" onClick={otpEntered}>Submit</Button>    
                        </div>
                        { showOTP ? "" : <a className="justify-content-center"onClick={emailEntered} href="#">Resend OTP</a>    }

                        <hr className="mt-5"/>
                        
                        <div style={{marginLeft:"19vh"}}>
                            <Input className="mt-5 mb-3" disabled={showReset} id="password" name="password" placeholder="Enter Password" type="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-5 d-flex justify-content-center">
                            <Input disabled={showReset} id="cpassword" name="cpassword" placeholder="Confirm Password" type="cpassword" onChange={checkConfirmPassword} />
                            <div style={{color:"red"}}>{errormsg != null ? errormsg : ""}</div>
                            <Button disabled={showReset} className="mx-4" color="secondary" onClick={processResetPassword}>Submit</Button>
                        </div> 

                        </CardBody>


                </Card>
            </div>

 
</div>
                        <ToastContainer/>
        </>
    );
}

export default ForgotPassword;



