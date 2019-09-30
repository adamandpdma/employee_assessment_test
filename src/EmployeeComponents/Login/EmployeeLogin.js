import React, {createContext, Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import  Form  from "./EmployeeForm";
import * as Yup from "yup";
import axios from 'axios';
import EmployeeForm from "./EmployeeForm";
import './Home.css'
import background from './OptimumBackground.png'

const validationSchema = Yup.object({
  employeeid: Yup.string("Enter your Id")
  .min(2, "Id must contain at least 2 Digits")
  .required("Id is required"),
  Password: Yup.string("")
    .min(8, "Password must contain atleast 8 characters")
    .required("Enter your password"),
});

class employeeLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      auth:false
    };
  }


  
  submitValues = ({employeeid,Password,event}) => {


    const postValue ={
      empid: employeeid,
      password: Password
    }
  
  const empid = employeeid;
  
    axios.post('http://192.168.200.200:8080/backendapi/employee/' + empid + "/login", postValue)
        .then(res =>
         { if (res.data === true) {
            return (
              localStorage.setItem('employeeid', employeeid),
              localStorage.setItem('password', Password),
              this.props.history.push('./EditProfileEmployee')          
            )}
        else{
          alert('Invalid')
        }}
  );
      }
  render() {
    const { employeeid } = this.state;
    const { Password } = this.state;
  
    const values = {
      employeeid: employeeid,
      Password:   Password,
    };

    return (
      <React.Fragment>
            <Formik
              render={props => <EmployeeForm {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitValues}
            />
      </React.Fragment>
    );
  }
}

export default employeeLogin;
