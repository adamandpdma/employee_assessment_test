import React, {Component} from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { isEmptyChildren } from 'formik';


class ViewMCAttachment extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            MC : [],
            open: false,
            McId: 0,
            open: false,
            openConfirmation: false,
            name: this.props.location.name,
            timesheetId: this.props.location.timesheetId,
            mcId: this.props.location.mcId
        }
    }
    
  componentDidMount = () => 
            {
    this.setState({
      MC : [],
    })
     this.ImageData()
            }
  ImageData = () => 
            {
              console.log(this.props.location.mcId)
              if(this.props.location.mcId === undefined)
              {
                alert("No, MC attached")
                // window.location='/employee/fillTimesheet'
              }
              else
              {
                for(let i=0; i< this.props.location.mcId.length - 1; i ++)
                {
                    axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/MCs/"+this.props.location.mcId[i]+"")
                    .then(res => {
                      if(res.data.hidden === false)
                      {
                        this.setState({
                          MC: [...this.state.MC, res.data],
                          // res.data.mcImg  
                      })
                      }
                    })
                }
              }
             }
 
    ImageLoop = () => 
              {
        return (
        this.state.MC.map(image => {
          return(
            <div>
            <PopupState variant="popover" popupId="demo-popup-popover">
                       {popupState => (
                         <div>

                           <img id="myImg" src={`data:image/jpeg;base64,${image.mcImg}`} alt="Test" style={{"width":"100%","max-width":"300px"}} {...bindTrigger(popupState)}  /> 


                           <Popover
                             {...bindPopover(popupState)}
                             anchorOrigin={{
                               vertical: 'bottom',
                               horizontal: 'center',
                             }}
                             transformOrigin={{
                               vertical: 'top',
                               horizontal: 'center',
                             }}
                           >
                             <Typography>
                             <img id="myImg" src={`data:image/jpeg;base64,${image.mcImg}`} style={{"width":"700px","height":"500px"}} alt="Test" />
                             </Typography>
                           </Popover>
                         </div>
                       )}
                     </PopupState> <br/>
                     {this.state.name === "editTimesheet" && (
                       <div>
                      <NavLink 
                      to={{pathname: '/employee/editMC',
                      timesheetId: this.state.timesheetId,
                      mcId: this.state.mcId,
                      MCID: image.mcId}}
                      style={{"textDecoration": "none"}}>
                      <Button variant="contained" style={{"margin": "20px",
                      "borderRadius":"25px"}}>EDIT</Button></NavLink> 
                       <Button variant="contained" 
                       style={{"margin": "20px",
                      "borderRadius":"25px"}}
                       href="#" onClick = {() => this.deleteMCConfirmation(image.mcId,this.state.timesheetId,this.state.name, this.state.mcId)} >DELETE</Button>
                       </div>
                     )}
                   </div>)}))
                 }
    deleteMCConfirmation = (mcId,timesheetId) => 
    {
    this.setState(
      {
        open: true,
        McId: mcId,
        timesheetId: timesheetId,
        name: this.state.name,
        mcId: this.state.mcId
      }
    )
    }
    handleClose = () => 
    {
      this.setState(
        {
          open: false,
          name: this.state.name,
          mcId: this.state.mcId
          // MC: this.state.MC
        }
      )
    }
    handleCloseConfirmation = () => {
      this.setState(
        {
          openConfirmation: false,
          name: this.state.name,
          mcId: this.state.mcId
          // MC: this.state.MC
        }
      )
    }
    handleclickopen = () => 
    {
      this.setState(
        {
          openConfirmation: true,
          name: this.state.name,
          mcId: this.state.mcId
          // MC: this.state.MC
        }
      )
    }
    deleteMC = () => {
      this.setState(
        {
          open: false,
          name: this.state.name,
          mcId: this.state.mcId
          // MC: this.state.MC
        }
      )
     axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/MCs/"+this.state.McId+"/hide")
     .then((res) => console.log(res.data)) 
     .then(this.handleclickopen)
  
     this.setState(
         {
             MC: this.state.MC.filter(el => el.mcId !== this.state.McId) ,
             name: this.state.name,
             mcId: this.state.mcId
         }
     )
    }
    
    render()
    {
      console.log("MC CHECK", this.props.location.mcId)
      console.log(this.state.MC.length, "HELLO MC")
        return(
        <div>
           <Container   component="main" 
                 maxWidth="sm"
                 style={{borderRadius: '5px', border: "1px solid #BDBDBD"}}>
            <h3>MEDICAL CERTIFICATE ATTACHMENTS</h3>
            <br/>
            <br/>
              {this.ImageLoop()}
              {this.state.MC.length === 0 && (
                <p>Sorry, NO Mc attached to the Timesheet.</p>
              )}
                  <br/>         
                  <br/>
                  <br/>
                  {this.state.name === "fillTimesheet" && (
                            <NavLink to={{pathname:'/employee/fillTimesheet',
                            month: this.props.location.month,
                            year: this.props.location.year,
                            mcIds: this.props.location.mcIds,
                            empID: this.props.location.empID,
                            empName: this.props.location.empName,
                            managerEmail: this.props.location.managerEmail,
                            managerName: this.props.location.managerName,
                            clientCompany: this.props.location.clientCompany }}
                           style={{"textDecoration": "none"}}
                           onClick={this.onClickContinue}>
                             <Button variant="contained" 
                             onClick ={this.onClickContinue}
                             style={{"backgroundColor": "#648fcc", "color": "white", "margin": "10px"}}>BACK</Button>
                             </NavLink>
                  )}

                        {this.state.name === "viewTimesheet" && (
                       <NavLink to={{pathname:'/employee/viewSubmittedTimesheet',
                       timesheetId: this.state.timesheetId}}
                       style={{"textDecoration": "none"}}
                       onClick={this.onClickContinue}>
                         <Button variant="contained" onClick ={this.onClickContinue}
                          style={{"backgroundColor": "#648fcc", "color": "white", "margin": "10px"}}>BACK</Button>
                         </NavLink>
                  )}
                   {this.state.name === "editTimesheet" && (
                       <NavLink to={{pathname:'/employee/editTimesheet',
                       timesheetId: this.state.timesheetId}}
                       style={{"textDecoration": "none"}}
                       onClick={this.onClickContinue}>
                         <Button variant="contained" onClick ={this.onClickContinue}
                          style={{"backgroundColor": "#648fcc", "color": "white", "margin": "10px"}}>BACK</Button>
                         </NavLink>
                  )}
  
                          <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                        >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete ?"}</DialogTitle>
 
                    <DialogActions>
                    <Button onClick ={this.handleClose}>
                     CANCEL
                     </Button>
                       <Button onClick ={this.deleteMC}>
                          CONFIRM
                         </Button>
                       </DialogActions>
                        </Dialog>

                        <Dialog
                          open={this.state.openConfirmation}
                          aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            >
                        <DialogTitle id="alert-dialog-title">{"Successfully Deleted your Timesheet !"}</DialogTitle>

                        <   DialogActions>
              <NavLink   to={{pathname: '/employee/editTimesheet',
             timesheetId: this.state.timesheetId,
             mcId: this.state.mcId,
            name: "editTimesheet"}}
            style={{"textDecoration":"none"}}>
                       <Button onClick ={this.handleCloseConfirmation}>
                        OKAY
                        </Button></NavLink>
                        </DialogActions>
                        </Dialog>
                  </Container>
        </div>
        )
    }
}
export default ViewMCAttachment;

