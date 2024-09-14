import React, {useContext, useEffect, useState} from 'react'
import imageContext from '../images/ImageContext';
import { Link, useNavigate } from 'react-router-dom';


const Imageitem = (props) => {
    const context = useContext(imageContext);
    const { deleteImage } = context;
    const { image, updateImage } = props;
    
    let navigate = useNavigate();
    return (
        <div className="col-md-4 d-flex">
            <div className="card my-3 mx-auto">
            <div className="d-flex flex-row-reverse" >
                    <div>   <i className="far fa-solid fa-share fa-lg mx-2 my-4" onClick={async()=>{
                        navigator.clipboard.writeText(`https://phodit.vercel.app/posts/${image._id}`);
                        props.showAlert("Link copied to clipboard","success");
                    }}></i> </div>
                    <div>   {(localStorage.getItem('token')) && (localStorage.getItem('username')===image.username) && <i className="far fa-edit fa-lg mx-2 my-4" onClick={async ()=>{
                            if(!localStorage.getItem('token')){
                                navigate('/login')
                            }
                            else{ await updateImage(image)
                            }}}></i>}
</div>
<div>
                    {(localStorage.getItem('token')) && (localStorage.getItem('username')===image.username) && <i className="far fa-trash-alt fa-lg mx-2 my-4" onClick={async ()=>{
                                if(!localStorage.getItem('token')){
                                    navigate('/login')
                                }
                            else{
                                await deleteImage(image._id); 
                                navigate(`/redirect${window.location.pathname}`)
                            props.showAlert("Your image has been deleted succesfully","success")}}}></i>}
                     </div>
                     
                </div>
                {props.discover===true && <div className="justify-content-end rounded-pill bg-dark translate-middle badge" style={{position: "absolute",opacity:"70%", backgroundColor: "black", color: "white", right:"-7px", top:"0px"}}>
                    {image.username}
                    </div>}
            <MyImage image={image.imagedata} id={image._id}/>
                <div className="card-body">
                    <div className="align-items-center">
                        <h5 className="card-title"><b>{image.title}</b></h5>
                        
                    </div>
                    </div>
            </div>
            </div>
        
    )
}
function MyImage(props) {
  const [imageData, setImageData] = useState(null);
    const navigate= useNavigate();
  // Function to convert Base64 to binary and set image data
  useEffect(() => {
      const base64String = props.image;
            const binaryString = window.atob(base64String.split(',')[1]);
      const arrayBuffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
          arrayBuffer[i] = binaryString.charCodeAt(i);  

      }
      const blob = new Blob([arrayBuffer], { type: 'image/png|jpg|jpeg' });
      setImageData(URL.createObjectURL(blob));
  }, []);

  return (
          <img src={imageData} alt="Image" onClick={()=>{navigate(`/posts/${props.id}`)}}/>
  );
}

export default Imageitem
