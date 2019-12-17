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
            name: "",
            timesheetId: 0
        }
    }
    
  componentDidMount = () => {
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
              else{
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
      console.log(this.state)
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
                     {this.props.location.name === "editTimesheet" && (
                       <div>
                      <NavLink to={{pathname: '/employee/editMC',
                      timesheetId: this.props.location.timesheetId,
                      mcId: this.props.location.mcId,
                      MCID: image.mcId}}
                      style={{"textDecoration": "none"}}>
                      <Button variant="contained" style={{"margin": "20px",
                      "borderRadius":"25px"}}>EDIT</Button></NavLink> 
                       <Button variant="contained" 
                       style={{"margin": "20px",
                      "borderRadius":"25px"}}
                       href="#" onClick = {() => this.deleteMCConfirmation(image.mcId,this.props.location.timesheetId)} >DELETE</Button>
                       </div>
                     )}

                      {this.state.name === "editTimesheet2" && (
                       <div>
                      <NavLink to={{pathname: '/employee/editMC',
                      timesheetId: this.state.timesheetId,
                      mcId: this.state.McId,
                      MCID: this.state.McId
                     }}
                      style={{"textDecoration": "none"}}>
                      <Button variant="contained" style={{"margin": "20px",
                      "borderRadius":"25px"}}>EDIT</Button></NavLink> 
                       <Button variant="contained" 
                       style={{"margin": "20px",
                      "borderRadius":"25px"}}
                       href="#" onClick = {() => this.deleteMCConfirmation(this.state.McId,this.state.timesheetId)} >DELETE</Button>
                       </div>
                     )} 
                   </div>
        )
          
        })
        )
    }
    deleteMCConfirmation = (mcId,timesheetId) => 
    {
    this.setState(
      {
        open: true,
        McId: mcId,
        name: "editTimesheet2",
        timesheetId: timesheetId
      }
    )
    }
    handleClose = () => 
    {
      this.setState(
        {
          open: false,
          name: "editTimesheet2",
          timesheetId: this.state.timesheetId,
          McId: this.state.McId,
        }
      )
    }
    handleCloseConfirmation = () => {
      this.setState(
        {
          openConfirmation: false,
          name: "editTimesheet2",
          timesheetId: this.state.timesheetId,
          McId: this.state.McId,
        }
      )
    }
    handleclickopen = () => 
    {
      this.setState(
        {
          openConfirmation: true,
          name: "editTimesheet2",
          timesheetId: this.state.timesheetId,
          McId: this.state.McId,
        }
      )
    }
    deleteMC = () => {
      this.setState(
        {
          open: false,
          name: "editTimesheet2",
          timesheetId: this.state.timesheetId,
          McId: this.state.McId,
        }
      )
     axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/MCs/"+this.state.McId+"/hide")
     .then((res) => console.log(res.data)) 
     .then(this.handleclickopen)
  
     this.setState(
         {
             MC: this.state.MC.filter(el => el.mcId !== this.state.McId) ,
             name: "editTimesheet2",
             timesheetId: this.state.timesheetId,
             McId: this.state.McId,
         }
     )
    }

    render()
    {
      console.log("MC CHECK", this.props.location.mcId)
        return(
        <div>
           <Container   component="main" 
                 maxWidth="sm"
                 style={{borderRadius: '5px', border: "1px solid #BDBDBD"}}>
            <h3>MEDICAL CERTIFICATE ATTACHMENTS</h3>
            <br/>
            <br/>
              {this.ImageLoop()}
              {/* {this.props.location.mcId === undefined &&(
                <p>Sorry, NO Mc attached to the Timesheet.</p>
              )} */}
                  <br/>         
                  <br/>
                  <br/>
                  {this.props.location.name === "fillTimesheet" && (
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

                        {this.props.location.name === "viewTimesheet" && (
                       <NavLink to={{pathname:'/employee/viewSubmittedTimesheet',
                       timesheetId: this.props.location.timesheetId}}
                       style={{"textDecoration": "none"}}
                       onClick={this.onClickContinue}>
                         <Button variant="contained" onClick ={this.onClickContinue}
                          style={{"backgroundColor": "#648fcc", "color": "white", "margin": "10px"}}>BACK</Button>
                         </NavLink>
                  )}
                   {this.props.location.name === "editTimesheet" && (
                       <NavLink to={{pathname:'/employee/editTimesheet',
                       timesheetId: this.props.location.timesheetId}}
                       style={{"textDecoration": "none"}}
                       onClick={this.onClickContinue}>
                         <Button variant="contained" onClick ={this.onClickContinue}
                          style={{"backgroundColor": "#648fcc", "color": "white", "margin": "10px"}}>BACK</Button>
                         </NavLink>
                  )}
                       {this.state.name === "editTimesheet2" && (
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
                       <Button onClick ={this.handleCloseConfirmation}>
                        OKAY
                        </Button>
                        </DialogActions>
                        </Dialog>
                  </Container>
        </div>
        )
    }
}
export default ViewMCAttachment;

