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
import {Link} from 'react-router-dom';
import './Home.css'
import auth from './auth'



const styles = theme => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black"
  }, 
  button: {
    background: '#03f0fc',
  },
  container: {
    background: '#03f0fc',
    },

});

const Form = withStyles(styles)(props => {
  const {
    values: { employeeid, Password },
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    classes
  } = props;

  const change = (name, e) => {
    handleChange(e);
    setFieldTouched(name, true, false);
  };


  return (
    <React.Fragment className = "login">
    <form onSubmit={handleSubmit}>
      <Container
      component="main" 
      maxWidth="xs">
      <div>
      <Typography variant = "h4"
      className = {classes.container}>            
      Admin Login Page
      </Typography>
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
        id="Password"
        name="Password"
        helperText={touched.Password ? errors.Password : ""}
        error={touched.Password && Boolean(errors.Password)}
        label="Password"
        variant="outlined"
        margin="normal"
        fullWidth
        type="Password"
        value={Password}
        onChange={change.bind(null, "Password")}
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
      <Popup
      className={classes.link}/>
      </div>

      <div>
      <Button onClick={() => {
        auth.login()
      }}
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
        Login
      </Button>
      </div>
      
      <div>
      <Button
      margin="normal"
      fullWidth>      
     <Link to={`/`}>Switch User</Link>
      </Button>  
      </div>

      </Container>
    </form>
    </React.Fragment>
  );
})

export default Form


// import React, {Component} from 'react'
// import './Form.css'
// import Container from '@material-ui/core/Container';
// import { TextField, Typography } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Popup from './Popup'

// class Form extends Component {
//     constructor (props) {
//         super(props);
//         this.state = {
//             Id : "",
//             Password : ""
//         }
//       }

//       handleUserInput = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         this.setState({[name]: value})
//       }

//       handleSubmit = (event) => {
//           const checkId = this.state.Id;
//           const checkPassword = this.state.Password;
//           if (checkId.length < 6) {
//             alert("Id is not long enough");
//             event.preventDefault();
//             return;
//         }
          
//           if (checkPassword.length < 8) {
//               alert("Password is not long enough")
//               event.preventDefault();
//               return;
//           }

//       }
    

//     render(){

//       const { classes } = this.props;

//       return(
//         <Container 
//         component="main" 
//         maxWidth="xs"
//         >
//         <div>
//             <Typography variant = "h4"
//             className={classes.container}>
//             Login Page
//             </Typography>
//         </div>
//         <form 
//         onSubmit={this.handleSubmit}>
//         <div>
//             <TextField
//             input type = "number"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             InputProps={{
//               classes: {
//                 notchedOutline: classes.notchedOutline
//               }
//             }}
//             className = "textfield"
//             name="Id"
//             placeholder = "Id" 
//             value = {this.state.Id} 
//             onChange={this.handleUserInput}
//             />  
//             {/* <label htmlFor id> Id </label>
//             <input type = "number" 
//             name="Id"
//             placeholder = "Id" 
//             value = {this.state.Id} 
//             onChange={this.handleUserInput}></input> */}
//           </div>
//           <div>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             InputProps={{
//               classes: {
//                 notchedOutline: classes.notchedOutline
//               }
//             }}
//             className = "textfield"
//             name="Password"
//             placeholder = "Password" 
//             value = {this.state.Password} 
//             onChange={this.handleUserInput}
//             />      
//           {/* <label htmlFor password>Password</label>
//           <input type = "password" 
//           name="Password"
//           placeholder = "Password" 
//           value = {this.state.Password} 
//           onChange = {this.handleUserInput}></input> */}
//           </div>
//           <div>
//           <Button
//             type="submit"
//             margin="normal"
//             fullWidth
//             variant="contained"
            // className={classes.button}>
//           <LockOutlinedIcon /> Login
//           </Button>
//           <Popup></Popup>
//             {/* <input type = "submit" 
//             value="Login"></input> */}
//           </div>
//         </form>
//         </Container>
//       )
//     }
// }

//   export default withStyles(styles) (Form)


