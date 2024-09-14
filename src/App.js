//import logo from './logo.svg';
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ImageState from "./images/ImageState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Alert from "./components/Alert";
import Discover from "./components/Discover";
import Posts from "./components/Posts";
import Redirect from "./components/RedirectImage";
import RedirectImage from "./components/RedirectImage";

  
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
const router = createBrowserRouter([
  {
    path: "/", 
    element: (
      <>
      <Navbar/>
      <div>
        <Alert alert={alert}/>
        <div className="container">
          <Home showAlert={showAlert}/>
        </div>
        </div>
        </>
      
    ),
  },
  {
    path: "/about",
    element: (
      <>
      <Navbar/>
      <div>
        <Alert alert={alert}/>
        <div className="container">
          <About />
        </div>
        </div>
      </>
    ),
  },
  {
    exact path: "/posts/:id", 
    element: (
      <>
      <Navbar/>
      <div>
        <Alert alert={alert}/>
        <div className="container">
          <Posts showAlert={showAlert}/>
        </div>
        </div>
        </>
      
    ),
  },
  {
    path: "/discover",
    element: (
      <>
      <Navbar/>
      <div>
        <Alert alert={alert}/>
        <div className="container">
          <Discover showAlert={showAlert}/>
        </div>
        </div>
      </>
    ),
  },
  {
    path: "/redirectimage/:id/:image",
    element: (
      <>
      <Navbar/>
      <div>
        <Alert alert={alert}/>
        <div className="container">
          <RedirectImage showAlert={showAlert}/>
        </div>
        </div>
      </>
    ),
  },
  {
    path: "/redirect/:id",
    element: (
      <>
      <Navbar/>
      <div>
        <Alert alert={alert}/>
        <div className="container">
          <Redirect showAlert={showAlert}/>
        </div>
        </div>
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
      <Navbar/>
      <div>
        <Alert alert={alert}/>
        <div className="container">
          <Login showAlert={showAlert}/>
          </div>
          </div>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
      <Navbar/>
      <div>
        <Alert alert={alert}/>
        <div className="container">
          <Login showAlert={showAlert}/>
          </div>
          </div>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
      <Navbar/>
        <div><Alert alert={alert}/>
        <div className="container">
          <Signup showAlert={showAlert}/>
        </div></div>
      </>
    ),
  },
]);
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    <div>
      
      <ImageState> 
        <RouterProvider router={router} />
      </ImageState>
    </div>
  );
}

export default App;

/*
 <>
    <button onClick={handleSubmit}>  Activate Lasers
    </button>
    <form action="https://backend-6abz.onrender.com/api/images/upload" method="POST" encType="multipart/form-data">
    <input type="file" name="avatar" required/>
    <button type="submit">Upload</button>
  </form> 
    </>
    */
