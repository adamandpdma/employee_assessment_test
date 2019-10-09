import React, {createContext, Component } from "react";
import { Formik } from "formik";
import  AdminLoginForm  from "./AdminLoginForm";
import * as Yup from "yup";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const validationSchema = Yup.object({
  employeeid: Yup.string("Enter your Id")
  .min(2, "Id must contain at least 2 Digits")
  .required("Id is required"),
  Password: Yup.string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
});

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      open:false,
      details:[]
    };
  }


  
submitValues = ({employeeid,Password,event}) => {


  const postValue ={
    adminId: employeeid,
    password: Password
  }

const adminId = employeeid;

  axios.post('http://192.168.200.200:8080/backendapi/admin/' + adminId + "/login", postValue)
      .then((res => {
        console.log(res.data)
       { if (res.data === true) {
        axios.get("http://192.168.200.200:8080/backendapi/admin/" + adminId +"/profile/")
        .then(res => {
         console.log(res.data)
         localStorage.setItem('name', res.data.name)
         localStorage.setItem('profile', res.data.profileImg)
         console.log(localStorage.getItem('name'))
      })
          return (
            localStorage.setItem("isAuth", true),
            localStorage.setItem('adminid', employeeid),
            console.log(localStorage.getItem('adminid')),
            localStorage.setItem('password', Password),
              // localStorage.setItem('profile', this.state.details.profileImg)
            window.location='/admin'  
            // this.props.history.push('./admin')          
          )}
      else{
        return(
        this.setState({open:true}))
    }}
    }))

// const admin_id = employeeid;


//   axios.post('http://192.168.200.200:8080/backendapi/admin/' + admin_id + "/login")
//       .then(res => 
//         {if (res = true) {
//           return (this.props.history.push("./EditProfile"))
//         }}
// );
 
}

handleClose = () => {
  this.setState({open:false})
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
              render={props => <AdminLoginForm {...props} />}
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
