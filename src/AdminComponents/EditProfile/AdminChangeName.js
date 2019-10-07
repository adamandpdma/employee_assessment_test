import React, { Component } from "react";
import { Formik } from "formik";
import  ChangeName  from "./ChangeNameForm";
import * as Yup from "yup";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import {NavLink} from 'react-router-dom';


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
        message:false,
        errorMessage:false
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
            localStorage.setItem("name",name),
            this.setState({message:true})
            )}}
      }))
    }
    else{
      this.setState({errorMessage:true})
    }
  };
  
  handleClose = () => {
    this.setState({message:false})
    this.setState({errorMessage:false})

  }

  render() {
    const classes = this.props;
    const handleClose = this.handleClose
    const message = this.state.message
    const errorMessage = this.state.errorMessage
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
            <Dialog
            open={message}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Name has been changed. Please log out to see changes"}</DialogTitle>
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
            <DialogTitle id="alert-dialog-title">{"Name is same as current name!"}</DialogTitle>
      </Dialog>

      </React.Fragment>
    );
  }
}

export default InputForm;
