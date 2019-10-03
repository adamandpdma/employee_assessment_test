import React, {createContext, Component } from "react";
import { Formik } from "formik";
import  HrLoginForm  from "./HrLoginForm";
import * as Yup from "yup";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


const validationSchema = Yup.object({
  employeeid: Yup.string("Enter your Id")
  .min(2, "Id must contain at least 2 Digits")
  .required("Id is required"),
  Password: Yup.string("")
    .min(8, "Password must contain atleast 8 characters")
    .required("Enter your password"),
});

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      open:false
    };
  }


  
submitValues = ({employeeid,Password,}) => {


  const postValue ={
    hrId: employeeid,
    password: Password
  }

const hrId = employeeid;

  axios.post('http://192.168.200.200:8080/backendapi/human-resources/' + hrId + "/login", postValue)
      .then((res => {
        console.log(res.data)
       { if (res.data === true) {
          return (
            localStorage.setItem('employeeid', employeeid),
            localStorage.setItem('password', Password),
            this.props.history.push('./HrEditProfile')          
          )}
      else{
        this.setState({open:true})

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
              render={props => <HrLoginForm {...props} />}
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
