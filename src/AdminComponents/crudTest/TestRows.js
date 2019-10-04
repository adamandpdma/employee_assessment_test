//orginal
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
import { TextField, Typography } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';
import ImageUpload from './ImageUpload';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NavLink} from 'react-router-dom';

const ObjectRow = (props) => {
    return(
        <div>
        <TableCell>
            {props.keyValue}
        </TableCell>

        <TableCell>
         <ImageUpload numberofquestions={props.numberofquestions} alignment={props.alignment[props.keyData]}/>
         <Button onClick={props.QnsImageArray}>DONE</Button>
        </TableCell>
        
        <TableCell> 
        <ThemeProvider theme={theme}>
        <ToggleButtonGroup 
         value={props.alignment[props.keyData]} key={props.keyData}
         exclusive 
         onChange={(e) => props.handleChange(props.keyData, e.target.value)} 
         aria-label="text alignment">
             {props.children}
            </ToggleButtonGroup>
            </ThemeProvider>
            </TableCell>
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
const buttonStyle = {
  color: "grey",
  marginTop: "30px",
  marginLeft: "30px",
  width: "170px",
  textDecoration: "none",
  marginBottom: "40px",
  borderRadius: "25px"
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

let qnsImg =[];

class TestRows extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            file: '',
            options: [`A`, `B`, `C`, `D`],
            myAnswer: [],
            numberofquestions: this.props.location.numberofquestions,
            category: this.props.location.category,
            typeoftest: this.props.location.typeoftest,
            domain: this.props.location.domain,
            disabled: false,
            currentQuestion: 1,
            count: 0,
            disabled: true,
            Value: "female",
            alignment: '',
            indexImg: 0,
            i: 0,
        }
    }
 
    componentDidMount = () => 
    {
        console.log("checking huhu")
        const values = {
            hidden: false,
            noOfQnsInPool: this.state.numberofquestions,
            poolCat: this.state.domain,
            poolId: 0,
            poolSubtype: this.state.typeoftest,
            poolType: this.state.category
          }
    console.log(values); 
    axios.put('http://192.168.200.200:8080/backendapi/admin/questionpool', values)
    .then(res => {
       console.log(res.data)
       this.setState(
           {
           poolId: res.data
           }
       )})
    }    
   
    QnsImageArray = () => {
    
          const values = {
          correctAns: this.state.alignment[this.state.i],
          poolId: this.state.poolId,
          qns: this.props.location.testtwo.split(',')[1]
        }   
                 
      qnsImg.push(values)
      console.log(qnsImg)
      this.setState(
        {
          i: this.state.i +1 
        }
      )
    }
rows = () => 
{
    let rows = [];
for (let i = 0; i < this.state.numberofquestions; i++) {
    rows.push(<ObjectRow key={i} keyValue={i+1} options={this.state.options}
         myAnswer={this.state.myAnswer} checkAnswer={this.checkAnswer} keyData={i} handleChange={this.handleChange} 
         Value={this.state.value}
         children={this.children}
         alignment={this.state.alignment}
         handleChange={this.handleChange}
         onSubmitHandler={this.onSubmitHandler}
         numberofquestions={this.state.numberofquestions}
         QnsImageArray={this.QnsImageArray}
         />);
}
return <TableBody>{rows}</TableBody>;
}


handleChange = (index, newAlignment) => {
    const updatedAlignment= [...this.state.alignment];
    updatedAlignment[index] = newAlignment
    this.setState({
      alignment: updatedAlignment,
    }, () => {
      console.log(this.state.alignment)
    },)
   
  };

  onSubmitHandler = () => 
  {
    console.log(qnsImg)
            
    axios.put("http://192.168.200.200:8080/backendapi/admin/questionpool/create-question/"+this.state.poolId,qnsImg)
    .then(res => console.log(res.data))
    .then(this.handleClickOpen())
}

  children = [
    <ToggleButton key={1} value="A" aria-label="left aligned">
     A
    </ToggleButton>,
    <ToggleButton  key={2} value="B">
     B
    </ToggleButton>,
    <ToggleButton  key={3} value="C">
     C
    </ToggleButton>,
    <ToggleButton key={4} value="D">
      D
    </ToggleButton>,
  ];
  popOverPkay = () => 
  {
      if(this.state.domain === "Technical")
      {
          return(
            <Grid>
         
          <NavLink to={{pathname: '/admin/Technical', 
          poolId: this.state.poolId,
          numberofquestions: this.state.numberofquestions,
          category: this.state.category,
          typeoftest: this.state.typeoftest,}} style={buttonStyle}>
            <Button>
          OKAY, Now proceed to Create Test
          </Button>
          </NavLink> 
        </Grid>
          )
      }
      else{
            return(
                <Grid>
             <NavLink to={{pathname: '/admin/NonTechnical', 
             poolId: this.state.poolId, 
             numberofquestions: this.state.numberofquestions,
             category: this.state.category,
             typeoftest: this.state.typeoftest}} style={buttonStyle}>
             <Button>
          OKAY, Now proceed to Create Test
          </Button>
             </NavLink>
         
            </Grid>
            )
      }

  }

  handleClickOpen = () => {

    qnsImg =[]

    this.setState(
        {
            open: true,
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
        open: false
        }
    )
   )
  }

  render() {   

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
              }>
              </TextField>
               </FormControl><br/><br/>
              </form>



            <Table>
              <TableBody>
              <h4>INSTRUCTIONS</h4>
                  <p>
                    1) Click on choose file and Choose an Image. <br/>
                    (Image size cannot exceed 64kb).<br/>
                    2) Click on upload Image.<br/>
                    3) Choose correct Option for the question Image.<br/>
                    4) Click on Done.<br/><br/>
                  </p>
               {this.rows()}
              </TableBody>
              </Table>
              <Button variant="contained" style={{"margin": "20px"}} 
              onClick={this.onSubmitHandler}>UPLOAD TEST BANK</Button>
                <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"You have successfully uploaded Test Bank !!"}</DialogTitle>

        <DialogActions>
          {this.popOverPkay()}
        </DialogActions>
      </Dialog>
              </Grid>
                </Grid>
                </Container>
                </div>
                </div>
            
    )
  }
}
export default TestRows;

