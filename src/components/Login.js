import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
    
    let navigate = useNavigate();
useEffect(() => {
    if(localStorage.getItem('token')){
        navigate('/')
    }

    // eslint-disable-next-line
}, [])
    const [credentials, setCredentials] = useState({username: "", password: ""}) 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://backend-6abz.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: credentials.username, password: credentials.password})
        });
        const json = await response.json()
        //console.log(json);
        if (json.authtoken){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            localStorage.setItem('posts', json.posts); 
            localStorage.setItem('username', json.username); 
            
            props.showAlert("Succesfully logged in","success");
            navigate("/");

        }
        else{
            props.showAlert("Sorry you have entered invalid credentials","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
        <h2><b>Login</b></h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" value={credentials.username} onChange={onChange} id="username" name="username" aria-describedby="usernameHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-success"><b>Login</b></button>
                <Link className="btn btn-secondary mx-2"  to="/signup" role="button"><b>Create an account</b></Link>
            </form>
        </div>
                

  )
}

export default Login