import React from "react";
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import '../../App.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NavLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

// CODE WRITTEN BY - FAHEMA


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

const floor =require('math-floor')

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
    disabled: true,
    alignment: '',
    message: false,

    counter: this.props.location.timeData * 60,
    testSubtypeData: this.props.location.testSubtypeData,
    timeData: this.props.location.timeData,
    resultId: this.props.location.resultId,
    correctAns: this.props.location.correctAns,
    employeeId: this.props.location.employeeId,
    guestId: this.props.location.guestId,
    score: this.props.location.score,
    settingsId: this.props.location.settingsId,
    userQnsIds: this.props.location.userQnsIds,
  };



  loadQuizData = () => {

    console.log(this.state.resultId)
    Axios.get('http://192.168.200.200:8080/backendapitest/employee/'+localStorage.getItem('employeeid')+'/tests/'+this.state.resultId+'/question-list')
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
      alert("NO TESTS AVAILABLE !")
      this.props.history.push("/employee/DashBoardEmployee")
      //window.location='/employee/DashBoardEmployee'
    }); 
  };

  TimerFunction = () => { 
    console.log(this.state.testSubtypeData)
    console.log(this.state.counter)
    this.interval = setInterval(() => {
       this.setState(
           {
               counter: this.state.counter-1,
           }
       )
       if(this.state.counter === 60)
       {
        this.setState({
            message:true
        })
       }
       if(this.state.counter === -1)
       {
           alert("Time out")
           this.finishHandler()
          //  window.location='./DashBoardEmployee'
       }
    }, 1000);
  }

  convertSeconds = (s) => 
  {  
      let min = floor(s/60);
      let sec = s % 60
      if(min < 10)
      {
          min = '0' + min
      }
      if(sec < 10)
      {
          sec = '0' + sec
      }

      return(
          <div>
           <table>
              <tbody>							
              <tr>
              <th>       
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>	</th>
              <th> {min} : </th>
              <th> {sec} </th>
             
              </tr>
              <tr>
              </tr> 
              </tbody>
              </table>
          </div>

      )
  }

  handleClose12 = () => {
    this.setState({message:false})

  }
  
  componentDidMount() {
    this.loadQuizData();
    this.TimerFunction();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
    Axios.get('http://192.168.200.200:8080/backendapitest/employee/'+localStorage.getItem('employeeid')+'/tests/'+this.state.resultId+'/question-list')
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
        completionTime: ((this.state.timeData * 60) - (this.state.counter)).toString(),
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
  Axios.post('http://192.168.200.200:8080/backendapitest/employee/'+localStorage.getItem('employeeid')+'/tests/'+this.state.resultId+'/submit', values)
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
  <ToggleButton key={1} value="A" aria-label="left aligned" placeholder="A">
  </ToggleButton>,
  <ToggleButton  key={2} value="B" placeholder="B">
  </ToggleButton>,
  <ToggleButton  key={3} value="C">
  </ToggleButton>,
  <ToggleButton key={4} value="D">
  </ToggleButton>,
];

popOverPkay = () => 
  {
          return(
            <Grid>
            <NavLink to='/employee/Test'  style={buttonStyle}>
            <Button onClick={this.handleClose} color="primary" autoFocus>
         OKAY
        </Button>
            </NavLink>
        </Grid>
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
               open: false
           },
           
  this.setState(
            {
            testCat: '',
            testType: '',
            testSubtype: '',
            noOfQns: '',
            timeLimit: '',
            open: false
            }
        )
       )
      }

  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <h3> Thanks for taking the Test, Your test is submitted.</h3>
          <NavLink to='/employee/DashBoardEmployee' style={{"textDecoration": "none"}}>
            <Button variant="contained">Back to DashBoard</Button></NavLink>
        </div>
      );
    }
     else {
      return (
        <div className="App">
          <h3>{this.convertSeconds(this.state.counter)}</h3>
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
              <TableCell>
              <PopupState variant="popover" popupId="demo-popup-popover">
                    {popupState => (
                      <div>
                        <img id="myImg" src={`data:image/jpeg;base64,${this.state.questions}`} alt="Test" style={{"width":"100%","max-width":"300px"}} {...bindTrigger(popupState)}  /> 
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
                          <img id="myImg" src={`data:image/jpeg;base64,${this.state.questions}`} style={{"width":"700px","height":"500px"}} alt="Test" />
                          </Typography>
                        </Popover>
                      </div>
                    )}
                  </PopupState>

               </TableCell>

              <TableCell> 
              {/* <ThemeProvider theme={theme}> */}
              <ToggleButtonGroup 
         value={this.state.alignment[this.state.currentQuestion]} key={this.state.currentQuestion}
         exclusive onChange={(e) => this.handleChange(this.state.currentQuestion, e.target.value)} 
         aria-label="text alignment"
         onClick={this.checkAnswer}
         >
             {this.children}
            </ToggleButtonGroup><br/>
            <div style={{"float": "left", "paddingRight": "18px"}}>
            <p  style={{"float": "left", "paddingRight": "18px"}}>A</p>
            <p  style={{"float": "left", "paddingRight": "18px"}}>B</p>
            <p  style={{"float": "left", "paddingRight": "18px"}}>C</p>
            <p  style={{"float": "left", "paddingRight": "18px"}}>D</p>
            </div>
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

       <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{" You can review your Test!!"}</DialogTitle>

        <DialogActions>
          {this.popOverPkay()}
        </DialogActions>
      </Dialog>
      <Dialog
            open={this.state.message}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"1 minute remaining."}</DialogTitle>
            <Button onClick={this.handleClose12}>Okay</Button>
            </Dialog>
        </div>
      );
    }
  }
}

export default withRouter(TakeTest);











