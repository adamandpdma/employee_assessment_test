import React,{useState,forwardRef, useRef, useImperativeHandle} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton';


const App=()=> {
    const [rows, setRows] = useState([]);

//not implemented... will have rows call before initialization error
//is use to handle any text field changed in any row
  const handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...rows];
    rows[idx] = {
      [name]: value
    };
    setRows(rows);
  };
     
  //handleAddRow need to try to call in UploadTest confirm onClick
  const handleAddRow = () => {
          const item = {
            image: "",
            answer: ""
          };
          setRows([...rows, item]);
        };

        //button function
        const [btnValue, setBtnValue] = React.useState('');
//this part is for ToggleButtonGroup
  const handleBtnValue = index=> (event, newBtnValue) => {
    
    setBtnValue(newBtnValue);
    console.log(btnValue)
    
  };

         //image upload function
  const [preview,setPreview] = useState({
    selectedFile: null,
      imagePreviewUrl: null
  });
  
  const fileChangedHandler = event => {
    setPreview({
      selectedFile: event.target.files[0]
    })
  
    let reader = new FileReader();
       
      reader.onloadend = () => {
        setPreview({
          imagePreviewUrl: reader.result
        });
      }
   
      reader.readAsDataURL(event.target.files[0])
   
    }
   
    //To implement to final submit button()
    const submit = () => {
   
      var fd = new FormData();
   
      fd.append('file', preview.selectedFile);
   
      var request = new XMLHttpRequest();
   
      request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          alert('Uploaded!');
        }
      };
      request.open("POST", "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload", true);
      request.send(fd);
    }
  
    let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
    if (preview.imagePreviewUrl) {
      $imagePreview = (<div className="image-container" ><img src={preview.imagePreviewUrl} alt="icon" width="250" /> </div>);
    }
    // end of image upload

          return (
            <div>
                
              <div className="container">
                <div className="row clearfix">
                  <div className="col-md-12 column">
                    <Table
                      className="table table-bordered table-hover"
                      id="tab_logic"
                    >
                      <TableHead>
                      <TableRow>
                      <TableCell># </TableCell>
                      <TableCell>Question</TableCell>
                      <TableCell>Answer</TableCell>
                          </TableRow>
                        </TableHead>
                      <TableBody>
                        {rows.map((item, idx) => (
                          <TableRow id="addr0" key={idx}>
                          <TableCell>{idx}</TableCell>
                          <TableCell>
                          {$imagePreview}
                    <Button variant="contained" component="label">
                    Upload image
                     <input type="file" name="avatar" onChange={fileChangedHandler} style={{ display: "none" }}/>
                     </Button>
                            </TableCell>
                            <TableCell>
                            <Grid container spacing={5}>
        <Grid item xs={8}>
          <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item>
  
            <ToggleButtonGroup
              value={btnValue}
              exclusive
              onChange={handleBtnValue(idx)}
              aria-label="text alignment"
            >
              <ToggleButton value='a' >
                A
              </ToggleButton>
              <ToggleButton value='b'>
               B
              </ToggleButton>
              <ToggleButton value='c' >
              C
              </ToggleButton>
              <ToggleButton value='d' >
              D
              </ToggleButton>
              <ToggleButton value='e' >
              E
              </ToggleButton>
            </ToggleButtonGroup>
            </Grid></Grid></Grid></Grid>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          );
        }
     
export default App
