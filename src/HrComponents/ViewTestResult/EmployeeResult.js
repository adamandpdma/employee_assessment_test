import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Fab from '@material-ui/core/Fab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// CODE WRITTEN BY - FAHEMA

const ceil =require('math-ceil')
const floor =require('math-floor')

export default class EmployeeResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
        employeeId: this.props.location.employeeId,
        name: this.props.location.name,
        employees: [],
        score: [],
        qnsNo: [],
        pass: true,
        booleanResults: []
    };
  }


  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FFF",
          width: "150px",
          "font-size": 15,
          height: "100px",
          
        }, 
      },
      MUIDataTableToolbar:{
        filterPaper:{
        width : '320px',
        left: '1000px !important'
        }
        },
        MUIDataTableHeadCell: {
          root: {
            "font-size": 15,
            "font-weight": "bold"
          },
          },
    }
  })

  componentDidMount() {
    
    axios.get('http://192.168.200.200:8080/backendapitest/human-resources/{hrId}/test-result/employee/'+this.state.employeeId)
      .then(response => {
        this.setState
        ({ 
            employees: response.data 
        })
        this.setState(
          {
          score: this.state.employees.map(el => el.score),
          qnsNo: this.state.employees.map(el => el.userQnsIds),
          passPercentage:this.state.employees.map(el => el.pass_percent)
          }
      ) 
        this.setState(
            {
            employees: this.state.employees.filter(el => el.testType !== "" && el.testSubtype !== ""),
            }
        )

        for(let i=0, j=0,k=0; i<this.state.score.length, j<this.state.qnsNo.length, k<this.state.passPercentage.length; i++, j++,k++){
          if(ceil((this.state.score[i]/((this.state.qnsNo[j].split(',').length) - 1))*100) >= this.state.passPercentage[k])
          {
            this.setState({
              pass: "true"
            })
            
          }
          else {
            this.setState({
              pass: "false"
            })
            
          }
  
            this.setState({
              booleanResults: this.state.booleanResults.concat(this.state.pass)
            })
        }


      })
      .catch((error) => {
        console.log(error);
      })

  }
  Percentage = (score,qnsNo) => 
  {
       if(score === 0 && qnsNo === "")
       {
         return(
           <p>0%</p>
         )
       }
       else
       {
         return(
           <p>{ceil((score/((qnsNo.split(',').length) - 1))*100) + '%'}</p>
         )
       }
  }
 
  timeCalculation = (time) => 
  {
  let min = floor(time/60);
  let sec = time % 60
  if(min < 10)
  {
      min = '0' + min
  }
  if(sec < 10)
  {
      sec = '0' + sec
  }

  return(
    <p>{min} : {sec}</p>
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
        rowsPerPage: 5
     
         }; 
  
        
      const columns = [
        {
          name: "Test Type",
          options: {
            filter: true,
           
          }
        },
      {
        name: "Test Subtype",
        options: {
          filter: true,
    
        }
      },
      {
        name: "Score",
        options: {
          filter: false,
        }
      },
      {
        name: "Completed Time",
        options: {
          filter: false,
        }
      },
      {
        name: "Percentage",
        options: {
          filter: false,
        }
      },
      {
        name: "Pass Percentage",
        options: {
          filter: false,
        }
      },
      {
        name: "Pass/Fail",
        options: {
          filter: true,
          filterOptions: {
            names: ['Pass', 'Fail'],
            logic(v, filterVal) {
             // v = this.testFilterRender(v)
            if (v === "true") {
              return filterVal.indexOf('Pass');
            } else {
              return filterVal.indexOf('Fail');
            }
          },
          },

          customBodyRender: (value) => {
            if (value === "true")
              return (
                <label style={{color: "green", "font-weight": "bold"}}>Pass</label>
              );
            else
              return (
                <label style={{color: "red", "font-weight": "bold"}}>Fail</label>
              );
          }
        }

      },

  ]
    

    return (
     <MuiThemeProvider theme={this.getMuiTheme()}>
      <h3>Employee Name: {this.state.name} </h3>
      <h3>Employee ID: {this.state.employeeId} </h3>
    
    <MUIDataTable 
  
        title={"Employee Test Result"}
        
        data={this.state.employees.reverse().map((currentemp,i) => {
            return [
              currentemp.testType,
              currentemp.testSubtype,
              currentemp.score+' / '+((currentemp.userQnsIds.split(',').length) - 1),  
              this.timeCalculation(currentemp.completionTime),
              this.Percentage(currentemp.score, currentemp.userQnsIds),
              currentemp.pass_percent + " " +"%",
              this.state.booleanResults[i]      
            ]})}

        columns={columns}
        options={options}
        
        /> 
      </MuiThemeProvider>

    )
  }
}




