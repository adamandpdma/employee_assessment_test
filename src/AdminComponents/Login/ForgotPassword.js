import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import { TextField } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import axios from 'axios'

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
    background: 'linear-gradient(45deg, #03a9f4 30%, #00bcd4 90%)',
  },
  link:{
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),

  },

}));

const Popup = () => {

const classes = useStyles();

const [open, setOpen] = useState(false);
const [Message, setMessage] = useState(false);
const [email, setEmail] = useState("");

const handleOpen = () => {
    setOpen(true);
  };

const handleClose = () => {
    setOpen(false);
    setMessage(false);
  }

const handleUserInput = (e) => {
    setEmail(e.target.value)
  }

const handleSubmit = (event,email) =>{

  const postValue ={
    email:email
    }

    axios.post('http://192.168.200.200:8080/backendapi/employee/forgot-password', postValue)
    .then((res => {
      console.log(res.data)
     { if (res.data === true) {
      setMessage(true);
    }
      else{
        alert('Invalid Email')
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
        onClose={handleClose}
        className={classes.modal}
      >
      <Typography 
          fullWidth
          className={classes.paper}>
          Enter Email
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

    <div>
      <Modal
      open = {Message}
      onClose={handleClose}
      className={classes.modal}>
        <Typography
        fullWidth
        className={classes.paper}>
          An email has been sent you!
        </Typography>
      </Modal>
      </div>
</React.Fragment>
  );
}

export default Popup