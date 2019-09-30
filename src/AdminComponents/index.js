import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route,Link,BrowserRouter as Router} from "react-router-dom"
import Input from './Input'
import EmployeeLogin from './EmployeeLogin'
import EditProfile from './EditProfile'
import EmployeeRegisterInput from './EmployeeRegisterInput'
import RegistrationComplete from './RegistrationComplete'
import Profile from './Profile';

// const Routing = (
    
//     <Router>
//         <div>
//             <Route exact path = '/' component = {App} />
//             <Route path = '/Input' component = {Input} />
//             <Route path = '/EmployeeLogin' component = {EmployeeLogin}/>
//             <Route path = '/EditProfile' component = {EditProfile} />
//             <Route path = '/Profile' component = {Profile}/>
//             <Route path = '/EmployeeRegisterInput' component = {EmployeeRegisterInput}/>
//             <Route path = '/RegistrationComplete' component = {RegistrationComplete}/>

//         </div>
//     </Router>
// )

ReactDOM.render( <App/>, document.getElementById('root'));
// ReactDOM.render( <App></App>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
