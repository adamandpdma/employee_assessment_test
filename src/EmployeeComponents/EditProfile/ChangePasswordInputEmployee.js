import React, { useContext, Component } from "react";
import { Formik } from "formik";
import  ChangePassword  from "./ChangePassword";
import * as Yup from "yup";
import axios from "axios";

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
      newPassword: ""
  };
  }
 
  submitValues = ({Password,newPassword,retypePassword}) => {

    const empid = localStorage.getItem('employeeid')
    const postData = {
      
    }
    const postValue ={
      headers: {
        newpassword : newPassword,
        oldpassword : Password
      }
    }
    console.log(postValue)


    axios.post('http://192.168.200.200:8080/backendapi/employee/'+empid+'/update-profile-password', postData, postValue)
    .then((res => {
      console.log(res.data)
     { if (res.data === true) {
        return (
        alert('Password has been changed')      
        )}
      else{
        alert('Current Password is invalid')
      }}
    }))    
  }

  render() {
    const values = {
      Password: "",
      newPassword: "",
      retypePassword: "",
    };

    return (
      <React.Fragment>        
            <Formik
              render={props => <ChangePassword {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitValues}
            />
      </React.Fragment>
    );
  }
}

export default InputForm;
