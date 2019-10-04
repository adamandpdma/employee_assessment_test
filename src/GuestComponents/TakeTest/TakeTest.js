import React from "react";
import Axios from 'axios';
import Countdown from './Countdown'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import '../App.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NavLink} from 'react-router-dom';



const buttonStyle = { 
padding: "20px",
width: "150px",
backgroundColor: "grey",
color: "white",
margin: "10px",

}

const theme =createMuiTheme({
  overrides: {
    MuiToggleButton: {
      root: {
        '&$selected': {
          backgroundColor: '#03DAC6',
          '&:hover': {
            backgroundColor: '#018786',
          },
        },
        color: "#565656",
        width: "50px",
        borderColor: "#A9A9A9",
        fontWeight: "bold"
        
      },
    },
  },
});

class TakeTest extends React.Component {

  state = {
    currentQuestion: 0,
    myAnswer: [],
    testscore: 1,
    isEnd: false,
    time: '',
    data: [],
    questionNumber: 1,
    userAns: '',
    correctAnswer: '',
    qnsId: [],
    testSubtypeValue: this.props.testSubtypeValue.replace(" ", "%20"),
    resultId: 0,
    employeeId: 0,
    guestId: 0,
    score: 0,
    settingsId: 0,
    userQnsIds: '',
    correctAns: '',
    disabled: true,
    alignment: '',
    buttonDisable: true
  };



  loadQuizData = () => {
   console.log(this.state.testSubtypeValue)
     Axios.get('http://192.168.200.200:8080/backendapi/guest/76/tests/'+this.state.testSubtypeValue)
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
     
      }
    )
    console.log(this.state.resultId)
    Axios.get('http://192.168.200.200:8080/backendapi/guest/76/tests/'+this.state.resultId+'/question-list')
    // Axios.get('http://192.168.200.200:8080/backendapi/employee/1111/tests/81/question-list')
    .then(res => { 
      this.setState(() => {
            return {
              questions: res.data[this.state.currentQuestion].questions,
              answer: res.data[this.state.currentQuestion].correctAns,
              data: res.data,
              qnsId: res.data.qnsId,
            };
          });
          console.log(this.state.resultId)
    })
    .catch(res => { 
      alert("NO TESTS AVAILABLE")
      window.location='/ViewTestDetails'
    });
    })
   
  };
  

  componentDidMount() {
    this.loadQuizData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
    Axios.get('http://192.168.200.200:8080/backendapi/guest/76/tests/'+this.state.resultId+'/question-list')
    .then(res => { console.log(res.data)
        this.setState(() => {
            return {
              disabled: true,
              questions: res.data[this.state.currentQuestion].questions,
              answer: res.data[this.state.currentQuestion].correctAns,
            };
          });
    })
  }
}
 
 
nextQuestionHandler = () => {
  const { myAnswer, answer, testscore } = this.state;

  if (myAnswer === answer) {
    this.setState({
      testscore: testscore + 1,
    });
  }

  this.setState({
    currentQuestion: this.state.currentQuestion + 1,
    questionNumber: this.state.questionNumber + 1,
  });
  console.log(this.state.currentQuestion);
};

finishHandler = () => {
 const values =  {
        correctAns: this.state.correctAns,
        employeeId: this.state.employeeId,
        guestId: this.state.guestId,
        resultId: this.state.resultId,
        score: this.state.score,
        settingsId: this.state.settingsId,
        userAns: this.state.alignment.toString()+',',
        userQnsIds: this.state.userQnsIds
      }
      console.log(values)
  Axios.post('http://192.168.200.200:8080/backendapi/guest/76/tests/'+this.state.resultId+'/submit', values)
  .then(res => console.log(res.data))

    if (this.state.currentQuestion === this.state.data.length - 1) {
      this.setState({
        isEnd: true
      });
    }

    console.log(this.state.alignment.toString()+',')
}

handleChange = (index, newAlignment) => {
  const updatedAlignment= [...this.state.alignment];
  updatedAlignment[index] = newAlignment
  this.setState({
    alignment: updatedAlignment,
    myAnswer: this.state.alignment[index],
    disabled: false
  }, () => {
    console.log(this.state.alignment[index])
  })
};

children = [
  <ToggleButton key={1} value="A" aria-label="left aligned">
  </ToggleButton>,
  <ToggleButton  key={2} value="B">
  </ToggleButton>, 
  <ToggleButton  key={3} value="C">
  </ToggleButton>,
  <ToggleButton key={4} value="D">
  </ToggleButton>,
  <ToggleButton key={5} value="E">
 </ToggleButton>,
];
okayStart = () => {
  return(
    <NavLink to={{pathname: '/ViewTestDetails'}} style={{"textDecoration": "none"}}><Button>okay</Button></NavLink>
  )
}
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thanks for taking the Test! Your test is submitted."}</DialogTitle>

        <DialogActions>
          {this.okayStart()}
        </DialogActions>
      </Dialog>
      );
    } else {
      return (
        <div className="App">
          <h3>{this.props.functionCountdown}</h3>
          <Table>
            <TableHead>
            <TableRow>
            <TableCell>Qn No</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Options</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
              <TableCell>{this.state.questionNumber}</TableCell>
              <TableCell> <img style={{"height": "300px", "width": "300px"}} src= {`data:image/jpeg;base64,${this.state.questions}`} />
              </TableCell>
              <TableCell> 
              <ThemeProvider theme={theme}>
              <ToggleButtonGroup 
         value={this.state.alignment[this.state.currentQuestion]} key={this.state.currentQuestion}
         exclusive 
         onChange={(e) => this.handleChange(this.state.currentQuestion, e.target.value)} 
         aria-label="text alignment"
         onClick={this.checkAnswer}
         style={theme}
         >
             {this.children} 
            </ToggleButtonGroup><br/>
            <div style={{"float": "left", "paddingRight": "45px"}}>
            <p  style={{"float": "left", "paddingRight": "45px"}}>A</p>
            <p  style={{"float": "left", "paddingRight": "45px"}}>B</p>
            <p  style={{"float": "left", "paddingRight": "45px"}}>C</p>
            <p  style={{"float": "left", "paddingRight": "45px"}}>D</p>
            <p  style={{"float": "left", "paddingRight": "45px"}}>E</p>
            </div>
           </ThemeProvider>
         </TableCell>
              </TableRow>
            </TableBody>
           </Table>
  
          {currentQuestion < this.state.data.length - 1 && (
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
              style={buttonStyle}
            >
              Next
            </button>
          )}
      
          {currentQuestion === this.state.data.length - 1 && (
            <button className="ui inverted button" 
            disabled={this.state.disabled}
            onClick={this.finishHandler}  
            style={buttonStyle}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}

export default TakeTest;
