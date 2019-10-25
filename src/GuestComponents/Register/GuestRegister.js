import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import GuestRegisterForm from './GuestRegisterForm'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import {NavLink} from 'react-router-dom';


const nricFormat = /^[STFG]\d{7}[A-Z]$/


const validationSchema = Yup.object({
  name: Yup.string("Enter your Name")
    .min(8, "Name must contain at least 8 characters")
    .required("Enter your name"),
  nric: Yup.string("Enter your Nric")
    .matches(nricFormat, "Invalid Nric Eg. S1234567A")
    .required("Enter your Nric"),  
  mobile: Yup.string("")
    .min(8, "Mobile must contain at least 8 numbers")
    .required("Enter your Mobile Number"),
  educationLevel: Yup.string("")
    .required("Select your Education"),
  gpa: Yup.number("")
    .required("Enter your GPA")
    // .lessThan(4.01,"GPA cannot be higher than 4")
    .moreThan(0,"GPA must be more than 0"),
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
      errorMessage:false,
      errorPoly:false,
      errorUni:false,
      message:false
  };
  }


  
submitValues = ({name, nric, mobile, educationLevel, gpa, graduationYear}) => {

  if(educationLevel === 'University' && gpa > 5){
    this.setState({
      errorUni:true
    })
  }
  else if(educationLevel === 'Polytechnic' && gpa > 4){
    this.setState({
      errorPoly:true
    })
  }
  else{

  const guest ={
    name: name,
    email:"Guest@Optimum.com",
    nric: nric,
    mobileNo: mobile,
    educationLevel: educationLevel,
    gpa: gpa,
    graduationYear: graduationYear
}
  
  axios.post('http://192.168.200.200:8080/backendapi/guest/register',guest)
      .then(res =>{
        if(res.data != -1){
        localStorage.setItem("GuestId",res.data)
          return (
            // this.props.history.push('./RegistrationComplete')      
            this.setState({
              message:true
            }) 
          )}
        else{
          this.setState({
            errorMessage:true
          })
      }  
      }
          
);
}
}

handleClose = () => {
  this.setState({errorMessage:false})
  this.setState({errorPoly:false})
  this.setState({errorUni:false})
}

  render() {
    const { name } = this.state;
    const { nric } = this.state;
    const { mobile } = this.state;
    const { educationLevel } = this.state;
    const { gpa } = this.state;
    const { graduationYear } = this.state;
    const handleClose = this.handleClose;
    const errorMessage = this.state.errorMessage;
    const errorPoly = this.state.errorPoly;
    const errorUni = this.state.errorUni;
    const message = this.state.message;


  
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
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            >
            <DialogTitle id="alert-dialog-title">{"NRIC has been registered once"}</DialogTitle>
            <Button
          margin="normal"
          fullWidth
          variant="contained"
      onClick={handleClose}>
        Okay
      </Button>

      </Dialog>
      <Dialog
            open={errorUni}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            >
            <DialogTitle id="alert-dialog-title">{"University GPA cannot be more than 5."}</DialogTitle>
            <Button
          margin="normal"
          fullWidth
          variant="contained"
      onClick={handleClose}>
        Okay
      </Button>

      </Dialog>
      <Dialog
            open={errorPoly}
            aria-labelledby="alert-dialog-title"
            >
            <DialogTitle id="alert-dialog-title">{"Polytechnic GPA cannot be more than 4"}</DialogTitle>
      <Button
          margin="normal"
          fullWidth
          variant="contained"
      onClick={handleClose}>
        Okay
      </Button>

      </Dialog>
      <Dialog
            open={message}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            >
            <DialogTitle id="alert-dialog-title">{"Registration Complete"}</DialogTitle>
            <NavLink to={{pathname:"/guest", openBoolean: true}} style={{"textDecoration": "none"}}>
            <Button margin='normal' variant='contain' fullWidth>
              Continue</Button>
            </NavLink>
            
      </Dialog>

      </React.Fragment>
    );
  }
}

export default InputForm;