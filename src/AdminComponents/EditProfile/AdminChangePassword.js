import React, { useContext, Component } from "react";
import { Formik } from "formik";
import  ChangePassword  from "./ChangePasswordForm";
import * as Yup from "yup";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {NavLink} from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


const alphanumeric = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/

const validationSchema = Yup.object({
  Password: Yup.string("")
    .min(6, "Password must contain at least 6 characters")
    .required("Enter your password"),
  newPassword: Yup.string("")
    // .matches(alphanumeric, "Password must be alphanumeric")
    .min(6,"Password must contain at least 6 characters")
    .max(12,"Password cannot have more then 12 characters")
    .notOneOf([Yup.ref("Password")],"Cannot be same as Current Password")
    .required("Enter your new password"),
  retypePassword: Yup.string("Enter your new password again")
    .required("Confirm your password")
    .oneOf([Yup.ref("newPassword")], "Password does not match")

});

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: "",
      newPassword: "",
      message:false,
      errorMessage:false

  };
  }
 
  submitValues = ({Password,newPassword,retypePassword}) => {

    const adminId = localStorage.getItem('employeeid')
    const postData = {
      
    }
    const postValue ={
      headers: {
        newpassword : newPassword,
        oldpassword : Password
      }
    }
    console.log(postValue)


    axios.post('http://192.168.200.200:8080/backendapi/admin/'+adminId+'/profile-password', postData, postValue)
    .then((res => {
      console.log(res.data)
     { if (res.data === true) {
        return (
          this.setState({message:true})
          )}
      else{
        this.setState({errorMessage:true})
      }}
    }))    
  }

  handleClose = () => {
    this.setState({message:false})
    this.setState({errorMessage:false})

  }


  render() {
    const values = {
      Password: "",
      newPassword: "",
      retypePassword: "",
    };
    const handleClose = this.handleClose
    const message = this.state.message
    const errorMessage = this.state.errorMessage


    return (
      <React.Fragment>        
            <Formik
              render={props => <ChangePassword {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitValues}
            />
            <Dialog
            open={message}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Password has been changed"}</DialogTitle>
            <Button
          margin="normal"
          fullWidth
          variant="contained"
          >
      <NavLink to={'/admin'}>Okay</NavLink>
      </Button>

      </Dialog>
      
      <Dialog
            open={errorMessage}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Current password is invalid!"}</DialogTitle>
      </Dialog>

      </React.Fragment>
    );
  }
}

export default InputForm;
