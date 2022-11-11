import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About.js';
import Blogs from './components/Blogs.js';
import Navbar from './components/Navbar';
import Login from './components/Login.js';
import PatientHome from './components/PatientHome.js';
import DoctorHome from './components/DoctorHome.js';
import RegistrationForm from './components/RegistrationForm';
import { UserContext } from './components/UserContext.js';
import {useState} from 'react';
import DoctorProfileUpdation from './components/DoctorProfileUpdation';
import PatientProfileUpdation from './components/PatientProfileUpdation';
import ForgotPassword from './components/ForgotPassword';


function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <div className="App">
      <Router>
      <UserContext.Provider value = {{user, setUser}}>
      <Navbar/>
      <Routes>
        
          <Route path="/" element={<Home/>} />
          <Route path="/patient" element={<PatientHome/>} />
          <Route path="/doctor" element={<DoctorHome/>} />
          <Route path="/updateDoctor" element={<DoctorProfileUpdation/>} />
          <Route path="/updatePatient" element={<PatientProfileUpdation/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
        
      </Routes>

      </UserContext.Provider>
    </Router>

    </div>
    
  );
}

export default App;
