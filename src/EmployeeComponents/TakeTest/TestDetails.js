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

import Typography from '@material-ui/core/Typography';
import EmployeeReviewTest from '../ReviewTest/EmployeeReviewTest';


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

export default class TestDetails extends Component {
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
  axios.get('http://192.168.200.200:8080/backendapi/admin/test-detail/type/'+ this.state.category)
        .then(res => {
            this.setState (
                {
                    data: res.data
                },
             )
             console.log(res.data)
             this.setState(
              {
                data: this.state.data.filter(el => el.isHidden === false),
                settingsId: this.state.data.map(setId => { return(setId.settingsId)})
              }
          )    
    this.fetchData(this.state.settingsId)
   }
   ) 
  }


    async fetchData(i) {

      for (let j = 0; j<i.length; j++) {
       
        await axios.get('http://192.168.200.200:8080/backendapi/employee/101/tests/'+i[j]+'/attempts')
        .then( res => { 
        this.setState({
          attemptsData: this.state.attemptsData.concat(res.data)

        })
  
        console.log(i)
        }
        )
        
       }
      

  }
  
 
    handleClickOpen = (testSubtypeName, timeValue, noOfQnsValue) => {
        
     axios.get('http://192.168.200.200:8080/backendapi/employee/101/tests/'+testSubtypeName.replace(" ", "%20"))
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
     console.log(this.state.resultId+"RESULT ID")})
     console.log(this.state.settingsId)
    }
 
    handleClose = () => {
      this.setState(
        {
          open: false
        }
      )
    }
   TestReview = (attempts, testSubtype, timeLimit, noOfQns) => {
     if(attempts === "0")
     {
       return(
         <Grid>
          <Button variant='contained' 
          style={style} 
          onClick={() => 
          this.handleClickOpen(testSubtype, timeLimit, noOfQns)}>
            START
      </Button>
         </Grid>
       )
     }
     else if(attempts === "1")
     {
       return(
         <Grid>
              <Button variant='contained' 
          style={style} 
          onClick={() => 
          this.handleClickOpen(testSubtype, timeLimit, noOfQns)}>
            START
      </Button> | <NavLink to={{pathname:'/reviewAll', resultId: this.state.resultId}} style={{"textDecoration": "none"}}><Button variant='contained' 
          style={style} > REVIEW TEST</Button></NavLink> 
         </Grid>
       )
     }
     else if(attempts === "2")
     {
       return(
         <Grid>
          <NavLink to={{pathname:'/reviewAll', resultId: this.state.resultId}}  style={{"textDecoration": "none"}} ><Button variant='contained' 
          style={style} > REVIEW TEST</Button></NavLink> 
         </Grid>
       )
     }
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
        <NavLink to={{pathname: '/takeTest', 
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
          name: "Test Name",
          options: {
              filter: true,
          }
        },
        {
          name: "Number of Questions",
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
          name: "Attempts",
          options: {
            filter: false,
           
          }
        },
      {
        name: "Result",
        options: {
          filter: false,
    
        }
      },

    
  ]
    return (
      <div>
          <Dialog aria-labelledby="customized-dialog-title" open={this.state.open}>
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
                    You have only 2 attempts for this test.
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
               currentemp.testSubtype,
               currentemp.noOfQns,
               currentemp.timeLimit + "  "+ 'minutes',
               this.state.attemptsData[i]+'/2',
               this.TestReview(this.state.attemptsData[i], 
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
