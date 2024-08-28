import React, { useEffect } from 'react'
import { replace, useNavigate, useParams } from 'react-router-dom'

function RedirectImage() {
    const navigate=useNavigate();
    let {id, image} =useParams();

    useEffect(() => {
            if(image===undefined) navigate(id);
            else navigate(id+"/"+image);
    });
}

export default RedirectImage
