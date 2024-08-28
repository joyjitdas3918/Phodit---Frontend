import React, { useEffect, useState } from 'react'
import Imageitempost from './ImageItemPost';

function Posts(props) {
  const [post,setPost]=useState([]);
  const getPost = async () => {
    const response = await fetch(`https://backend-6abz.onrender.com/api/images${window.location.pathname}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    
    setPost([json]);
  }
    useEffect(()=>{
      getPost();
    },[])
    return (
    <div>
      {post.map((image) => {
        return image? <Imageitempost key={image._id}  image={image} discover={true} post={true} showAlert={props.showAlert}/> : <h5><br />Sorry. The link is broken or the post has been removed</h5>
      })}
    </div>
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
          <img src={imageData} alt="Image"/>
  );
}

export default Posts
