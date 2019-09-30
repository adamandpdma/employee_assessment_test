import React from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import NameIcon from "@material-ui/icons/SupervisorAccount";
import LockIcon from "@material-ui/icons/Lock";
import Container from '@material-ui/core/Container';
import { TextField, Typography } from '@material-ui/core';
import './Form.css'
import Popup from './ForgotPassword'
import withStyles from "@material-ui/core/styles/withStyles";
import './Home.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const styles = theme => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black"
  }, 
  button: {
    background: '#03f0fc',
  },
  typhography: {
    background: '#03f0fc',
    },
  navbar:{
     background: '#FFFFFF',
  },  
  container: {
    marginTop: theme.spacing(4),
  },
  selectbox:{
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    borderRadius: 4,
  },
  input:{
    padding: "5px",
  }

});

const employeeForm = withStyles(styles)(props => {
  const {
    values: { employeeid, email, employeeName, mobile, department},
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    classes
  } = props;

//   const [department, setDepartment] = React.useState('');
  const [open, setOpen] = React.useState(false);

//   function handleDepartmentChange(event) {
//     setDepartment(event.target.value);
//   }

  const handleClose= () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

const change = (name, e) => {
    handleChange(e);
    setFieldTouched(name, true, false);
  };




  return (
    <React.Fragment> 
    <form onSubmit={handleSubmit}>
    <Container
    className = {classes.container}
    component="main" 
    maxWidth="xs">
      <div>
      <Typography variant = "h4"
      className = {classes.typhography}>            
      Employee Register Page
      </Typography>
      </div>

      <div>
      <FormControl
              variant="outlined"
              margin="normal"
              fullWidth
              className={classes.selectbox}
      >
        <InputLabel >Department</InputLabel>
        <Select
        className= {classes.input}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={department}
          onChange={change.bind(null, "department")}
          inputProps={{
            name: 'department',
            id: 'department',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"HR"}>HR</MenuItem>
          <MenuItem value={"Developer"}>Developer</MenuItem>
          <MenuItem value={"Manager"}>Manager</MenuItem>
        </Select>
      </FormControl>
      </div>

      <div>
      <TextField
      input type = "number"
        id="employeeid"
        name="employeeid"
        helperText={touched.employeeid ? errors.employeeid : ""}
        error={touched.employeeid && Boolean(errors.employeeid)}
        label="Id"
        value={employeeid}
        onChange={change.bind(null, "employeeid")}
        variant="outlined"
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NameIcon />
            </InputAdornment>
          )
        }}
      />
      </div>

      <div>
      <TextField
        id="employeeName"
        name="employeeName"
        helperText={touched.employeeName ? errors.employeeName : ""}
        error={touched.employeeName && Boolean(errors.employeeName)}
        label="Full Name"
        value={employeeName}
        onChange={change.bind(null, "employeeName")}
        variant="outlined"
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NameIcon />
            </InputAdornment>
          )
        }}
      />
      </div>


      <div>
      <TextField
        id="email"
        name="email"
        helperText={touched.email ? errors.email : ""}
        error={touched.email && Boolean(errors.email)}
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        type="email"
        value={email}
        onChange={change.bind(null, "email")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          )
        }}
      />
      </div>

      <div>
      <TextField
      input type = "number"
        id="mobile"
        name="mobile"
        helperText={touched.mobile ? errors.mobile : ""}
        error={touched.mobile && Boolean(errors.mobile)}
        label="Mobile"
        value={mobile}
        onChange={change.bind(null, "mobile")}
        variant="outlined"
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NameIcon />
            </InputAdornment>
          )
        }}
      />
      </div>

      <div>
      <Button
      id = "Button"
        type="submit"
        margin="normal"
        fullWidth
        variant="contained"
        className = {classes.button}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          )
        }}
      >
        Register
      </Button>
      </div>
      </Container>
    </form>
    </React.Fragment>
  );
})

export default employeeForm