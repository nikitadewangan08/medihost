import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { MDBDataTableV5 } from "mdbreact";
import { useRef } from 'react';
import ApiService from "../services/ApiService";
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FindDoctor = () => {

    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const [searchDTO, setSearchDTO] = useState({});
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    const [error, setError] = useState(null);
    const [cityError, setCityError] = useState(null);
    const [specialityError, setSpecialityError] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);
    const [specialityOptions, setSpecialityOptions] = useState([]);
    const effectCalled = useRef(false);
    const [doctorList, setDoctorList] = useState([]);
    const forceUpdate = useReducer(x => x + 1, 0)[1];
    const [problemDescription, setProblemDescription] = useState(null);
    const [requestedDate, setRequestedDate] = useState(null);
    const [drId, setDrId] = useState(null);
    const [rdError, setRdError] = useState(null);
    const [pdError, setPdError] = useState(null);
    const [appointmentList, setAppointmentList] = useState([]);
    

    const [datatable, setDatatable] = useState({
        columns: [
            {
                label: 'Doctor ID',
                field: 'doctorId',
                width: 100,
            },
            {
                label: 'Name',
                field: 'doctorName',
                width: 150,
            },
            {
                label: 'Speciality',
                field: 'doctorSpeciality',
                width: 100,
            },
            {
                label: 'City',
                field: 'doctorCity',
                width: 100,
            },
            {
                label: 'Contact',
                field: 'doctorMobileNo',
                width: 100,
            },
            {
                label: 'Email',
                field: 'email',
                width: 150,
            },
        ],
        rows: []
    });

    const onOptionChange = (e) => {
        let type = e.target.name;
        let data = e.target.value;
        console.log('event - ' + type);
        console.log('event - ' + data);
        if (type === 'doctorCity') {
            setCityError('');
            setSelectedCity(data);
        }
        else if (type === 'doctorSpeciality') {
            setSpecialityError('');
            setSelectedSpeciality(data);
        }
        // code for setting an appointment
        else if (type === 'appointmentDate') {
            setRequestedDate(data);
        }
        else if (type === 'problemDesc') {
            setProblemDescription(data);
        }
        
    }

    // const inputHandler = (e) => {
    //     let type = e.target.name;
    //     let data = e.target.value;
    //     console.log('event name- ' + e.target.name);
    //     console.log('event value- ' + e.target.value);
    //     if (type === 'city')
    //         setSearch(prevSearch => ({ ...prevSearch, city: data }))
    //     else if (type === 'speciality')
    //         setSearch(prevSearch => ({ ...prevSearch, speciality: data }))
    // }

    const searchHandler = () => {
        //debugger;
        setDoctorList([]);
        console.log('entered search- ' + selectedCity);
        console.log('entered search- ' + selectedSpeciality);
        if (selectedCity == null) {
            setCityError('Please select a City you want to search for a Doctor.');
        }
        if (selectedSpeciality == null) {
            setSpecialityError('Please select Speciality of a Doctor you are searching for.');
        }
        if (selectedCity != null && selectedSpeciality != null) {
            console.log('entered not null');
            const str = { doctorCity: selectedCity, doctorSpeciality: selectedSpeciality };

            console.log(str);
            ApiService.findDoctor(str)
                .then(resp => {
                    // debugger;
                    resp.data.map(doctor => {
                        doctorList.push({
                            'doctorId': doctor.doctorId,
                            'doctorName': doctor.doctorName,
                            'address': doctor.doctorAddress,
                            'doctorCity': doctor.doctorCity,
                            'doctorMobileNo': doctor.doctorMobileNo,
                            'email': doctor.email,
                            'doctorSpeciality': doctor.doctorSpeciality,
                            clickEvent: () => modalShow(doctor)
                        });
                    })
                    doctorList.forEach(d => console.log(d.doctorName));
                    setDatatable(prevState => ({ ...prevState, rows: doctorList }));
                    //forceUpdate();
                    // setDatatable(prevState => ({ ...prevState, rows: data }));
                    // setError(null);
                }).catch(() => {
                    setError('Error in fetching data.');
                }).finally(() => {
                    console.log('Entered finally');
                    forceUpdate();
                })
        }
        // if (selectedCity == null && selectedSpeciality == null) {
        //     setCityError('Please select any filter to search for a Doctor.');
        // }
    }

    // const enterPressed = (event) => {
    //     console.log('event - ' + event.target.id);
    //     if (event.key === 'Enter') {
    //         searchHandler();
    //     }
    // }

    useEffect(() => {
        console.log('Entered use effect');
        if (!effectCalled.current) {
            ApiService.getOptions(1).then(resp => {
                console.log(resp.data);

                setCityOptions([
                    ...resp.data
                ])
            })
            ApiService.getOptions(2).then(resp => {
                console.log(resp.data);

                setSpecialityOptions([
                    ...resp.data
                ])
            })
            effectCalled.current = true;
        }
    }, []);


    const modalShow = (doctor) => {
        setDrId(doctor.doctorId);
        // setSearch(doctor.doctorUPRNNo);
        setShow(true);
    }

    const modalClose = () => {
        setShow(false);
    }

    const submitAppointment = (e) => {
        console.log("entered sa");
        console.log(e.target.value);

        if (requestedDate == null) {
            setRdError('Please select a date.');
        }
        if (problemDescription == null) {
            setPdError('Please describe your problem.');
        }
        if (requestedDate != null && problemDescription != null) {
            var patient = JSON.parse(localStorage.getItem('user'));
            const tempStr = { patientId: patient.patientId, doctorId: drId, requestedDate: requestedDate, problemDescription: problemDescription };
            var currentDate = new Date();
           
            if(new Date() < new Date(requestedDate)){
                console.log(tempStr);
                ApiService.requestAppointment(tempStr)
                    .then(resp => {
                            // console.log("resp-" + resp.data);
                            toast.success(resp.data, {
                                position: toast.POSITION.TOP_CENTER
                            });
                    }).catch(() => {
                        setError('Error in fetching data.');
                    }).finally(() => {
                        modalClose();
                    })
            }
            else{
                toast.error("Please select a valid Date" , {
                    position: toast.POSITION.TOP_CENTER
                })
                toast.warning("Appointment request cant be taken for current date" , {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            
        }
    }

    return (
        <>
            <div className="container mt-3 d-flex justify-content-center align-items-center">
                <div className="btn-group me-2 col-2">
                    <select className="form-select" name="doctorCity" onChange={onOptionChange}>
                        <option selected disabled value="">Select City</option>
                        {cityOptions.map((cityOption) => {
                            return (
                                <option key={cityOption} value={cityOption}>
                                    {cityOption}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="btn-group me-2">
                    <select className="form-select m-3" name="doctorSpeciality" onChange={onOptionChange}>
                        <option selected disabled value="">Select Speciality</option>
                        {specialityOptions.map((specialityOption) => {
                            return (
                                <option key={specialityOption} value={specialityOption}>
                                    {specialityOption}
                                </option>
                            );
                        })}
                    </select>

                </div>

                <div className="btn-group me-2">
                    <i className="bi bi-search"></i>
                    <button type="button" className="btn btn-outline-success" onClick={searchHandler}><i className="fa fa-search"></i></button>
                </div>

            </div>
            <div>
                <span className="sm-1 pl-5" style={{ color: 'red', paddingLeft: 210, fontSize: 12 }} dangerouslySetInnerHTML={{ __html: cityError }} />
                <span className="sm-1 pl-5" style={{ color: 'red', paddingLeft: 50, fontSize: 12 }} dangerouslySetInnerHTML={{ __html: specialityError }} />
            </div>
            <div className="mt-4 -striped -highlight">
                <MDBDataTableV5 small scrollY scrollX hover entriesOptions={[5, 10, 15, 20]} entries={5} pagesAmount={4} data={datatable} />
            </div>
            <ToastContainer />


            {/* code for modal */}
            <div className="App p-4">
            <Form>
                <Modal centered show={show} onHide={modalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><b>Request Appointment</b></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                          <Form.Group className="mb-3" controlId="requestedDate">
                                <Form.Label><b>Select Appointment Date</b></Form.Label>
                                <Form.Control type="date" name="appointmentDate" onChange={onOptionChange} /> 
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="problemDescription">
                                <Form.Label><b>Describe Your Problem</b></Form.Label>
                                <Form.Control type="text" name="problemDesc" onChange={onOptionChange} />
                                <Form.Text className="text-muted">
                                     Describe your health issue within 300 words.
                                </Form.Text>
                            </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={modalClose}>Close</Button>
                        <Button variant="primary" type="submit" onClick={submitAppointment}>Send Request</Button>
                    </Modal.Footer>
                </Modal>
                </Form>
            </div>

        </>
    )
}

export default FindDoctor