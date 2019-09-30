import React, { Component } from "react";
import { Formik } from "formik";
import  ChangeName  from "./ChangeName";
import * as Yup from "yup";
import axios from 'axios';

const validationSchema = Yup.object({
    name: Yup.string("")
    .min(6, "Name must contain at least 6 Characters")
    .required("Name is required"),
});

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
    };
  }

  submitValues = ({name}) => {

    const postValue ={
      name: name,
    }

    const adminId = localStorage.getItem('employeeid')
    const CurrentName = localStorage.getItem('name')
    if(name != CurrentName){
      axios.post('http://192.168.200.200:8080/backendapi/admin/' + adminId + "/profile-name", postValue)
      .then((res => {
        console.log(res.data)
       { if (res.data === true) {
          return (
            alert('Name has been changed')      
          )}}
      }))
    }
    else{
      alert("Name same as current name")
    }
  };
  
  render() {
    const classes = this.props;
    const values = {
      name: "",
    };

    return (
      <React.Fragment>
            <Formik
              render={props => <ChangeName {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitValues}
            />
      </React.Fragment>
    );
  }
}

export default InputForm;
