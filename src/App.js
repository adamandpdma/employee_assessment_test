import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import AdminLogin from './AdminComponents/Login/AdminLogin'
import HrLogin from './HrComponents/Login/HrLogin'
import EmployeeLogin from './EmployeeComponents/Login/EmployeeLogin'
import GuestLogin from './GuestComponents/Login/GuestLogin'
import GuestDashboard from './GuestComponents/Register/GuestDashboard'
import AdminEditProfile from './AdminComponents/EditProfile/AdminEditProfile'
import EmployeeRegister from './EmployeeComponents/Login/EmployeeRegister'
import RegistrationComplete from './EmployeeComponents/Login/RegistrationComplete'
import EmployeeEditProfile from './EmployeeComponents/EditProfile/EmployeeEditProfile'
import {ProtectedRoute} from "./Protected.Route"
import HrEditProfile from './HrComponents/EditProfile/HrEditProfile'
import Home from './Home'
import ResponsiveDrawer from './AdminComponents/crudTest/ResponsiveDrawer'
import EmployeeResponsiveDrawer from './EmployeeComponents/TakeTest/ResponsiveDrawerEmployee'
import HrResponsiveDrawer from './HrComponents/ViewTestResult/ResponsiveDrawerHr'
import GuestResponsiveDrawer from './GuestComponents/TakeTest/ResponsiveDrawerGuest'
import Login from './Manager/Login'
import ViewTimesheet from './Manager/ViewTimesheet';
import ViewMCAttachment from './Manager/ViewMCAttachment';
import ViewLeaveApplication from './Manager/LeaveManagement/ViewLeaveApplication';
import LoginLeaveApplication from './Manager/LeaveManagement/Login'


const App = () => {
    
    return(
   <div>
   <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          <Route exact path = '/' component = {Home} />
          <Route exact path = '/AdminLogin' component = {AdminLogin} />
          <Route path = '/HrLogin' component = {HrLogin} />
          <Route path = '/EmployeeLogin' component = {EmployeeLogin}/>
          <Route path = '/EmployeeRegister' component = {EmployeeRegister}/>
            
          {/* TIMESHEET */}
          <Route path = '/timesheet/managerLogin' component = {Login}/>
          <Route path = '/managerLogin/viewTimesheet' component = {ViewTimesheet}/>
          <Route path = '/managerLogin/viewMCAttachment' component = {ViewMCAttachment}/>

          {/* LEAVE MANAGEMENT */}
          <Route path = '/leaveApplication/managerLogin' component = {LoginLeaveApplication}/>
          <Route path = '/managerLogin/viewLeaveApplication' component = {ViewLeaveApplication}/>
          
          <Route path = '/GuestLogin' component = {GuestLogin}/>
          <ProtectedRoute path = '/guest' component = {GuestResponsiveDrawer}/>
          <ProtectedRoute path = '/admin' component = {ResponsiveDrawer}/>
          <ProtectedRoute path = '/employee' component = {EmployeeResponsiveDrawer}/>
          <ProtectedRoute path = '/hr' component = {HrResponsiveDrawer}/>   
          <Route path = '/RegistrationComplete' component = {RegistrationComplete}/>
    </Router>
  </div>
)
  }


export default App;





      
          {/* <ProtectedRoute path = '/HrEditProfile' component = {HrEditProfile} />
          <ProtectedRoute path = '/GuestDashboard' component = {GuestDashboard} />
          <ProtectedRoute path = '/AdminEditProfile' component = {AdminEditProfile} />
          <ProtectedRoute path = '/RegistrationComplete' component = {RegistrationComplete}/>
          <ProtectedRoute path = '/EmployeeEditProfile' component = {EmployeeEditProfile}/> */}