import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import EmployeeRegisterForm from './EmployeeRegisterForm'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


const validationSchema = Yup.object({
  employeeid: Yup.string("Enter your Id")
  .min(2, "Id must contain at least 2 Digits")
  .required("Id is required"),
  mobile: Yup.string("")
    .min(8, "Mobile must contain at least 8 numbers")
    .required("Enter your Mobile Number"),
  department: Yup.string("Enter your Department")
  .required("Enter your Department"),  
  employeeName: Yup.string("")
    .min(8, "Name must contain at least 8 characters")
    .required("Enter your name"),
  email: Yup.string("")
  .matches(emailFormat, "Invalid Email")
  .required("Enter your Email"),  
  
});

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      open:false
    };
  }


  
submitValues = ({employeeid, email, employeeName, mobile, department}) => {

  console.log(department)


  const postValues ={
    employeeId: employeeid,
    email: email,
    name: employeeName,
    mobileNo: mobile,
    department: department
  }
  
  axios.post('http://192.168.200.200:8080/backendapitest/employee/register',postValues)
      .then(res =>
        { if (res.data === true) {
          return (
            this.props.history.push('/RegistrationComplete')          
          )}
      else{
        this.setState({open:true})
      }}
);
}

handleClose = () => {
  this.setState({open:false})
}


  render() {
    const { employeeid } = this.state;
    const { email } = this.state;
    const { employeeName } = this.state;
    const { mobile } = this.state;
    const {department } = this.state;

  
    const values = {
      employeeid: employeeid,
      employeeName:   employeeName,
      email: email,
      mobile: mobile,
      department: department
    };

    return (
      <React.Fragment>
            <Formik
              render={props => <EmployeeRegisterForm {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitValues}
            />
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Invalid Credentials, Please try again"}</DialogTitle>
            </Dialog>

      </React.Fragment>
    );
  }
}

export default InputForm;