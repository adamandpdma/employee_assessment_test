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
import {quizData} from './quizData'



const buttonStyle = { 
padding: "20px",
width: "150px",
backgroundColor: "grey",
color: "white",
margin: "10px",

}

class TakeTest extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: [],
    options: [],
    testscore: 1,
    disabled: true,
    isEnd: false,
    time: '',
    data: [],
    questionNumber: 1,
    userAns: '',
    correctAnswer: '',
    qnsId: [],
    testSubtypeValue: this.props.testSubtypeValue,
    resultId: 0,
    employeeId: 0,
    guestId: 0,
    score: 0,
    settingsId: 0,
    userQnsIds: '',
    correctAns: ''
  };

  loadQuizData = () => {
   console.log(this.state.testSubtypeValue)
     Axios.get('http://192.168.200.200:8080/backendapi/employee/12378/tests/'+this.state.testSubtypeValue)
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
        userQnsIds: res.data.userQnsIds
     
      }
    )
    console.log(this.state.resultId)
    Axios.get('http://192.168.200.200:8080/backendapi/employee/12378/tests/'+this.state.resultId+'/question-list')
    .then(res => { 
      this.setState(() => {
            return {
              questions: res.data[this.state.currentQuestion].questions,
              answer: res.data[this.state.currentQuestion].correctAns,
              options: [`A`, `B`, `C`, `D`],
              data: res.data,
              // correctAnswer: res.data.correctAns,
              qnsId: res.data.qnsId,
            };
          });
          console.log(this.state.resultId)
    })
    .catch(res => { 
      console.log("NO TESTS AVAILABLE")
    });
    })
   
  };
  
  componentDidMount() {
    this.loadQuizData();
  }
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, answer, testscore } = this.state;

    if (myAnswer === answer) {
      this.setState({
        testscore: testscore + 1,
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      questionNumber: this.state.questionNumber + 1
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
    Axios.get('http://192.168.200.200:8080/backendapi/employee/12378/tests/'+this.state.resultId+'/question-list')
    .then(res => { console.log(res.data)
        this.setState(() => {
            return {
              disabled: true,
              questions: res.data[this.state.currentQuestion].questions,
              answer: res.data[this.state.currentQuestion].correctAns,
              options: [`A`, `B`, `C`, `D`],
              
            };
          });
    })
  }
}
 
  checkAnswer = (answer) => {
    this.setState({ myAnswer: answer, disabled: false,  userAns: this.state.userAns+answer+','});
  };
  finishHandler = () => {
 const values =  {
        correctAns: this.state.correctAns,
        employeeId: this.state.employeeId,
        guestId: this.state.guestId,
        resultId: this.state.resultId,
        score: this.state.score,
        settingsId: this.state.settingsId,
        userAns: this.state.userAns,
        userQnsIds: this.state.userQnsIds
      }
      console.log(values)
  Axios.post('http://192.168.200.200:8080/backendapi/employee/12378/tests/'+this.state.resultId+'/submit', values)
  .then(res => console.log(res.data))

    if (this.state.currentQuestion === this.state.data.length - 1) {
      this.setState({
        isEnd: true
      });
    }

    console.log(this.state.userAns)
}
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <h3> Thanks for taking the Test, Your test is submitted.Your final score {this.state.testscore}</h3>
    
        </div>
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
              {options.map(option => (
            <Button
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
              variant="contained"
            >
              {option}
            </Button>
          ))}</TableCell>
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
            <button className="ui inverted button" onClick={this.finishHandler}  style={buttonStyle}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}

export default TakeTest;