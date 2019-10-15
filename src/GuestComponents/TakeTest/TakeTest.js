import React from "react";
import Axios from 'axios';
import Countdown from './Countdown'
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
constructor(props) {
  super(props);
  this.state = {
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
    resultId: this.props.resultId,
    employeeId: 0,
    guestId: 0,
    score: 0,
    settingsId: 0,
    userQnsIds: '',
    correctAns: '',
    disabled: true,
    alignment: '',
    CompletedTime: ""
  };
this.finishHandler = this.finishHandler.bind(this)
this.nextQuestionHandler = this.nextQuestionHandler.bind(this)
}



  loadQuizData = () => {

    console.log(this.state.resultId + "guest enter Id")
    Axios.get('http://192.168.200.200:8080/backendapi/guest/'+ localStorage.getItem("GuestId")+'/tests/'+this.state.resultId+'/question-list')
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
      
      window.location='./guest/ViewTestDetails'
    }); 
  };

  
  
  componentDidMount() {
   // window.BeforeUnloadEvent(alert("Please do not refresh or your test will be submitted"))
    this.loadQuizData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
    Axios.get('http://192.168.200.200:8080/backendapi/guest/'+ localStorage.getItem("GuestId")+'/guest/'+this.state.resultId+'/question-list')
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
 // window.BeforeUnloadEvent(alert("Please do not refresh or your test will be submitted"))
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
    disabled: true
  });
  console.log(this.state.currentQuestion);
};

timeCaluculation = () => {

  let timeSecondsInitial = this.props.functionCountdown._self.state.timeData * 60
  let timeSecondsFinish = this.props.functionCountdown._self.state.counter
  let completeTime = timeSecondsInitial - timeSecondsFinish

  console.log(completeTime + " " + "completed time")

    let min = floor(completeTime/60);
    let sec = completeTime % 60
    if(min < 10)
    {
        min = '0' + min
    }
    if(sec < 10)
    {
        sec = '0' + sec
    }

    this.setState(
      {
        CompletedTime:  min +":"+ sec
      }
    )
    return this.state.CompletedTime.toString()
}

finishHandler = () => {

    const values =  {
        
        completionTime: "78",
        // this.timeCaluculation(),
        // CompletedTime.toString(),
        correctAns: this.props.correctAns,
        employeeId: this.props.employeeId,
        guestId: this.props.guestId,
        resultId: this.props.resultId,
        score: this.props.score,
        settingsId: this.props.settingsId,
        userAns: this.state.alignment.toString()+',',
        userQnsIds: this.props.userQnsIds
      }
      console.log(values)
    Axios.post('http://192.168.200.200:8080/backendapi/guest/'+localStorage.getItem("GuestId")+'/tests/'+this.state.resultId+'/submit', values)
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
    <ToggleButton key={5} value="E">
  </ToggleButton>,
];

popOverPkay = () => 
  {
          return(
            <Grid>
            <NavLink to='/Test'  style={buttonStyle}>
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
        // this.handleClickOpen();
        <div className="result">
          <h3> Thanks for taking the Test, Your test is submitted.</h3>
          <NavLink to='/guest/ViewTestDetails' style={{"textDecoration": "none"}}><Button variant="contained">Back to DashBoard</Button></NavLink>
        </div>
      );
    }
     else {
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
              {/* <TableCell> <img style={{"height": "300px", "width": "300px"}} src= {`data:image/jpeg;base64,${this.state.questions}`} />
              </TableCell> */}
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
        //  style={theme}
         >
             {this.children}
            </ToggleButtonGroup><br/>
            <div style={{"float": "left", "paddingRight": "18px"}}>
            <p  style={{"float": "left", "paddingRight": "18px"}}>A</p>
            <p  style={{"float": "left", "paddingRight": "18px"}}>B</p>
            <p  style={{"float": "left", "paddingRight": "18px"}}>C</p>
            <p  style={{"float": "left", "paddingRight": "18px"}}>D</p>
            <p  style={{"float": "left", "paddingRight": "18px"}}>E</p>
            </div>
            {/* </ThemeProvider> */}
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
        </div>
      );
    }
  }
}

export default withRouter(TakeTest);


  // console.log(this.props.functionCountdown._self.state.counter + " " + "sec")
  // console.log(this.props.functionCountdown._self.state.timeData + " " + "min")

  // let timeSecondsInitial = this.props.functionCountdown._self.state.timeData * 60
  // let timeSecondsFinish = this.props.functionCountdown._self.state.counter
  // let completeTime = timeSecondsInitial - timeSecondsFinish

  // console.log(completeTime + " " + "completed time")

  //   let min = floor(completeTime/60);
  //   let sec = completeTime % 60
  //   if(min < 10)
  //   {
  //       min = '0' + min
  //   }
  //   if(sec < 10)
  //   {
  //       sec = '0' + sec
  //   }

  //   let CompletedTime = min +":"+ sec
  //   console.log(CompletedTime.toString())
  //   console.log("Completed time =" + " " + min +":"+ sec)








