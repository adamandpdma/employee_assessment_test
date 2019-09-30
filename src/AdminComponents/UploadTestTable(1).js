import React,{useState, useEffect, useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles'



const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    marginLeft:'100px',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  button:{
    background: '#49f300'
    // isActive: true
  },
}));

class App extends React.Component {
  state = {
    rows: [{}],
    number: {},
    i: 0
  };

 componentDidMount() {
    this.state.number = localStorage.getItem('QuestionNumber')
}

  handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value
    };
    this.setState({
      rows
    });
  };

  handleAddRow = () => {
    {while (this.state.i < this.state.number){
    console.log(this.state.i)
    console.log(this.state.number)
    const item = {
      name: "",
      mobile: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
    this.state.i++
    }
    }
  }
  
  // handleAddRow = () => {
  //   const item = {
  //     name: "",
  //     mobile: ""
  //   };
  //   this.setState({
  //     rows: [...this.state.rows, item]
  //   });
  // };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> Name </th>
                    <th className="text-center"> Mobile </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={this.state.rows[idx].name}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="mobile"
                          value={this.state.rows[idx].mobile}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={this.handleAddRow} className="btn btn-primary">
                Add Row
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// export default function SimpleTable() {
    
//   const classes = useStyles();
  

//   return (
//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell >Question</TableCell>
//             <TableCell >Correct Answer</TableCell>
           
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map(row => (
//             <TableRow key={row.id}>
//               <TableCell>
//                 {row.id}
//               </TableCell>
//               <TableCell > 
//                   <Button variant="contained" component="label">
//                   Upload image
//                    <input type="file" style={{ display: "none" }}/>
//                    </Button>
//               </TableCell>
//               <TableCell >{row.correctAnswer}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }

