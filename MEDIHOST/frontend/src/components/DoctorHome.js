import React, { useContext, useState, useEffect } from 'react';
import TendToPatient from './TendToPatient';
import DoctorHistory from './DoctorHistory';
import { UserContext } from './UserContext';
import { useLocation } from 'react-router-dom';
import './dashboard.css';
import DoctorInlineAppointments from './DoctorInlineAppointments';
import DoctorConsultationHistory from './DoctorConsultationHistory';

const DoctorHome = () => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('doctorInlineAppointments');

    useEffect(() => {
        console.log('mounted');
        console.log(localStorage.getItem('userType'));
        console.log(localStorage.getItem('user'));
        return () => console.log('unmounting...');
      }, []) 


    const clickHandler = (e) => {
        setActiveButton(e.target.value);
    }

    return (
        <div className = 'container d-flex flex-column align-items-center justify-content-center dashboard'>
            <div className = "row">
                <div className = "btn-group"> 
                    <button type="button" style={{width: "400px"}} className={`btn me-4 btn-lg btn-outline-dark shadow-none rounded-pill ${activeButton==='doctorInlineAppointments'? 'active': ' '}`} onClick={clickHandler} value='doctorInlineAppointments'>Inline Appointments</button>
                    <button type="button" style={{width: "400px"}} className={`btn btn-lg btn-outline-dark shadow-none rounded-pill ${activeButton==='doctorConsultationHistory'? 'active': ' '}`}  onClick={clickHandler} value='doctorConsultationHistory'>Consultation History</button>
                </div>
            </div>
            <div className = 'row'> 
                { activeButton === 'doctorInlineAppointments' && (<DoctorInlineAppointments />) }
                { activeButton === 'doctorConsultationHistory' && (<DoctorConsultationHistory />)}
            </div>
            <div className="row" style={{minHeight: "30px"}}>
              {location.state && <span className="text-center ms-2 lead" style={{color: 'blue'}} dangerouslySetInnerHTML={{__html: location.state.message}} />}
            </div>
        </div>
    )
}

export default DoctorHome