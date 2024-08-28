import React, { useContext, useRef, useState } from 'react'
import imageContext from '../images/ImageContext'
import { useNavigate } from 'react-router-dom';
import Resizer from "react-image-file-resizer";
const AddImage = (props) => {
  const navigate=useNavigate()
    const context=useContext(imageContext);
    const {addImage} =context;
    
    const fileInputRef=useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const[compress,setcompress]=useState(null);
  const[image,setimage]=useState({title: "", description:"", imagedata:document.getElementById("input-files")});
  const resizeFile = (file) =>{
      Resizer.imageFileResizer(
        file,
        20,
        20,
        "PNG",
        0,
        0,
        (uri) => {
          setcompress(uri);
        },
        "base64"
      );
    };
    const handleClick=async(e)=>{
        e.preventDefault();
        if(!localStorage.getItem('token')){
          navigate('/login')
      }
      else{
        const file = document.getElementById("input-files").files[0];


        const token=localStorage.getItem('token');
        
        await resizeFile(file);

        try{
          await addImage(image.title, image.description,image.imagedata=await convertToBase64(file),image.parent=props.parent);
          
        props.showAlert("Your image has been uploaded","success");
        
        
        setimage({title: "", description:"", imagedata:""})
        fileInputRef.current.value="";
        if(props.text==="Add Edit") navigate(`/redirectimage${window.location.pathname}`);
        else navigate(`/redirect${window.location.pathname}`);
        }
        catch{
            props.showAlert("Please compress your file","warning");
        }
        
      
    }
    }
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files);
    };
    const onChange=(e)=>{
        setimage({...image,[e.target.name]:e.target.value}) //keep remaining just change what is changed

    }
    
  return (
    <div className="container my-3">
      <h2><b>{props.text}</b></h2>
      <form>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title (more than 3 letters): 
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={image.title}
            aria-describedby="usernameHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Description (more than 5 letters): 
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={image.description}
            aria-describedby="usernameHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            {props.text.substr(4)} 
          </label>
          <form
            id="ImageForm"
            method="POST"
            encType="multipart/form-data"
            
          >
            <div className="form-group mb-4" id='imageupload'>
              <input
                type="file"
                ref={fileInputRef}
                name="avatar"
                id="input-files"
                className="form-control-file border"
                accept='.jpeg, .png, .jpg'
                onChange={handleFileChange}
              />
              
              </div>
              <button
        disabled={!selectedFile || image.title.length < 3 || image.description.length < 5}
        
        className="btn btn-dark"
        onClick={handleClick}>{props.text}</button>
      
          </form>
        </div>
        
      
      </form>
      </div>
  )
}

function convertToBase64(file){
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
      resolve(fileReader.result)
    };
    fileReader.onerror=(error)=>{
      reject(error)
    }
  })
}

export default AddImage