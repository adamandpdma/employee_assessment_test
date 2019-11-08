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
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NavLink} from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';

let ij = 1
const ObjectRow = (props) => {


    return(
        <div>
        <TableCell>
            {props.keyValue}
        </TableCell>
        {/* && props.alignment[props.keyData]) */}
        <TableCell>
         <ImageUpload numberofquestions={props.numberofquestions} alignment={props.alignment[props.keyData]}/>
         {(props.keyValue === ij  && props.alignment[props.keyData])&& (
            //
            <Button variant="contained" 
            onClick={(event) => props.QnsImageArray(event)}
            style={{"fontSize": "10px"}}
            disabled={props.disable}
            >DONE</Button>
         )}
        </TableCell>
        
        <TableCell> 
        <ThemeProvider theme={theme}>
        <RadioGroup 
         value={props.alignment[props.keyData]} key={props.keyData}
         exclusive 
         onChange={(e) => props.handleChange(props.keyData,e.target.value)} 
         aria-label="text alignment">
             {props.children}
            </RadioGroup>
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
            disable: true,
            openEmpty: false,
            openImage: false,

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
   handleOpen = () => {
     this.setState(
       {
        TrueFalse: true
       }
     )
   }
    QnsImageArray = (index, newDisable) => { 
  
        if(this.props.location.testtwo === undefined || this.props.location.testtwo === "")
        {
          this.setState(
            {
              openImage: true
            }
          )
        }
           else{
          ij = ij + 1
          const values = {
          correctAns: this.state.alignment[this.state.i],
          poolId: this.state.poolId,
          qns: this.props.location.testtwo.split(',')[1]
        }   
      
      qnsImg.push(values)
      console.log(qnsImg)
  
      this.setState(
        {
          i: this.state.i +1,
          disable: true,
        }
      )
      delete this.props.location.testtwo
        }
      
   
    }
    handleCloseImage = () => 
    {
      this.setState(
        {
          openImage: false
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
         QnsImageArray={(event) => this.QnsImageArray(event)}
         disable={this.state.disable}
         />);
}
return <TableBody>{rows}</TableBody>;
}


handleChange = (index, newAlignment) => {
    const updatedAlignment= [...this.state.alignment];
    updatedAlignment[index] = newAlignment
    this.setState({
      alignment: updatedAlignment,
      disable: false,
    }, () => {
      console.log(this.state.alignment)
    },)
   
  };

  onSubmitHandler = () => 
  {
          if(qnsImg.length < this.state.numberofquestions)
          {
            this.setState(
              {
                openEmpty: true
              }
            )
          }  
          else{
            axios.put("http://192.168.200.200:8080/backendapi/admin/questionpool/create-question/"+this.state.poolId,qnsImg)
            .then(res => console.log(res.data))
            .then(this.handleClickOpen())
          }
}

  children = [
    <FormControlLabel value="A" control={<Radio color="green"/>} label="A" />,
    <FormControlLabel value="B" control={<Radio color="green"/>} label="B"/>,
    <FormControlLabel value="C" control={<Radio color="green"/>} label="C" />,
    <FormControlLabel value="D" control={<Radio color="green"/>} label="D" />
    // <ToggleButton key={1} value="A" aria-label="left aligned" label="A">
    // </ToggleButton>,
    // <ToggleButton  key={2} value="B">
    // </ToggleButton>,
    // <ToggleButton  key={3} value="C">
    // </ToggleButton>,
    // <ToggleButton key={4} value="D">
    // </ToggleButton>,
  ];

  popOverPkay = () => 
  {
      if(this.state.domain === "Technical")
      {
          return(
            <Grid>
         
          <NavLink to={{pathname: '/admin/createTest', 
           domain: 'Technical', 
          poolId: this.state.poolId,
          numberofquestions: this.state.numberofquestions,
          category: this.state.category,
          typeoftest: this.state.typeoftest,
          disabled: false}} style={buttonStyle}>
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
             <NavLink to={{pathname: '/admin/createTestN', 
             domain: 'Non-Technical', 
             poolId: this.state.poolId, 
             numberofquestions: this.state.numberofquestions,
             category: this.state.category,
             typeoftest: this.state.typeoftest,
             disabled: false}} style={buttonStyle}>
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
    ij = 1

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
  handleCloseEmpty = () => {
    this.setState(
      {
        openEmpty: false
      }
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
                    3) Choose Option for the question Image.<br/>
                    4) Done Button appears when once the image<br/>
                    and option is selected, Click on done.<br/><br/>
                  </p>
               {this.rows()}
              </TableBody>
              </Table>
              <Button variant="contained" style={{"margin": "20px", "color": "black"}} 
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
      <Dialog
        open={this.state.openEmpty}
        onClose={this.handleCloseEmpty}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Upload questions, Cannot leave blank!"}</DialogTitle>
        <DialogContent dividers>
          <Typography>
            <ol>
                <li>
                 Make sure all done button is clicked. (Done Button appears when once the image and option is selected)
                </li>
                <li>
                Make sure all Images are uploaded (upload Image button should be disabled).
                </li>
                <li>
                Make sure option for each question is clicked.
                </li>
            </ol>          
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick ={this.handleCloseEmpty}>
          OKAY
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={this.state.openImage}
        onClose={this.handleCloseImage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Upload the Image!"}</DialogTitle>

        <DialogActions>
        <Button onClick ={this.handleCloseImage}>
          OKAY
          </Button>
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

