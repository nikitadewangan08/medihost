import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import PatientConsultationHistory from './PatientConsultationHistory';
import { MDBDataTableV5 } from 'mdbreact';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import ApiService from '../services/ApiService';
import { ToastContainer, toast} from 'react-toastify';

const DoctorInlineAppointments = () => {
  const [patient_id, setPatientId] = useState();
  const [search, setSearch] = useState(false);
  const [error, setError] = useState();
  //const [appointmentList, setAppointmentList] = useState([]);
  const [remarks, setRemarks] = useState(null);
  const [adError, setAdError] = useState(null);
  const [rError, setRError] = useState(null);
  const [show, setShow] = useState(false);
  const [showConsult, setShowConsult] = useState(false);
  const [slot, setSlot] = useState(null);
  const [appId, setappId] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [requestedDate, setRequestedDate] = useState(null);
  const [medication, setMedication] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [prognosis, setPrognosis] = useState(null);
  const [caError, setCaError] = useState(null);
  const [refreshRequired, setRefreshRequired] = useState(null);


  const forceUpdate = useReducer(x => x + 1, 0)[1];
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'Appointment Id',
        field: 'appointmentId',
        width: 150,
      },
      {
        label: "Patient Name",
        field: 'patientName',
        width: 200,
      },
      {
        label: "Requested Date",
        field: 'requestedDate',
        width: 180,
      },
      {
        label: 'Slot',
        field: 'slot',
        width: 120,
      },
      {
        label: 'Problem Description',
        field: 'problemDescription',
        width: 400,
      },
      {
        label: 'Status',
        field: 'status',
        width: 100,
      }
    ],
    rows: []
  })

