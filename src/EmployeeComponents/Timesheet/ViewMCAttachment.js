import React, {Component} from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom'
import FillTimesheet from './FillTimesheet';

let pushData=[]
let increment = []

class ViewMCAttachment extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            MC : [],
            count: 0,
            open: false,
        }
    }
    
  componentDidMount = () => {
    this.setState(
      {
        MC: [],
        count: 0
      }
    )
     this.ImageData()
   }
    ImageData = () => 
            {
              console.log(this.props.location.mcIds)
              if(this.props.location.mcIds === undefined)
              {
                alert("No, MC attached")
                window.location='/employee/fillTimesheet'
              }
              else{
                for(let i=0; i< this.props.location.mcIds.length - 1; i ++)
                {
                    axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/MCs/"+this.props.location.mcIds[i]+"")
                    .then(res => {
                        this.setState({
                            MC: res.data,
                            count: this.state.count + 1
                        }        
                        )
                    })
                }
              }
            }
 
    ImageLoop = () => 
    {
        // pushData.push(this.state.MC.mcImg)
        this.state.MC.map( image => {
          pushData.push(image.mcImg)
      })
        increment.push(this.state.count)
        let value = increment.indexOf(0)
        {value > -1 && (
            increment.splice(value, 1)
        )}
            return(
           
                increment.map( len => {
                    return(
                        <div>
                        <PopupState variant="popover" popupId="demo-popup-popover">
                                   {popupState => (
                                     <div>

                                       <img id="myImg" src={`data:image/jpeg;base64,${pushData[len]}`} alt="Test" style={{"width":"100%","max-width":"300px"}} {...bindTrigger(popupState)}  /> 


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
                                         <img id="myImg" src={`data:image/jpeg;base64,${pushData[len]}`} style={{"width":"700px","height":"500px"}} alt="Test" />
                                         </Typography>
                                       </Popover>
                                     </div>
                                   )}
                                 </PopupState>
                               </div>
                    )
                })
            )
    }
 

    render()
    {
      // {this.ImageData()}
        return(
        <div>
            <h3>MEDICAL CERTIFICATE ATTACHMENTS</h3>
            <br/>
            <br/>
              {this.ImageLoop()}
              {this.props.location.mcIds === undefined &&(
                <p>Sorry, NO Mc attached to the Timesheet.</p>
              )}
                  <br/>         
                  <br/>
                  <br/>
                  {this.state.open === true &&(
                      this.display()
                  )}
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
                    <Button variant="contained" onClick ={this.onClickContinue}>CONTINUE</Button>
                    </NavLink>
        </div>
        )
    }
}
export default ViewMCAttachment;