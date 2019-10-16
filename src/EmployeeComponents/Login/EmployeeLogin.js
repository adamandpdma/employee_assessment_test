import React, {createContext, Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import EmployeeLoginForm from "./EmployeeLoginForm";
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
  .min(1, "Id must contain at least 2 Digits")
  .required("Id is required"),
  Password: Yup.string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
});

class employeeLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      open:false,
      authenticated: true
    };
  }


  
  submitValues = ({employeeid,Password,event}) => {


    const postValue ={
      employeeId: employeeid,
      password: Password
    }
  
  const empid = employeeid;
  
    axios.post('http://192.168.200.200:8080/backendapi/employee/' + empid + "/login", postValue)
        .then(res =>
         { if (res.data === true) {
          axios.get("http://192.168.200.200:8080/backendapi/employee/" + empid +"/profile/")
          .then(res => {
           console.log(res.data)
           localStorage.setItem('name', res.data.name)
           localStorage.setItem('profile', res.data.profileImg)
           console.log(localStorage.getItem('name'))
           console.log("Admin Id:" + localStorage.getItem('adminid'))
           console.log("Employee Id:" + localStorage.getItem('employeeid'))
           localStorage.setItem("isAuth", true)
           localStorage.setItem('employeeid', employeeid)
           localStorage.setItem('password', Password)
           //localStorage.setItem('isAuth', this.state.authenticated),
           window.location='./employee'
        })  
            // return (
            //   // this.props.history.push('./employee')          
            // )
          }
        else{
          console.log(postValue)
          console.log(res.data)
          this.setState({open:true})
        }}
  );
  }

  handleClose = () => {
    this.setState({open:false})
  }
  
  render() {
    const {classes} = this.props;
    const { employeeid } = this.state;
    const { Password } = this.state;
  
    const values = {
      employeeid: employeeid,
      Password:   Password,
    };

    return (
      <React.Fragment>
            <Formik
              render={props => <EmployeeLoginForm {...props} />}
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

employeeLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(employeeLogin);