const populateData = () => {
  console.log('appointmentList 1 - ' + datatable.rows.length);
  if(datatable.rows.length === 0){
    var doctor = JSON.parse(localStorage.getItem('user'));
    console.log('Doctor details - ' + doctor);

    ApiService.getDoctorInlineAppointments(doctor.doctorId)
      .then(resp => {
          var appointmentList = [];
          resp.data.map(app => {
            if (app.status === 'PENDING' || app.status === 'SCHEDULED') {
              appointmentList.push({
                'appointmentId': app.appointmentId,
                'patientName': app.patient.patientName,
                'requestedDate': app.requestedDate,
                'slot': getSlot(app.slot),
                'status': app.status,
                'problemDescription': app.problemDescription,
                clickEvent: () => modalShow(app)
              });
            }

          })

          setDatatable(prevState => ({ ...prevState, rows: appointmentList }));

        
      }).catch(() => {

      })
  }
  //console.log('appointmentList 2 - ' + appointmentList.length);
}

  useEffect(() => {
    console.log('mounted');
    console.log(localStorage.getItem('userType'));

    populateData();

    return () => console.log('unmounting...');
  }, [])

  const searchHandler = () => {
    const input = parseInt(document.getElementById('inp').value);
    if (!isNaN(input)) {
      setPatientId(input);
      setSearch(true);
      setError(null);
    } else {
      setSearch(false);
      setError('Please enter a valid patient id.')
    }
  }

  const enterPressed = (event) => {
    if (event.key === 'Enter') {
      searchHandler();
    }
  }

  const getSlot = ((slot) => {
    var slotStr = "-";
    if (slot == 1)
      slotStr = "10-11 AM"
    if (slot == 2)
      slotStr = "11-12 PM"
    if (slot == 3)
      slotStr = "12-1 PM"
    if (slot == 4)
      slotStr = "2-3 PM"
    if (slot == 5)
      slotStr = "3-4 PM"
    if (slot == 6)
      slotStr = "4-5 PM"
    if (slot == 7)
      slotStr = "5-6 PM"

    return slotStr;
  });

  const getSlotTime = ((slot) => {
    var slotStr = "-";
    if (slot == 1)
      slotStr = "10:00 AM"
    if (slot == 2)
      slotStr = "11:00 AM"
    if (slot == 3)
      slotStr = "12:00 PM"
    if (slot == 4)
      slotStr = "2:00 PM"
    if (slot == 5)
      slotStr = "3:00 PM"
    if (slot == 6)
      slotStr = "4:00 PM"
    if (slot == 7)
      slotStr = "5:00 PM"

    return slotStr;
  });

  const getSlotID = ((slot) => {
    var slotId = "NA";

      if (slot == "10-11 AM")
      slotId = 1;
      if (slot == "11-12 PM")
      slotId = 2;
      if (slot == "12-1 PM")
      slotId = 3;
      if (slot == "2-3 PM")
      slotId = 4;
      if (slot == "3-4 PM")
      slotId = 5;
      if (slot == "4-5 PM")
      slotId = 6;
      if (slot == "5-6 PM")
      slotId = 7;

    return slotId;
  });

  const onOptionChange = (e) => {
    let type = e.target.name;
    let data = e.target.value;
    console.log('option - '+e.target.selectedIndex);
  
    if (type === 'availableSlots') {
      setSlot(getSlotID(data));
    }
    else if (type === 'medication') {
      setMedication(data);
    }
    else if (type === 'diagnosis') {
      setDiagnosis(data);
    }
    else if (type === 'prognosis') {
      setPrognosis(data);
    }
    else if (type === 'remarks') {
      setRemarks(data);
    }
  }

  const modalShow = (app) => {
    setappId(app.appointmentId);
    //app.requestedDate


    if(app.status === 'SCHEDULED'){
      // console.log("check date time" + new Date(app.requestedDate + " " + getSlotTime(app.slot)));
      // console.log("current time" + new Date());
      // console.log("current time compare - " + (new Date() > new Date(app.requestedDate + " " + getSlotTime(app.slot))));
      if(new Date() >= new Date(app.requestedDate + " " + getSlotTime(app.slot))){
        setShow(false);
        setShowConsult(true);
      }
      else{
        toast.warning("Appointment already scheduled at " + getSlotTime(app.slot)  + ", "+  app.requestedDate , 
        { position: toast.POSITION.TOP_RIGHT })
      }
    }
    if(app.status === 'PENDING'){
      var docotor = JSON.parse(localStorage.getItem('user'));
      ApiService.getAvailableSlots(docotor.doctorId, app.requestedDate).then(resp => {
  
        var slotList = [];
  
        resp.data.map(s => {
          slotList.push({'key': s, 'value': getSlot(s)});
        })
  
        setAvailableSlots(slotList);
  
  
      }).finally(() => {
        console.log(availableSlots)
      });
      availableSlots.forEach(s => { console.log(s) });
      console.log(availableSlots)
      setShowConsult(false);
      setShow(true);
    }
  }

  const modalClose = () => {
    setShow(false);
    setShowConsult(false);
  }

  const confirmAppointment = (e) => {
    console.log("entered ca");
    console.log(e.target.value);

    if (slot == null) {
      setAdError('Please select a slot.');
    }
    if (remarks == null) {
      setRError('Please enter remarks.');
    }
    if (slot != null && remarks != null) {

      //console.log(tempStr);
      ApiService.actionizeAppointmentRequest(appId, 'approve', slot, remarks)
        .then(resp => {
          // console.log("resp-" + resp.data);
          toast.success(resp.data, {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        .catch((resp) => {
            setError('Error in fetching data.');
        })
        .finally(() => {
          datatable.rows.length=0;
          modalClose();
          populateData();
        })
    }
  }
  const rejectAppointment = (e) => {
    if (remarks == null) {
      setRError('Please enter remarks.');
    }
    if (remarks != null) {

      //console.log(tempStr);
      ApiService.actionizeAppointmentRequest(appId, 'reject', 0, remarks)
        .then(resp => {
          toast.error(resp.data, {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        .catch((resp) => {
            setError('Error in fetching data.');
        })
        .finally(() => {
          datatable.rows.length=0;
          modalClose();
          populateData();
        })
    }
  }

  const consultPatient = () =>{
    if (diagnosis == null) {
      setCaError('Please fill all details.');
    }
    if (prognosis == null) {
      setCaError('Please fill all details.');
    }
    if (medication == null) {
      setCaError('Please fill all details.');
    }
    if (remarks == null) {
      setCaError('Please fill all details.');
    }
    if (diagnosis != null && prognosis != null && medication != null && remarks != null) {
      var conDTO = {
        appointmentId: appId,
        diagnosis: diagnosis,
        prognosis: prognosis,
        medication: medication,
        remarks: remarks
      }
      ApiService.consult(conDTO)
        .then(resp => {
          // console.log("resp-" + resp.data);
          toast.success(resp.data, {
            position: toast.POSITION.TOP_CENTER
          });
        })
        .catch((resp) => {
            setError('Error in fetching data.');
        })
        .finally(() => {
          modalClose();
        })
      }
  }

  return (

    <div className="container d-flex flex-column align-items-center justify-content-center">
      <div className="row mt-1" style={{ minHeight: "30px" }}>
        <span className="text-center lead" style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: error }} />
      </div>
      <div className="mt-4">
        {search ? <PatientConsultationHistory pid={patient_id} consult={true} /> : <MDBDataTableV5 small scrollX hover entriesOptions={[10, 20, 30, 40]} entries={10} pagesAmount={4} data={datatable} />}
      </div>

      <ToastContainer />

      <div className="App p-4">
        <Form>
          <Modal centered show={show} onHide={modalClose}>
            <Modal.Header closeButton>
              <Modal.Title><b>Appointment Confirmation</b></Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form.Group className="mb-3" controlId="appointmentId">
                <Form.Label><b>Appointment Id - 
                {appId}
                </b>
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <div className="btn-group me-2">
                  <select className="form-select m-3" name="availableSlots" onChange={onOptionChange}>
                    <option selected disabled value="">Select Slot</option>
                    {availableSlots.map((availableSlot) => {
                      return (
                        <option key={availableSlot.key} value={availableSlot.value}>
                          {availableSlot.value}
                        </option>
                      );
                    })}
                  </select>

                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="remarks">
                <Form.Label><b>Remarks</b></Form.Label>
                <Form.Control type="text" name="remarks" onChange={onOptionChange} required />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" type="submit" onClick={rejectAppointment}>Reject</Button>
              <Button variant="success" type="submit" onClick={confirmAppointment}>Confirm Appointment</Button>
            </Modal.Footer>
          </Modal>

          <Modal centered show={showConsult} onHide={modalClose}>
            <Modal.Header closeButton>
              <Modal.Title><b>Consult</b></Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form.Group className="mb-3" controlId="appointmentId">
                <Form.Label><b>Appointment Id - 
                {appId}
                </b>
                </Form.Label>
              </Form.Group>

            <Form.Group className="mb-3" controlId="medication">
                <Form.Label><b>Medication</b></Form.Label>
                <Form.Control type="text" name="medication" onChange={onOptionChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="diagnosis">
                <Form.Label><b>Diagnosis</b></Form.Label>
                <Form.Control type="text" name="diagnosis" onChange={onOptionChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="prognosis">
                <Form.Label><b>Prognosis</b></Form.Label>
                <Form.Control type="text" name="prognosis" onChange={onOptionChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="remarks">
                <Form.Label><b>Remarks</b></Form.Label>
                <Form.Control type="text" name="remarks" onChange={onOptionChange} />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={modalClose}>Close</Button>
              <Button variant="primary" type="submit" onClick={consultPatient}>Forward Suggestion</Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </div>
    </div>
  )
}


export default DoctorInlineAppointments