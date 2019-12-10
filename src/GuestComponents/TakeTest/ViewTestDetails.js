import React, { Component } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import Start from '../../start.png'
import CloseIcon from '@material-ui/icons/Close';



const style ={
    textDecoration: "none",
    width: "100px",
    margin: '10px',
    borderRadius: "30px",
    fontSize: "10px"
    }
const navStyle = {
  textDecoration: "none",
}

 class ViewTestDetails extends Component {
  constructor(props) {
    super(props);



    this.state = {
        data: [],
        category: this.props.location.category,
        open: false,
        termsAndConditionsError: "",
        time: '',
        attemptsData: '',
        testSubtype: "",
        noOfQnsData: "",
        resultId: '',
        settingsId: [],
        i: 0 ,
        dataTest: '',
        attemptsDataTest: [],
        openStart: false

        
        
  }
}

  componentDidMount() 
  {
  console.log(this.state.category)
  axios.get('http://192.168.200.200:8080/backendapitest/admin/test-detail/category/Non-Technical')
        .then(res => {
            this.setState (
                {
                    data: res.data,
                },
             )
             console.log(res.data)
             this.setState(
              {
                data: this.state.data.filter(el => el.isHidden === false),
              }
          )    
   }
   ) 
  }

  
 
    handleClickOpen = (testSubtypeName, timeValue, noOfQnsValue,element) => {
     
     axios.get('http://192.168.200.200:8080/backendapitest/guest/'+localStorage.getItem("GuestId")+'/tests/'+testSubtypeName.replace(" ", "%20"))
     .then(res => { 
       console.log(res.data)
     this.setState(
       {
         resultId: res.data.resultId,
         correctAns: res.data.correctAns,
         employeeId: res.data.employeeId,
         guestId: res.data.guestId,
         score: res.data.score,
         settingsId: res.data.settingsId,
         userQnsIds: res.data.userQnsIds,
         open: true,
         testSubtype: testSubtypeName,
         time: timeValue,
         noOfQnsData: noOfQnsValue     
       }
     )
     console.log(this.state.resultId+"RESULT ID GUEST")})

     sessionStorage.setItem(element.target.id,JSON.stringify(true))
    }
 
    handleClose = () => {
      this.setState(
        {
          open: false
        }
      )
    }

   checkedHandler = () => {
      this.setState(
        {
          openStart: true
        }
      )
   }

   startTest = () => {
     if(this.state.openStart === true)
     {
      return(
        <NavLink to={{pathname: '/guest/takeTest', 
        testSubtypeData: this.state.testSubtype,
         timeData: this.state.time,
         resultId: this.state.resultId,
         correctAns: this.state.correctAns,
         employeeId: this.state.employeeId,
         guestId: this.state.guestId,
         score: this.state.score,
         settingsId: this.state.settingsId,
         userQnsIds: this.state.userQnsIds
          }}  style={navStyle}>
          <Button variant="contained" color="#707070">
         START TEST
       </Button>
       </NavLink>
       )
     }
   }
   displayButtons = (id,testSubtype, 
    timeLimit, noOfQns) => {
    if (sessionStorage.getItem(id)) {
        return (
            <Button src={Start} className="btn"  id={id}  
            onClick={(element) => this.handleClickOpen(testSubtype, 
              timeLimit, noOfQns,element)} 
               variant="contained" 
               disabled={true}
               style={{"height": "35px", "backgroundColor": "#F67B7B"}}></Button>
        
        )
    } else {
        return (
            <Button  src={Start}  className="btn"  id={id}  
            onClick={(element) => this.handleClickOpen(testSubtype, 
              timeLimit, noOfQns,element)} 
           variant="contained" style={{"height": "35px", "backgroundColor": "green"}}></Button>
        
        )
    }
}
   render() {
  
    const options = {
        selectableRows: false,
        filterType: "dropdown",
        selectableRowsOnClick: false,
        download: false,
        print: false,
        viewColumns: false
     
         }; 
  
        
      const columns = [
          {
          name: "Test Type",
          options: {
              filter: true,
          }
        },
        {
          name: "Test SubType",
          options: {
            filter: false,
          
          }
        },
        {
          name: "No of Questions",   
          options: {
            filter: false,
           
          }
        },
        {
          name: "Time Limit",
          options: {
            filter: false,
           
          }
        },
        {
          name: "Pass Percentage",
          options: {
            filter: false,
           
          }
        },
      {
        name: "Start Test",
        options: {
          filter: false,
    
        }
      },

    
  ]
    return (
      <div>
          <Dialog aria-labelledby="customized-dialog-title" open={this.state.open}>
            {/* <button onClick={this.handleClose}>Close</button> */}
            {/* <CloseIcon style={{"margin-left":"93%", "margin-top":"10px"}} onClick={this.handleClose}></CloseIcon> */}
        <DialogTitle id="customized-dialog-title">
          TERMS AND CONDITIONS
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
              Total No.of Questions: <b>{this.state.noOfQnsData}</b><br/>    
              Time Limit: <b>{this.state.time} minutes</b>
            <ol>
                <li>
                    Do not refresh (or press F5) or close the tab/browser.
                </li>
                <li>
                    You have only 1 attempt for this test. Accept the terms and conditions and Start the test cannot quit.
                </li>
                <li>
                    Test would be automatically submitted once the time is up.
                </li>
            </ol>
            <label>
            <input type="checkbox" onChange={this.checkedHandler} defaultChecked={this.state.checked}/>
            <i>I have read and accepted the terms and conditions.</i>
            </label>
            
          </Typography>
        </DialogContent>
        <DialogActions>  
          {this.startTest()}      
        </DialogActions>
      </Dialog>

    <MUIDataTable 
        title={"Test Details"}
        data={this.state.data.map((currentemp, i) => {
            return [
               currentemp.testType,
               currentemp.testSubtype,
               currentemp.noOfQns,
               currentemp.timeLimit + "  "+ 'minutes',
               currentemp.pass_percent + " "+"%",
               this.displayButtons(currentemp.settingsId,
              currentemp.testSubtype, 
            currentemp.timeLimit,
             currentemp.noOfQns)
            
                     ]})}

        columns={columns}
        options={options}
        /> 
    </div>

    )
  }
}

export default withRouter(ViewTestDetails)

