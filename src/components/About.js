//import React, { useContext, useEffect } from 'react'
//import noteContext from '../notes/ImageContext'

import { Link } from "react-router-dom"
import Loader from "./Loader"
import { useState } from "react";

const About = () => {
  /*const a=useContext(noteContext)
  useEffect(()=>{
    a.update()
  }, [])*/
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    
    <div className="row my-3">
    <div className="text-center">
       <h2><b>About Developer</b>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      
      <div className="accordion-body">
        
      <div className="row">
      <div className="d-flex justify-content-evenly">
        <div className="col-md-4">
      <div className="card my-3">
      <div className="card-image-top">
      {loading && <Loader/>}
      <img
        src="https://media.licdn.com/dms/image/v2/D4E03AQHDoC6Uj8Xscw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725519214641?e=1730937600&v=beta&t=BF4pN_C5EiCPtli7uVK9fAnYo_guMMk74PjVf6_r-Ms"
        alt="Joyjit Das"
        className={`card-img-top ${loading ? 'hidden' : ''}`}
        onLoad={handleImageLoad}
      />
    </div>
 <div className="card-body">
    <h5 className="card-title"><b>Joyjit Das</b></h5>
    <p className="card-text">I am a MERN stack developer. Check out my Linkedin Profile</p>
    <div className="d-flex justify-content-evenly">
    <Link to="https://www.linkedin.com/in/joyjit-das-a380a1207/?originalSubdomain=in" className="btn btn-dark mx-2">LinkedIn Profile</Link>
    <Link to="https://github.com/joyjitdas3918" className="btn btn-dark mx-2">Github Profile</Link>
    </div>
  </div>
</div>
</div>
</div>


</div>

              </div>
              </div>
    </div>
  </div>
  
  )
}

export default About