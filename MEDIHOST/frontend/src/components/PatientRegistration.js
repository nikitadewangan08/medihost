import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useRef } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast} from 'react-toastify';

const PatientRegistration = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: "onChange" });
    const password = useRef({});
    password.current = watch("password", "");
    const [cityOptions, setCityOptions] = useState([]);
    const effectCalled = useRef(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    React.useEffect(() => {
        if (!effectCalled.current) {
            ApiService.getOptions(1).then(resp => {
                console.log(resp.data);

                setCityOptions(['Select City',
                    ...resp.data
                ])
            })
            effectCalled.current = true;
        }
    });

    const submitHandler = (data) => {
        console.log(JSON.stringify(data));
        ApiService.registerPatient(data)
            .then(resp=>{
                console.log("resp status" + resp.status);
                if(resp.status == 201){
                    console.log(resp.data);
                    navigate('/login', { state: { message: resp.data } });
                }
                else{
                    toast.error(resp.data, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }).catch(err => {
                console.log(err);
                toast.error(err.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    }  

    return (
        <>
        <form onSubmit={handleSubmit(submitHandler)} method="post" className="needs-validation" noValidate autoComplete="off">
            <p>Please fill in this form to create an account!</p>
            <hr />
            <div className="form-group">
                <div className="row">
                    {/* <div className="col position-relative">
                        <input type="text" className={classNames("form-control",{"is-invalid": errors.pid})} name="pid" placeholder="Patient ID" 
                        {...register('pid', { 
                            required: "Please enter a patient ID.",
                            pattern: {
                                value: /^\d{1,5}$/, 
                                message: "Should be 1 to 5 digits only."
                            }
                        })}/> 
                        {errors.pid && <div className="invalid-tooltip">{errors.pid.message}</div>}
                    </div> */}
                    <div className="col position-relative">
                        <input type="text" className={classNames("form-control",{"is-invalid": errors.patientName})} name="patientName" placeholder="Patient Name" 
                        {...register('patientName', { 
                            required: "Please enter your full name.",
                            minLength: {
                                value: 3,
                                message: "Should be at least 3 characters"
                            },
                            pattern: {
                                value: /^(?![\. ])[a-zA-Z\. ]+(?<! )$/,
                                message: "Invalid name."
                            }
                        })}
                        />
                        {errors.patientName && <div className="invalid-tooltip">{errors.patientName.message}</div>}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="col position-relative">
                    <input type="email" className={classNames("form-control",{"is-invalid": errors.email})}  name="email" placeholder="Email"
                        {...register('email', { 
                                required: "Please enter your email.",
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Invalid email."
                                }
                            }
                        )}
                    />
                    {errors.email && <div className="invalid-tooltip">{errors.email.message}</div>}
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col position-relative">
                        <input type="password" className={classNames("form-control",{"is-invalid": errors.password})} name="password" placeholder="Password" 
                            {...register('password', { 
                                    required: "Please enter your password.",
                                    minLength: {
                                        value: 8,
                                        message: "Should be at least 8 characters."
                                    }
                                }
                            )}
                        />
                        {errors.password && <div className="invalid-tooltip">{errors.password.message}</div>}
                    </div>
                    <div className="col position-relative mt-4">
                        <input type="password" className={classNames("form-control",{"is-invalid": errors.confirm_password})} name="confirm_password" placeholder="Confirm Password" 
                            {...register('confirm_password', {
                                validate: value =>
                                    value === password.current || "The passwords do not match."
                                }
                            )}
                        />
                        {errors.confirm_password && <div className="invalid-tooltip">{errors.confirm_password.message}</div>}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="col position-relative">
                    <input type="text" className={classNames("form-control",{"is-invalid": errors.patientMobileNo})} name="patientMobileNo" placeholder="Mobile" 
                        {...register('patientMobileNo', { 
                                required: "Please enter your mobile.",
                                pattern: {
                                    value: /^[789]\d{9}$/,
                                    message: "Invalid mobile number."
                                }
                            }
                        )}
                    />
                    {errors.patientMobileNo && <div className="invalid-tooltip">{errors.patientMobileNo.message}</div>}
                </div>
            </div>
            <div className="form-group">
                <div className="col position-relative">
                    <input type="text" className={classNames("form-control",{"is-invalid": errors.patientAadharNo})} name="patientAadharNo" placeholder="Aadhaar" 
                        {...register('patientAadharNo', { 
                                required: "Please enter your aadhaar.",
                                pattern: {
                                    value: /^\d{12}$/,
                                    message: "Invalid aadhaar number."
                                }
                            }
                        )}
                    />
                    {errors.patientAadharNo && <div className="invalid-tooltip">{errors.patientAadharNo.message}</div>}
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col position-relative">
                        <input type="text" className={classNames("form-control",{"is-invalid": errors.patientAddress})} name="patientAddress" placeholder="Address" 
                            {...register('patientAddress', { 
                                    required: "Please enter your address.",
                                    minLength: {
                                        value: 10,
                                        message: "Should be at least 10 characters."
                                    }
                                }
                            )}
                        />
                        {errors.patientAddress && <div className="invalid-tooltip">{errors.patientAddress.message}</div>}
                    </div>
                    <div className="col-4 position-relative mt-4">
                        <select className="form-select" aria-label="Default select example" name="patientCity"
                            {...register('patientCity', {
                                required: "Please select your city.",
                            }
                            )}>
                            {cityOptions.map((cityOption) => {
                                return (
                                    <option key={cityOption} value={cityOption}>
                                        {cityOption}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group position-relative">
                <input type="text" className={classNames("form-control",{"is-invalid": errors.patientDob})} name="patientDob" placeholder="Date of birth in yyyy-MM-dd" 
                    {...register('patientDob', { 
                            required: "Please enter your date of birth.",
                            validate: value => new Date(value) < new Date() || "Future dates can't be registered",
                            pattern: {
                                value: /^([0-9]{4}|[0-9]{2})[./-]([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]{1}|[1|2][0-9]|[3][0|1])$/,
                                message: "Invalid date of birth."
                            }
                        }
                    )}
                />
                {errors.patientDob && <div className="invalid-tooltip">{errors.patientDob.message}</div>}
            </div>
            <div className="form-group">
                <label className="form-check-label">
                    <input type="checkbox" className={classNames("form-check-input", {"is-invalid": errors.tnc})} name="tnc"
                        {...register('tnc', { 
                                required: "Please agree to the terms and conditions."
                            }
                        )} 
                    /> I hereby declare that the above information is true to the best of my knowledge.
                </label>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg text-dark">Sign Up</button>
            </div>
        </form>
        <ToastContainer />
        </>
    )
}

export default PatientRegistration