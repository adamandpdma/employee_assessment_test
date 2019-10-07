//original
import React,{Component} from 'react';
import TestRows from './TestRows';
import {NavLink} from 'react-router-dom';
import { Button } from '@material-ui/core';

const imgStyle ={
  width: "350px",
  height: "250px"
}



class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
        numberofquestions: this.props.numberofquestions,
        backgroundColor: ""
            }
    }
    _handleSubmit(e) 
    {
      e.preventDefault();
      console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
      e.preventDefault();
     

      let file = e.target.files[0];
      
      this.getBase64(file).then(base64 => {
        localStorage["fileBase64"] = base64;
        console.debug("file stored",base64);
      });   
    }

    getBase64 = (file) => 
    {
      return new Promise((resolve,reject) => 
      {
         const reader = new FileReader();
         reader.onload = () => resolve(reader.result);
         reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            Holder: reader.result
          });
        }
         reader.onerror = error => reject(error);
         reader.readAsDataURL(file);
      });
    }
   colorChange = (event) => 
   {
    event.target.style.color= "grey"
   }
    render() {
  
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} style={imgStyle}/>);
      } else {
        $imagePreview = (<div><p className="previewText">Please select an Image for Preview</p><br/></div>);
      }
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
 <NavLink to={{Pathname: '/admin/testRows',
       testtwo: this.state.imagePreviewUrl
        }}
        style={{"textDecoration": "none"}}
        onClick={(event) => this.colorChange(event)}
        >
          <Button variant="contained"
          style={{"padding": "5px",
           "marginTop": "5px", "fontSize": "10px"}}
          >
            Upload Image
              </Button>
              </NavLink> 

          </form>
          <div >
            {$imagePreview}
          </div>
        </div>
      )
    }
  }
  export default ImageUpload;



