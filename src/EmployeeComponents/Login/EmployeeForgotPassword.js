import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import { TextField } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from '../../close.png';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import LoadingIcon from '../../Loading.gif';


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    background: '#03f0fc',
    color:'white'
  },
  closeButton: {
    background: '#03f0fc',
    left:'63%'
  },
  loadinCloseButton: {
    background: '#03f0fc',
    left:'75%'
  },
  link:{
    cursor: "pointer",
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),

  },

}));

const Popup = () => {

const classes = useStyles();

const [open, setOpen] = useState(false);
const [message, setMessage] = useState(false);
const [errorMessage, setErrorMessage] = useState(false);
const [loading, setLoading] = useState(false);
const [email, setEmail] = useState("");

const handleOpen = () => {
    setOpen(true);
  };

const handleClose = () => {
    setOpen(false);
    setMessage(false);
    setErrorMessage(false);
    setLoading(false);
  }

const handleUserInput = (e) => {
    setEmail(e.target.value)
  }

const handleSubmit = (e) =>{

  setLoading(true);

  console.log(email)
  const postValue = {
    department: "",
    email: email,
    employeeId: "",
    isActive: true,
    isApproved: true,
    mobileNo: "",
    name: "",
    password: "",
    profileImg: ""
  }

    axios.post('http://192.168.200.200:8080/backendapitest/employee/forgot-password', postValue)
    .then((res => {
      console.log(res.data)
     { if (res.data === true) {
      setLoading(false);
      setMessage(true);
    }
      else{
      setLoading(false);
      setErrorMessage(true);
      }}
    }))    
  }

  return (
    <React.Fragment>
    <div>
      <Link 
      variant="contained" 
      onClick={handleOpen}
      className={classes.link}>
        Forget Password?
      </Link>
      <Modal
        open={open}
        className={classes.modal}
      >
      <Typography 
          fullWidth
          className={classes.paper}>
          Enter Email
          <Button onClick={handleClose} className={classes.closeButton}>
          <img src={Close}/>	
          </Button>
          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="Email"
          placeholder = "Email" 
          value = {email}
          onChange={handleUserInput}
          />
      <Button
          type="submit"
          margin="normal"
          fullWidth
          variant="contained"
          className={classes.button}
          onClick={handleSubmit}>
          Send Verification Link  
      </Button>
      </Typography>

      </Modal>
      </div>  

      <Dialog
            open={loading}
            onClose={loading}
            >
            <DialogTitle>{         
            <Button onClick={handleClose} className={classes.loadinCloseButton}>
            <img src={Close}/>	
            </Button>}
            </DialogTitle>
            <DialogContent>
            <center>
          <DialogContentText >{"Loading... This may take a while."}</DialogContentText>    
          <DialogContentText >
            <img src = {LoadingIcon}></img>
          </DialogContentText>
          </center>  
        </DialogContent>
      </Dialog>
    
      <Dialog
            open={message}
            aria-labelledby="alert-dialog-title"
            >
            <DialogTitle id="alert-dialog-title">{"An email containing your reset password has been sent to your registered email address."}</DialogTitle>
            <Button
          className= {classes.button}
          margin="normal"
          fullWidth
          variant="contained"
      onClick={handleClose}>
        Okay</Button>
      </Dialog>
      
      <Dialog
            open={errorMessage}
            aria-labelledby="alert-dialog-title"
            >
            <DialogTitle id="alert-dialog-title">{"Invalid Email, Please try again"}</DialogTitle>
            <Button
          className= {classes.button}
          margin="normal"
          fullWidth
          variant="contained"
      onClick={handleClose}>
        Okay
      </Button>
      </Dialog>
  
</React.Fragment>
  );
}

export default Popup