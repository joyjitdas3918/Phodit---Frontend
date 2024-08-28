import React, { useEffect } from "react";
import { Link,  useLocation,  useNavigate } from "react-router-dom";




const Navbar = () => {
  
let navigate = useNavigate();
let location=useLocation();
useEffect(() => {
}, [navigate]);
const handleClick=()=>{
      localStorage.removeItem('token');
      navigate('/login')
}
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <b>Phodit</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link className={ `nav-link ${location.pathname==="/"}?"active":""`} aria-current="page" to="/">
                <b>Home</b>
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/discover"}?"active":""`} aria-current="page" to="/discover">
                 <b>Discover</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"}?"active":""`} aria-current="page" to="/about">
                <b>About</b> 
              </Link>
            </li>
            
              </ul>
              {!localStorage.getItem('token')?
              <form className="nav-item">
              
              
              </form>: <form className="d-flex">
                
              
              <button className="btn btn-danger" onClick={handleClick} role="button"><b>Logout</b></button>
              </form>}
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;