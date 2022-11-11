import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useRef } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast} from 'react-toastify';

const DoctorRegistration = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: "onChange" });
    const password = useRef({});
    password.current = watch("password", "");
    const [cityOptions, setCityOptions] = useState([]);
    const [specialityOptions, setSpecialityOptions] = useState([]);
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
            ApiService.getOptions(2).then(resp => {
                console.log(resp.data);

                setSpecialityOptions(['Select Speciality',
                    ...resp.data
                ])
            })
            effectCalled.current = true;
        }

    });

    const submitHandler = (data) => {
        console.log(JSON.stringify(data));
        ApiService.registerDoctor(data)
            .then(resp => {
                console.log("resp status" + resp.status);
                if(resp.status == 200){
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
                        <input type="text" className={classNames("form-control",{"is-invalid": errors.did})} name="did" placeholder="Doctor ID" 
                        {...register('did', { 
                            required: "Please enter a doctor ID.",
                            pattern: {
                                value: /^\d{1,5}$/, 
                                message: "Should be 1 to 5 digits only."
                            }
                        })}/> 
                        {errors.did && <div className="invalid-tooltip">{errors.did.message}</div>}
                    </div> */}
                    <div className="col position-relative">
                        <input type="text" className={classNames("form-control", { "is-invalid": errors.doctorName })} name="doctorName" placeholder="Doctor Name"
                            {...register('doctorName', {
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
                        {errors.doctorName && <div className="invalid-tooltip">{errors.doctorName.message}</div>}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="col position-relative">
                    <input disabled={false} type="email" className={classNames("form-control", { "is-invalid": errors.email })} name="email" placeholder="Email"
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
                        <input type="password" className={classNames("form-control", { "is-invalid": errors.password })} name="password" placeholder="Password"
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
                    <div className="col position-relative mt-3">
                        <input type="password" className={classNames("form-control", { "is-invalid": errors.confirm_password })} name="confirm_password" placeholder="Confirm Password"
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
                    <input type="text" className={classNames("form-control", { "is-invalid": errors.doctorMobileNo })} name="doctorMobileNo" placeholder="Mobile"
                        {...register('doctorMobileNo', {
                            required: "Please enter your mobile.",
                            pattern: {
                                value: /^[789]\d{9}$/,
                                message: "Invalid mobile number."
                            }
                        }
                        )}
                    />
                    {errors.doctorMobileNo && <div className="invalid-tooltip">{errors.doctorMobileNo.message}</div>}
                </div>
            </div>
            <div className="form-group">
                <div className="col position-relative">
                    <input type="text" className={classNames("form-control", { "is-invalid": errors.doctorUPRNNo })} name="doctorUPRNNo" placeholder="UPRNNo"
                        {...register('doctorUPRNNo', {
                            required: "Please enter your UPRN.",
                            pattern: {
                                value: /^\d{12}$/,
                                message: "Invalid UPRN."
                            }
                        }
                        )}
                    />
                    {errors.doctorUPRNNo && <div className="invalid-tooltip">{errors.doctorUPRNNo.message}</div>}
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col position-relative">
                        <input type="text" className={classNames("form-control", { "is-invalid": errors.doctorAddress })} name="doctorAddress" placeholder="Address"
                            {...register('doctorAddress', {
                                required: "Please enter your address.",
                                minLength: {
                                    value: 10,
                                    message: "Should be at least 10 characters."
                                }
                            }
                            )}
                        />
                        {errors.doctorAddress && <div className="invalid-tooltip">{errors.doctorAddress.message}</div>}
                    </div>
                    <div className="col-4 position-relative mt-3">
                        <select className="form-select" aria-label="Default select example" name="doctorCity"
                            {...register('doctorCity', {
                                required: "Please enter your city.",
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
            <div className="col-12 position-relative">
                <select className="form-select mt-3 mb-3" aria-label="Default select example" name="doctorSpeciality"
                    {...register('doctorSpeciality', {
                        required: "Please enter your speciality.",
                    }
                    )}>
                    {specialityOptions.map((specialityOption) => {
                        return (
                            <option key={specialityOption} value={specialityOption}>
                                {specialityOption}
                            </option>
                        );
                    })}
                </select>
            </div>
            {/* <div class="mb-3">
                <label for="formFile" className="form-label">Upload UPRN</label>
                <input className="form-control" type="file" id="formFile" />
            </div> */}
            <div className="form-group">
                <label className="form-check-label">
                    <input type="checkbox" className={classNames("form-check-input", { "is-invalid": errors.tnc })} name="tnc"
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

export default DoctorRegistration