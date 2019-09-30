import React, {createContext, Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import  Form  from "./Form";
import * as Yup from "yup";
import axios from 'axios';
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

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      auth:false
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
          return (
            localStorage.setItem('employeeid', employeeid),
            localStorage.setItem('password', Password),
            this.props.history.push('./EditProfile')          
          )}
      else{
        alert("Invalid")

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

  render() {
    const { employeeid } = this.state;
    const { Password } = this.state;
  
    const values = {
      employeeid: employeeid,
      Password:   Password,
    };

    return (
      <React.Fragment>
                    <div><img className='bg' src={background} /></div>
            <Formik
              render={props => <Form {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitValues}
            />
      </React.Fragment>
    );
  }
}

export default InputForm;
