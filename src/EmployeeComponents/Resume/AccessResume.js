import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import InfoIcon from '@material-ui/icons/Info';

const anchor = {
    color: "grey"
  }
  const buttonStyle={
  
    marginTop: "30px",
    width: "300px",
    textDecoration: "none",
    marginBottom: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"

  }
  const style = {
    margin: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  }
  const paper={
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
    padding: "17px",
  }

class AccessResume extends Component
{
  constructor(props)
  {
      super(props);
      this.state={
        empID: 0,
        empName : '',
        empEmail: '',
        managerID: 0 ,
        managerName: '',
        resumeId: 0,
        remarks: '',
        resume: ''
      }
    }
    componentDidMount = () => { 
      this.state.empID = localStorage.getItem('employeeid')
      axios.get("http://192.168.200.200:8080/backendapitest/employee/"+this.state.empID+"/resume/")
      .then(res => {
        console.log(res.data)
          this.setState(
              {
                empID: res.data.employeeId,
                empName: res.data.empName,
                managerEmail: res.data.managerEmail,
                managerName: res.data.managerName,
                resumeId: res.data.resumeId
              })
              console.log(this.state.empName)
            })
        //     axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/resumetemplates/")
        // .then(response => {
        //     this.setState(
        //         {
        //             resume: response.data
        //         }
        //     )
        // })
          }
    render()
    {
        return(
          
            <main>
            
            <div  />
            <Grid item xs={12}>
              <Paper style={paper}>Dashboard / <a style={anchor}>Resume</a></Paper>   
            </Grid>
<center>
            <Typography
           align="center"
           margin= "normal"
          > 
             <p> {localStorage.getItem("name")} :  {localStorage.getItem("email")}</p> 
        </Typography>
        
        <Box height="100px" width={"50%"} border={1}>
          <InfoIcon style={{marginRight:"80%" ,marginTop:"1%"}}/>
          <Typography>Please upload the resume in PDF format.</Typography>
        </Box>
        </center>
          
          </main>
        )
    }
}
export default AccessResume;