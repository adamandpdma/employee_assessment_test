import React, {Component} from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import { Container } from '@material-ui/core';


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
              }
              else
              {
                for(let i=0; i< this.props.location.mcId.length - 1; i ++)
                {
                    axios.get("http://192.168.200.200:8080/backendapitest/employee/"+this.props.location.employeeId+"/MCs/"+this.props.location.mcId[i]+"")
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
                   </div>)}))
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
                  <br/>         
                  <br/>
                  <br/>

                        {this.state.name === "viewTimesheet" && (
                       <NavLink to={{pathname:'/hr/Timesheet',
                       timesheetId: this.state.timesheetId,
                       employeeId: this.props.location.employeeId
                    }}
                       style={{"textDecoration": "none"}}
                       onClick={this.onClickContinue}>
                         <Button variant="contained" onClick ={this.onClickContinue}
                          style={{"backgroundColor": "#648fcc", "color": "white", "margin": "10px"}}>BACK</Button>
                         </NavLink>
                  )}
                  </Container>
        </div>
        )
    }
}
export default ViewMCAttachment;

