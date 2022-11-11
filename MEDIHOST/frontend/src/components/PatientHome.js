import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import FindDoctor from './FindDoctor'
import PatientConsultationHistory from './PatientConsultationHistory';
import { UserContext } from './UserContext';
//import './dashboard.css';

const PatientHome = () => {
    const {user} = useContext(UserContext);
    const [activeButton, setActiveButton] = useState('find');
    const navigate = useNavigate();

    const clickHandler = (e) => {
        setActiveButton(e.target.value);
    }

    useEffect(() => {
        if(localStorage.getItem('user') === null){
            navigate('/');
        }
    },[]);

    return (
        <div className = 'container d-flex flex-column align-items-center justify-content-center dashboard' >
            <div className = 'row'>
                <div className = "btn-group"> 
                    <button type="button" style={{width: "400px"}} className={`btn me-4 btn-lg btn-outline-dark shadow-none rounded-pill ${activeButton==='findDoctor'? 'active': ' '}`} onClick={clickHandler} value='findDoctor'>Find a doctor</button>
                    <button type="button" style={{width: "400px"}} className={`btn btn-lg btn-outline-dark shadow-none rounded-pill ${activeButton==='consultationHistory'? 'active': ' '}`}  onClick={clickHandler} value='consultationHistory'>Consultation History</button>
                </div>
            </div>
            <div className = 'row'>
                { activeButton === 'findDoctor' && (<FindDoctor/>) }
                { activeButton === 'consultationHistory' && (<PatientConsultationHistory />)}
            </div>
        </div>
    )
}

export default PatientHome