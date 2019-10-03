import React, { Component } from "react";
import { Formik } from "formik";
import  ChangeName  from "../../AdminComponents/EditProfile/ChangeNameForm";
import * as Yup from "yup";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


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

    const hrId = localStorage.getItem('employeeid')
    const CurrentName = localStorage.getItem('name')
    if(name != CurrentName){
      axios.post('http://192.168.200.200:8080/backendapi/human-resources/' + hrId + "/profile-name", postValue)
      .then((res => {
        console.log(res.data)
       { if (res.data === true) {
          return (
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
            <DialogTitle id="alert-dialog-title">{"Name has been changed"}</DialogTitle>
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
