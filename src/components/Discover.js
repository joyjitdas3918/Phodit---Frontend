import React, { useContext, useEffect, useRef, useState } from 'react';
import Imageitem from './ImageItem';
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import imageContext from '../images/ImageContext';

function Discover(props) {
  const [imagesAllUsers, setImagesAllUsers] = useState([]);
  const [pg, setPg] = useState(1); // Page number state
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // To track if more data is available
  
  
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
        navigate(`/redirect${window.location.pathname}`)
        //window.location.reload();
        }
    }

    const onChange = (e)=>{
        setImage({...imageup, [e.target.name]: e.target.value})
    }
  // Fetch images function
  const getImagesAllUser = async (pg) => {
    if (loading || !hasMore) return; // Prevent unnecessary fetches
    try {
      setLoading(true);
      const response = await fetch(`https://backend-6abz.onrender.com/api/images/fetchallimagesallusers/${pg}/1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      // Check if no more images are returned
      if (json.length === 0) {
        setHasMore(false);
      } else {
        setImagesAllUsers(prevImages => {
          // Avoid adding duplicates by ensuring unique images
          const newImages = json.filter(newImage => !prevImages.some(image => image._id === newImage._id));
          return [...prevImages, ...newImages];
        });
        setPg(pg + 1); // Increment the page number after successful fetch
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  // Infinite scroll handler
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading && hasMore) {
      
        getImagesAllUser(pg); // Fetch next page of images when scroll reaches the bottom
    }
  };

  useEffect(() => {
    getImagesAllUser(pg); // Fetch the initial set of images
  }, [pg]); // Empty dependency array to fetch only on component mount

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Clean up the event listener
  }, [loading, hasMore]); // Depend on loading and hasMore to avoid multiple triggers

  return (
    <>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
    <div className="row my-3">
      <h2><b>Discover</b></h2>
      <div className="container mx-2"> 
        {imagesAllUsers.length === 0 && 'No images to display'} 
      </div>
      {imagesAllUsers.map((image) => {
        return <Imageitem key={image._id} poststat={false} image={image} updateImage={updateImage} discover={true} showAlert={props.showAlert} />
      })}
      {loading && <div className="col-md-4 d-flex-align-items-center justify-content-center"><Loader/></div>} {/* Loading indicator */}
      {!hasMore && <p>No more images to load.</p>} {/* End of list indicator */}
    </div>
    </>
  );
}

export default Discover;
