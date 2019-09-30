import React from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import Link from '@material-ui/core/Link';
import { TextField, Typography, Grid } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "black"
    }, 
    typography:{
      margin: theme.spacing(1),        
      marginLeft: theme.spacing(11),
    },
    typographyOne:{
            display: "inline-block",
            margin: theme.spacing(2.5),        
            marginRight: theme.spacing(4),
          },
    typographyTwo:{
      display: "inline-block",
      margin: theme.spacing(2),        
},
    typographyThree:{
      display: "inline-block",
      margin: theme.spacing(2.5),        
      marginRight: theme.spacing(4),
},
    typographyFour:{
      display: "inline-block",
      margin: theme.spacing(2),        
      marginRight: theme.spacing(2),
},
button:{
  margin: theme.spacing(2), 
  marginLeft: theme.spacing(15),       
  marginTop: theme.spacing(5),

},

textfield:{
      height:40
    }

  });
  

  const ResetPassword = withStyles(styles)(props => {
    const {
    values: { Password, newPassword, retypePassword},
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
    <React.Fragment>
    <form onSubmit = {handleSubmit}>
      <Grid>
      <div>
      <Typography variant = "h4"
      margin = "normal"
      className= {classes.typography}>            
      Edit Password
      </Typography>
      </div>  
      <div>
      <Typography 
      variant = "h7"
      margin = "normal"
      className= {classes.typographyTwo}>
          Current Password:
      </Typography>
      <TextField
        id="Password"
        name="Password"
        className= {classes.textfield}
        helperText={touched.Password ? errors.Password : ""}
        error={touched.Password && Boolean(errors.Password)}
        variant="outlined"
        margin="normal"
        type="Password"
        value={Password}
        onChange={change.bind(null, "Password")}
      />
      </div>
      
      <div>
      <Typography 
      variant = "h7"
      margin = "normal"
      className= {classes.typographyThree}>
          New Password:
      </Typography>
      <TextField
        id="newPassword"
        name="newPassword"
        className= {classes.textfield}
        helperText={touched.newPassword ? errors.newPassword : ""}
        error={touched.newPassword && Boolean(errors.newPassword)}
        variant="outlined"
        margin="normal"
        type="Password"
        value={newPassword}
        onChange={change.bind(null, "newPassword")}

      />
      </div>
      
      <div>
      <Typography 
      variant = "h7"
      margin = "normal"
      className= {classes.typographyFour}>
          Re-type Password:
      </Typography>
      <TextField
        id="retypePassword"
        name="retypePassword"
        className= {classes.textfield}
        helperText={touched.retypePassword ? errors.retypePassword : ""}
        error={touched.retypePassword && Boolean(errors.retypePassword)}
        variant="outlined"
        margin="normal"
        type="Password"
        value={retypePassword}
        onChange={change.bind(null, "retypePassword")}
      />
      </div>

      <div>
      <Link>
      Back
      </Link>  
      <Button
      id = "Button"
        type="submit"
        margin="normal"
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
        Submit
      </Button>
      </div>
      </Grid>
    </form>
    </React.Fragment>    

  );
})

export default ResetPassword