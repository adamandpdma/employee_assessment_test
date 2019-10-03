import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import GuestRegisterForm from './GuestRegisterForm'
import './Home.css'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';



const nricFormat = /^[STFG]\d{7}[A-Z]$/

const validationSchema = Yup.object({
  name: Yup.string("Enter your Name")
    .min(8, "Name must contain at least 8 characters")
    .required("Enter your name"),
  nric: Yup.string("Enter your Nric")
    .matches(nricFormat, "Invalid Nric")
    .required("Enter your Nric"),  
  mobile: Yup.string("")
    .min(8, "Mobile must contain at least 8 numbers")
    .required("Enter your Mobile Number"),
  educationLevel: Yup.string("")
    .required("Select your Education"),
  gpa: Yup.string("")
    .required("Enter your GPA"),
  graduationYear: Yup.number("")
    .lessThan(2020, "Year of Graduation should be within the last 4 years!")
    .moreThan(2015, "Year of Graduation should be within the last 4 years!")
    .required("Enter your Year of Graduation"),  
  
});

class InputForm extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      Id: "",
      errorMessage:false
  };
  }


  
submitValues = ({name, nric, mobile, educationLevel, gpa, graduationYear}) => {


  const guest ={
    name: name,
    email:"",
    nric:   nric,
    mobileNo: mobile,
    educationLevel: educationLevel,
    gpa: gpa,
    graduationYear: graduationYear
}
  
  axios.post('http://192.168.200.200:8080/backendapi/guest/register',guest)
      .then(res =>
        { if (res.data === true) {
          return (
            // this.props.history.push('./RegistrationComplete')      
            console.log(res.data)  
          )}
      else{
        this.setState({errorMessage:true})
        console.log(res.data)  

      }}
);
}

handleClose = () => {
  this.setState({errorMessage:false})

}

  render() {
    const { name } = this.state;
    const { nric } = this.state;
    const { mobile } = this.state;
    const { educationLevel } = this.state;
    const { gpa } = this.state;
    const { graduationYear } = this.state;
    const handleClose = this.handleClose
    const errorMessage = this.state.errorMessage


  
    const values = {
      name: name,
      nric:   nric,
      mobile: mobile,
      educationLevel: educationLevel,
      gpa: gpa,
      graduationYear: graduationYear
    };

    return (
      <React.Fragment>
            <Formik
              render={props => <GuestRegisterForm {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitValues}
            />      
      <Dialog
            open={errorMessage}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Invalid Credentials"}</DialogTitle>
      </Dialog>


      </React.Fragment>
    );
  }
}

export default InputForm;