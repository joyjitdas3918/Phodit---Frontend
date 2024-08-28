import React, {useContext, useEffect, useRef, useState} from 'react'
import imageContext from '../images/ImageContext';
import { Link, useNavigate } from 'react-router-dom';
import AddImage from './AddImage';
import Imageitem from './ImageItem';


const Imageitempost = (props)=> {
    
    
  const context = useContext(imageContext);
  const { images, getImages, editImage } = context;
  
  let navigate = useNavigate();
  const ref = useRef(null)
    const refClose = useRef(null)
    const [imageup, setImage] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateImage = (currentImage) => {
        ref.current.click();
        setImage({id: currentImage._id, etitle: currentImage.title, edescription: currentImage.description, etag:currentImage.tag})
        
        

    }

    const handleClick = async (e)=>{ 
        if(!localStorage.getItem('token')){
            
        refClose.current.click();
            navigate('/login')
        }
        else{
            await editImage(imageup.id, imageup.etitle, imageup.edescription, imageup.etag)
        refClose.current.click();
        props.showAlert("Your image has been updated successfully","success");
        //<Link reloadDocument to='/discover'></Link>
        navigate(`/redirectimage${window.location.pathname}`)
        //window.location.reload();
        }
    }

    const onChange = (e)=>{
        setImage({...imageup, [e.target.name]: e.target.value})
    }
    const { deleteImage } = context;
    const { image } = props;
    const [edits, setEdits] = useState([]);

useEffect(() => {
  const fetchEdits = async () => {
    const editPromises = Object.entries(image.children).map(async ([key, value]) => {
      const response = await fetch(`https://backend-6abz.onrender.com/api/images/posts/${value}`, {
        method: "POST",
      });
      return await response.json();
    });

    const fetchedEdits = await Promise.all(editPromises);
    setEdits(fetchedEdits);
  };

  fetchEdits();
}, [image.children]);
    
    return (
        <><button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Image</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="my-3">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title (more than 3 letters)</label>
                            <input type="text" className="form-control" id="etitle" name="etitle" value={imageup.etitle} aria-describedby="usernameHelp" onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description (more than 5 letters)</label>
                            <input type="text" className="form-control" id="edescription" name="edescription" value={imageup.edescription} onChange={onChange} minLength={5} required/>
                        </div>

                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={imageup.etitle.length<3 || imageup.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Image</button>
                </div>
            </div>
        </div>
    </div>
        <div>
        <br />
        <div className="row">
        <div className='col-md-6'>
        
        <div className="container">
            
                
                    <div className="d-flex flex-row-reverse" >
                    <div>   <i className="far fa-solid fa-share fa-lg mx-2 my-4" onClick={async()=>{
                        navigator.clipboard.writeText(`https://phodit.onrender.com/posts/${image._id}`);
                        props.showAlert("Link copied to clipboard","success");
                    }}></i> </div>
                    <div>   {(localStorage.getItem('token')) && (props.discover===false || localStorage.getItem('username')===image.username) && <i className="far fa-edit fa-lg mx-2 my-4" onClick={async ()=>{
                            if(!localStorage.getItem('token')){
                                navigate('/login')
                            }
                            else{ await updateImage(image)
                            }}}></i>}
</div>
<div>
                    {(localStorage.getItem('token')) && (props.discover===false || localStorage.getItem('username')===image.username) && <i className="far fa-trash-alt fa-lg mx-2 my-4" onClick={async ()=>{
                                if(!localStorage.getItem('token')){
                                    navigate('/login')
                                }
                            else{
                                await deleteImage(image._id); 
                             navigate('/login')
                            props.showAlert("Your image has been deleted succesfully","success")}}}></i>}
                     </div>
                     
                </div>
                    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <MyImage image={image.imagedata}/>
                    <div className="align-items-center">
                        <h5 style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}><b>{image.title}</b></h5>
                        <h6 style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>{image.description}</h6>
                        
                        {image.parent!=="" && <Link to={`/redirectimage/posts/${image.parent}`}>Link to Parent</Link>}
 {<div>
                    Posted by {image.username}
                    
                    </div>}
                        
                    </div>
                
                    </div>
                    </div>
                    </div>
                    <div className='col-md-6'><AddImage showAlert={props.showAlert} parent={image._id} text="Add Edit"/></div>
                    </div>
                    <div className="row my-3">
      <h2><b>Edits</b></h2>
      <div className="container mx-2"> 
        {image.children.length === 0 && 'No images to display'} 
      </div>
      {edits.map((edit) => (
 edit && <Imageitem key={edit._id} poststat={true} updateImage={updateImage} image={edit} discover={true} showAlert={props.showAlert} />
))}
    </div>
                    </div>
                    </>
    )
}
function MyImage(props) {
  const [imageData, setImageData] = useState(null);

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
          <img src={imageData} alt="Image" style={{maxWidth:"80%"}}/>
  );
}

export default Imageitempost
