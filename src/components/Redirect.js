import React, { useEffect } from 'react'
import { replace, useNavigate, useParams } from 'react-router-dom'

function Redirect() {
    const navigate=useNavigate();
    const {id} =useParams();

    useEffect(() => {
        navigate(id);
    },[]);
}

export default Redirect
