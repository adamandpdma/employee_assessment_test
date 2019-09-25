
import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';




const ObjectRow = (props) => {
    return(
        <div>
        <TableCell>
            {props.keyValue}
        </TableCell>
        <TableCell>
            Image
        </TableCell>
        <TableCell> 
              {props.options.map(option => (
            <Button
              key={props.key}
              className={`ui floating message options
         ${props.myAnswer === option ? "selected" : null}
         `}
              onClick={() => props.checkAnswer(option)}
              variant="contained"
            >
              {option}
            </Button>
          ))}</TableCell>
    </div>)
}

const style = {
    margin: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  }

  const fieldStyle = {
    width: "250px",
    display: 'flex',
          flexWrap: 'wrap'
  }

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap'
}
const InputLabelStyle={
    fontSize: "12px",
    margin: "10px",
    color: "grey"
}

class TestRows extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            options: [`A`, `B`, `C`, `D`],
            myAnswer: '',
            numberofquestions: this.props.location.numberofquestions,
            category: this.props.location.category,
            typeoftest: this.props.location.typeoftest,
            disabled: false,
            currentQuestion: 1,
            count: 0
        }
    }

   
rows = () => 
{
    let rows = [];
for (let i = 1; i <= this.state.numberofquestions; i++) {
    rows.push(<ObjectRow key={i} keyValue={i} options={this.state.options}
         myAnswer={this.state.myAnswer} checkAnswer={this.checkAnswer}/>);
}
return <TableBody>{rows}</TableBody>;
}

checkAnswer = (answer) => 
{
    this.setState({
         myAnswer: answer, disabled: false, 
         userAns: this.state.userAns+answer+','});
    console.log(this.state.myAnswer)
  };
  render() {
      
      console.log(this.state.numberofquestions+ "hello")
    return(
        <div>
            <div>
                <Container maxWidth="sm" style={containerStyle}>
         <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
                >
                <Grid item xs={12}>
                <form onSubmit={this.onSubmitHandler} style={style}>
     
              <InputLabel style={InputLabelStyle}>CATEGORY</InputLabel>
              <FormControl>
                  <TextField
                  style={fieldStyle}
                  required 
                  value={this.state.category}>
              </TextField><br/>
              </FormControl><br/>
           
              <InputLabel style={InputLabelStyle}>TYPE OF TEST</InputLabel>
              <FormControl>                  
                  <TextField 
                 style={fieldStyle}
                 required 
                  value={this.state.typeoftest}>
              </TextField><br/>
              </FormControl><br/>
              <InputLabel style={InputLabelStyle}>NO OF QUESTIONS</InputLabel>
              <FormControl>
                  <TextField required
                   style={fieldStyle}
                  variant="outlined"
              type="number"
              value={this.state.numberofquestions
              }></TextField>
               </FormControl><br/><br/>
              </form>




            <Table>
              <TableBody>
               {this.rows()}
              </TableBody>
              </Table>
              <Button variant="contained" style={{"margin": "20px"}} disabled={this.state.disabled}>UPLOAD TEST BANK</Button>
              </Grid>
                </Grid>
                </Container>
                </div>
                </div>
            
    )
  }

}
export default TestRows;