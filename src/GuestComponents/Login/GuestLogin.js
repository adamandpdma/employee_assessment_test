import React, {createContext, Component } from "react";
import { Formik } from "formik";
import  GuestLoginForm  from "./GuestLoginForm";
import * as Yup from "yup";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({ 
  button: {
    background: '#03f0fc',
    color: 'white',
  },
 
})


const validationSchema = Yup.object({
  employeeid: Yup.string("Enter your Id")
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


  
submitValues = ({employeeid,Password,event}) => {


  const postValue ={
    guestLoginId: employeeid,
    password: Password
  }


  axios.post('http://192.168.200.200:8080/backendapi/guest/login', postValue)
      .then((res => {
        console.log(res.data)
       { if (res.data === true) {
          return (
            localStorage.setItem("isAuth", true),
            localStorage.setItem('guestid', employeeid),
            window.location='./guest' 
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
    const { classes } = this.props;
    const { employeeid } = this.state;
    const { Password } = this.state;
  
    const values = {
      employeeid: employeeid,
      Password:   Password,
    };

    return (
      <React.Fragment>
            <Formik
              render={props => <GuestLoginForm {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitValues}
            />
            <Dialog
            open={this.state.open}
            aria-labelledby="alert-dialog-title"
            >
            <DialogTitle id="alert-dialog-title">{"Invalid Credentials, Please try again"}</DialogTitle>
            <Button
          className= {classes.button}
          margin="normal"
          fullWidth
          variant="contained"
      onClick={this.handleClose}>
        Okay
      </Button>

            </Dialog>
      </React.Fragment>
    ); 
  }
}

InputForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputForm);