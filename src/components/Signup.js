import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let navigate = useNavigate();
useEffect(() => {
    if(localStorage.getItem('token')){
        navigate('/')
    }

    // eslint-disable-next-line
}, [])
    const [credentials, setCredentials] = useState({name:"", username: "", password: "", cpassword:""}) 
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,username,password,cpassword}=credentials;
        if(name.length===0 || password.length==0){
            props.showAlert("Enter all fields","danger");
        }
        else{
            if(cpassword!==password){
                props.showAlert("Password doesn't match confirmed password","danger");
            }
        else{
        const response = await fetch("https://backend-6abz.onrender.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, username: credentials.username, password: credentials.password})
        });
        const json = await response.json()
        //console.log(json);
        
            if (json.authtoken){
                // Save the auth token and redirect
                
            localStorage.setItem('token', json.authtoken); 
            localStorage.setItem('posts', json.posts); 
            localStorage.setItem('username', json.username);
                navigate("/");
                props.showAlert("Sucessfully signed up","success");
    
            }
            else{
                props.showAlert("Sorry username already exists","danger");
            }
        }
    }
        
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
        <h2><b>Signup</b></h2>
            <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" value={credentials.username} onChange={onChange} id="username" name="username" aria-describedby="usernameHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" />
                </div>

                <button type="submit" className="btn btn-success"><b>Signup</b></button>
                <Link className="btn btn-secondary mx-2"  to="/login" role="button"><b>Already have an account</b></Link>
            </form>
        </div>
                

  )
}

export default Signup