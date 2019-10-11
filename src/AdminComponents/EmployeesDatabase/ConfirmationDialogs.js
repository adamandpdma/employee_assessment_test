import React from "react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Input, createMuiTheme, MuiThemeProvider } from "@material-ui/core";


export const FormActivateDialog=(props) => {

    const [open, setOpen] = React.useState(false);

    const color = "#696969";
    const theme = createMuiTheme({
      palette: {
        common: { black: color, white: color },
        primary: { main: color, dark: color, light: color },
        text: { primary: color, secondary: color }
      }
    });
    
    function handleClickOpen() {
      setOpen(true)
  
    }
  
    function handleClose() {
      setOpen(false);
  
    } 

    let activatebtn 
    if(props.status === "Active") {
        activatebtn = <Button id="activate" onClick={handleClickOpen} disabled={true}  style={{"text-transform": "none", "color": 'grey'}}variant="contained">Activate Account</Button>
    } else {
      activatebtn = <Button id="activate" onClick={handleClickOpen} disabled={false}  style={{"text-transform": "none", "color": 'green'}}variant="contained">Activate Account</Button>
    }
  
    return (
  
      <div>
        
        {activatebtn}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form className="mui-form" onSubmit={props.onSubmit}>
          <DialogTitle id="form-dialog-title">Activate Employee Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
             Please provide administrator password to confirm changes
            </DialogContentText>

            <MuiThemeProvider theme={theme}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              
            />
            </MuiThemeProvider>
          </DialogContent>
          <DialogActions> 
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button type="submit" onClick={props.onChangeActivate}>Confirm</Button>
          </DialogActions> 
          </form>
        </Dialog> 
      </div>
    );
  }
  

  export const FormDeactivateDialog=(props) => {
  
    const [open, setOpen] = React.useState(false);
    
    function handleClickOpen() {
      setOpen(true)
  
    }
  
    function handleClose() {
      setOpen(false);
  
    }

    let deactivatebtn 
    if(props.status === "Inactive") {
        deactivatebtn = <Button id="deactivate" onClick={handleClickOpen} disabled={true}  style={{"text-transform": "none", "color": 'grey'}}variant="contained">Deactivate Account</Button>
    } else {
      deactivatebtn = <Button id="deactivate" onClick={handleClickOpen} disabled={false}  style={{"text-transform": "none", "color": '#8b0000'}}variant="contained">Deactivate Account</Button>
    }

    return (
  
      <div>
     
        {deactivatebtn}  
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form className="mui-form" onSubmit={props.onSubmit}>
          <DialogTitle id="form-dialog-title">Deactivate Employee Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
             Please provide administrator password to confirm changes
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              
              
            />
          </DialogContent>
          <DialogActions> 
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button type="submit" onClick={props.onChangeDeactivate}>Confirm</Button>
          </DialogActions> 
          </form>
        </Dialog> 
      </div>
    );
  }