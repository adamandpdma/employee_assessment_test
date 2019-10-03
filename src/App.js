import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AdminLogin from './AdminLogin'
import HrLogin from './HrLogin'
import EmployeeLogin from './EmployeeLogin'
import GuestLogin from './GuestLogin'
import GuestDashboard from './GuestDashboard'
import AdminEditProfile from './AdminEditProfile'
import EmployeeRegister from './EmployeeRegister'
import RegistrationComplete from './RegistrationComplete'
import EmployeeEditProfile from './EmployeeEditProfile'
import {ProtectedRoute} from "./Protected.Route"
import HrEditProfile from './HrEditProfile'
import Home from './Home'


const App = () => {
    
    return(
   <div>
  <Router>
      
          <Route exact path = '/' component = {Home} />
          <Route path = '/AdminLogin' component = {AdminLogin} />
          <Route path = '/HrLogin' component = {HrLogin} />
          <Route path = '/EmployeeLogin' component = {EmployeeLogin}/>
          <Route path = '/EmployeeRegister' component = {EmployeeRegister}/>
          <Route path = '/GuestLogin' component = {GuestLogin}/>
          <ProtectedRoute path = '/HrEditProfile' component = {HrEditProfile} />
          <ProtectedRoute path = '/GuestDashboard' component = {GuestDashboard} />
          <ProtectedRoute path = '/AdminEditProfile' component = {AdminEditProfile} />
          <ProtectedRoute path = '/RegistrationComplete' component = {RegistrationComplete}/>
          <ProtectedRoute path = '/EmployeeEditProfile' component = {EmployeeEditProfile}/>

      
  </Router>
  </div>

)
  }


export default App;
