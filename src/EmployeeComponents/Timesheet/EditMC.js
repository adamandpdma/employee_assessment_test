import React, {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import { TextField, Button} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {NavLink} from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const imgStyle ={
    width: "350px",
    height: "250px"
  }
  
  
  let KB = 0
class EditMC extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            dateFrom:'',
            dateTill:'',
            reason:'',
            company: '',
            empName: '',
            employeeId: 0,
            managerEmail: '',
            managerName: '',
            mcId: 0,
            noOfDays:0,
            file: '',
            imagePreviewUrl: '',
            backgroundColor: "",
            open: false,
            openSuccess: false,
            openChooseFile: false,
            uploadCount: 0,
            alreadyUpload: false,
            open: false,
            openExceed: false
        }
    }
    componentDidMount = () => {
        Axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/MCs/"+this.props.location.MCID+"")
        .then(res => {
            this.setState(
                {
                    dateFrom: res.data.dateFrom,
                    dateTill: res.data.dateTill,
                    imagePreviewUrl: `data:image/jpeg;base64,${res.data.mcImg}`,
                    reason: res.data.reason,
                    company: res.data.company,
                    empName: res.data.empName,
                    employeeId: res.data.employeeId,
                    managerEmail: res.data.managerEmail,
                    managerName: res.data.managerName,
                    mcId: res.data.mcId,
                    noOfDays: res.data.noOfDays
                }
            )
        })
    }


    _handleImageChange(e) {
      e.preventDefault();
     

      let file = e.target.files[0];
      
      this.getBase64(file).then(base64 => {
        localStorage["fileBase64"] = base64;
        console.debug("file stored",base64);
      });   
    }

    getBase64 = (file) => 
    {
      return new Promise((resolve,reject) => 
      {
         const reader = new FileReader();
         reader.onload = () => resolve(reader.result);
         reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            Holder: reader.result
          });
        }
         reader.onerror = error => reject(error);
         reader.readAsDataURL(file);
      });
    }
 
    handleChange = (date) => {
        this.setState({
          dateFrom: date,
        })  
      }; 
    handleChangeTwo = (date) => {
        this.setState({
          dateTill: date,
        })  
      }
    reasonHandler = (event) => {
        this.setState(
            {
                reason: event.target.value
            }
        )
    }
    handleClickOpen = () => {
        this.setState(
            {
                open: true
            }
        )
    }
    handleClose = () => {
        this.setState(
            {
                openExceed: false
            }
        )
    }
    onSubmitHandler = () => {
        let i = parseInt(Math.floor(Math.log(this.state.file.size) / Math.log(1024)));
        KB=  Math.round(this.state.file.size / Math.pow(1024, i), 2);
   
          if(KB > 64)
          {
            this.setState(
              {
               openExceed: true
              }
            )
          } 
          else{

        const Editvalues = [{
            mcId: this.state.mcId,
            empName: this.state.empName,
            employeeId: this.state.employeeId,
            dateFrom: this.state.dateFrom,
            dateTill: this.state.dateTill,
            noOfDays: this.state.noOfDays,
            managerName: this.state.managerName,
            managerEmail: this.state.managerEmail,
            company: this.state.company,
            reason: this.state.reason,
            mcImg: this.state.imagePreviewUrl.split(',')[1],
            hidden: true,
            approved: true       
        }]
        console.log(Editvalues)
        axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/MC/submit", Editvalues)
        .then(res => console.log(res.data))
        .then(this.handleClickOpen)
    }
    }
    render()
    {
        console.log(this.state.imagePreviewUrl)
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} style={imgStyle}/>);
        } else {
          $imagePreview = (<div><p className="previewText">Please select an Image for Preview</p><br/></div>);
        }
        return(
            <div>
        <Container     
        component="main" 
        maxWidth="sm"
        style={{borderRadius: '5px', border: "1px solid #BDBDBD", marginTop: "60px"}}>
        <h4 style={{"textAlign": "center"}}>EDIT MC</h4>
        <TableCell>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <b><p>From Date</p></b>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={this.state.dateFrom}
          onChange={(date) => this.handleChange( date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <b><p>To Date</p></b>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={this.state.dateTill}
          onChange={(date) => this.handleChangeTwo( date)}
          KeyboardButtonProps={{
            'aria-label': 'change date'      
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
        <div>
             <b><p>Reason</p></b>
             <TextField
               input type = "text"
               variant="outlined"
               margin="normal"
               fullWidth
               value={this.state.reason}
               onChange={this.reasonHandler}
               multiline={true}
               />
         </div><br/>
         <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
          </form>
          <div >
            {$imagePreview}
          </div>

          {/* Dialog Boxes */}
          <div>
        <Dialog
        open={this.state.openExceed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Image size cannot exceed 64KB!"}</DialogTitle> 
        <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
         OKAY
        </Button>
        </DialogActions>
      </Dialog>

   
      <Dialog
        open={this.state.open}
        onClose={this.handleCloseChooseFile}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Successfully edited and submitted your MC!"}</DialogTitle>
        <DialogActions>
           <NavLink   to={{pathname: '/employee/viewMCAttachment',
             timesheetId: this.props.location.timesheetId,
             mcId: this.props.location.mcId,
            name: "editTimesheet"}}
            style={{"textDecoration":"none"}}><Button color="primary" autoFocus>
         OKAY
        </Button></NavLink> 
        </DialogActions>
      </Dialog>

           </div>
        </div>
            <Button variant="contained" 
            style={{"backgroundColor": "#648fcc", "color": "white", "margin": "30px"}}
            onClick={this.onSubmitHandler}
            >SAVE CHANGES</Button>
             <NavLink 
             to={{pathname: '/employee/viewMCAttachment',
             timesheetId: this.props.location.timesheetId,
             mcId: this.props.location.mcId,
             name: "editTimesheet"}}
             style={{"textDecoration":"none"}}><Button variant="contained" 
             style={{"backgroundColor": "#648fcc", "color": "white"}}
            >BACK</Button></NavLink>
         </TableCell>
         </Container>
         </div>
        )
    }
}
export default EditMC;