import React from "react";
import { textAlign } from "@material-ui/system";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from "axios";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { getMuiTheme } from "./MuiDatatablesTheme";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container"

const headingStyles = {
  "font-weight" : "normal",
  
}


class EmployeeReviewTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        testData: [],
        userAnswers: [],
        score: '',
        correctAnswers: [],
        listItem: null,
        buttonValues: ["A", "B", "C", "D","E"],
        inputs: [],
        testDetailID: this.props.location.testDetailID,
        testName: this.props.location.testName,
        count: 1
        }
    }
    
    componentDidMount() {
       axios.get("http://192.168.200.200:8080/backendapi/employee/101/tests/" + this.state.testDetailID + "/question-list")   
       .then(response => {
            this.setState({ testData: response.data })
            
          }, () => {
            console.log(this.state.testDetailID)
          })
         
          .catch((error) => {
            console.log(error);
          })
          
          axios.get('http://192.168.200.200:8080/backendapi/employee/tests/review/' + this.state.testDetailID)
          .then(response => {
            this.setState({ 
              score: response.data.score
            })
            this.setState({ 
              userAnswers: response.data.userAns
            })
             console.log(this.state.userAnswers)
            this.setState({
              listItem: this.state.userAnswers.split(",")
        
            })
           
          })
          .catch((error) => {
            console.log(error);
          })

          console.log(localStorage.getItem('employeeid'))
        
      }

    validateAnswer(buttonValue, userAnswer, correctAnswer){
      if (buttonValue === userAnswer) {
        return (
        <Button disabled style={{color: userAnswer === correctAnswer ? "Green" : "#8B0000", 
        "backgroundColor": userAnswer === correctAnswer ? "#90ee90" : "#DC6868", 
        "font-weight": "bold", 
        "border":"none"}}>
        {userAnswer}
        </Button>

        )
      }
      else if (buttonValue === correctAnswer) {
        return(
          <Button disabled style={{color: "Green", 
          "backgroundColor":"#90ee90", 
          "font-weight": "bold", 
          "border":"none"}}>
          {correctAnswer}
          </Button>
       
        )
      }
      else
      return (
      <Button disabled style={{color:"#565656", 
      "border":"none", 
      "font-weight":"bold"}}>
      {buttonValue}</Button>

      );
    }
    Count = () => {
      
    return(
      <div>
     <p>{this.state.count++}</p>
      </div>
      )
    }

      render() {

        const options = {
          selectableRows: false,
          filterType: "dropdown",
          selectableRowsOnClick: false,
          download: false,
          print: false,
          viewColumns: false,
          search: false,
          filter: false
       
           }; 

        const columns = [
         
          {
            name: "ID",
            options: {
              filter: false,
            
            }
          },
          {
            name: "Question",   
            options: {
              filter: false,
             
            }
          },
          
          {
            name: "Answer",
            options: {
              filter: false,
             
            }
          },
       
      
    ]

 
        return (
        <Container>
        <MuiThemeProvider theme={getMuiTheme()} >
        <Grid item xs={12}>
          
          <MUIDataTable 
          title={<div><h3 style={headingStyles}>{this.state.testName}</h3> <h4 style={headingStyles}>Score:{this.state.score}</h4></div>}
          data={this.state.testData.map((test, i) => {
              return [
                
                this.state.count++,
                <img style={{"height":"200", "width":"200px"}} src={`data:image/jpeg;base64,${test.qns}`} />,
                
                this.state.buttonValues.map(value => (
                  <ButtonGroup aria-label="outlined primary button group">
                  {this.validateAnswer(value, this.state.listItem[i], test.correctAns)}
                  </ButtonGroup>
                  ))

              ]
            })}
          
          columns={columns}
          options={options}
          />
          </Grid>
          </MuiThemeProvider>
          </Container>    
  )
 }
}

export default EmployeeReviewTest;