import React from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import NameIcon from "@material-ui/icons/SupervisorAccount";
import LockIcon from "@material-ui/icons/Lock";
import Container from '@material-ui/core/Container';
import { TextField, Typography } from '@material-ui/core';
import '../../Form.css'
import Logo from '../../OptimumLogoRegister.png'
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';



const styles = theme => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black"
  }, 
  button: {
    background: '#03f0fc',
    marginBottom: theme.spacing(1),

  },
  typhography: {
    background: '#03f0fc',
    },
  navbar:{
     background: '#FFFFFF',
  },  
  container: {
    marginBottom: theme.spacing(4),
    background: '#FFFFFF',
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


const GuestRegisterForm = withStyles(styles)(props => {
  const {
    values: { name, nric, mobile, educationLevel, gpa, graduationYear},
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    classes
  } = props;

  const [open, setOpen] = React.useState(false);

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

    <div>
    <center>
    <img src = {Logo}
      width="401" height="100"/>
      </center>
                   
    </div>

    <Container
    className = {classes.container}
    component="main" 
    maxWidth="sm"
    style={{borderRadius: '10px'}}
    >
      <div>
      <TextField
        id="name"
        name="name"
        helperText={touched.name ? errors.name : ""}
        error={touched.name && Boolean(errors.name)}
        label="Name"
        value={name}
        onChange={change.bind(null, "name")}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      </div>

      <div>
      <TextField
        id="nric"
        name="nric"
        helperText={touched.nric ? errors.nric : ""}
        error={touched.nric && Boolean(errors.nric)}
        label="NRIC"
        value={nric}
        onChange={change.bind(null, "nric")}
        variant="outlined"
        margin="normal"
        fullWidth
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
      />
      </div>
      <div>
      <Grid container spacing={3}>


        <Grid item xs={6}> 
        <FormControl
              variant="outlined"
              margin="normal"
              fullWidth
              className={classes.selectbox}
      >
        <InputLabel >Highest Education</InputLabel>
        <Select
        className= {classes.input}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={educationLevel}
          helperText={touched.educationLevel ? errors.educationLevel : ""}
          error={touched.educationLevel && Boolean(errors.educationLevel)}  
          onChange={change.bind(null, "educationLevel")}
          name= 'educationLevel'
          id= 'educationLevel'
        >
          <MenuItem value="">
            <em>-- Select --</em>
          </MenuItem>
          <MenuItem value={"University"}>University</MenuItem>
          <MenuItem value={"Polytechnic"}>Polytechnic</MenuItem>
        </Select>
      </FormControl>
        </Grid>


        <Grid item xs={6}>
        <TextField
      input type = "number"
        id="gpa"
        name="gpa"
        helperText={touched.gpa ? errors.gpa : ""}
        error={touched.gpa && Boolean(errors.gpa)}
        label="GPA"
        value={gpa}
        onChange={change.bind(null, "gpa")}
        variant="outlined"
        margin="normal"
        fullWidth
      />
        </Grid>
        </Grid>
        </div>

      <div>
      <TextField
        id="graduationYear"
        name="graduationYear"
        helperText={touched.graduationYear ? errors.graduationYear : ""}
        error={touched.graduationYear && Boolean(errors.graduationYear)}
        label="Year of Graduation"
        variant="outlined"
        margin="normal"
        fullWidth
        value={graduationYear}
        onChange={change.bind(null, "graduationYear")}
      />
      </div>

      <div>
      <Button
      // onClick={() => {
      //   auth.register()
      // }}
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

export default GuestRegisterForm