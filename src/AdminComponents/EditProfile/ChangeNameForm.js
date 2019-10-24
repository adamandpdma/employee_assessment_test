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
          button:{
            margin: theme.spacing(2),        
            marginLeft: theme.spacing(13),
            marginTop: theme.spacing(5),
          },
              textfield:{
      height:40
    }

  });
  

  const ChangeName = withStyles(styles)(props => {
    const {
    values: { name },
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldTouched,
    classes
  } = props;

  const change = (name, e) => {
    handleChange(e);
    setFieldTouched(name);
  };


  return (
    
    
    <form onSubmit = {handleSubmit}>
      <Grid>
      <div>
      <Typography variant = "h4"
      margin = "normal"
      className= {classes.typography}>            
      Edit Name
      </Typography>
      </div>  
      <div>
      <Typography 
      variant = "h7"
      margin = "normal"
      className= {classes.typographyOne}>
          Name:
      </Typography>
        <TextField
        id="name"
        name="name"
        className= {classes.textfield}
        helperText={touched.name ? errors.name : ""}
        error={touched.name && Boolean(errors.name)}
        value={name}
        onChange={change.bind(null, "name")}
        variant="outlined"
        margin="normal"
      />
      </div>  
      
      <div>
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

  );
})

export default ChangeName