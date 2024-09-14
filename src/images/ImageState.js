import { useEffect, useState } from "react";
import ImageContext from "./ImageContext";

const ImageState = (props) => {
  /*const state1={
        "name": "Joyjit",
    }*/
  //const [state, setState]=useState(state1);
  /*const update=()=>{
        setTimeout(() => {
            setState({
                "name": "Joyjit Das"
            })
        }, 1000);
    }*/
  const host = "https://phodit-backend.vercel.app";

  const imagesInitial = [];
  const imagesInitialAllUsers=[];

  const [images, setImages] = useState(imagesInitial);
  const [imagesAllUsers, setImagesAllUsers] = useState(imagesInitial);
  

  const getImages = async () => {
    //get all images
    const response = await fetch(`${host}/api/images/fetchallimages/1/3`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    //console.log(json);
    setImages(json);
  };

const [data,setData]=useState([]);
const [loading,setLoading]=useState(false);
const [hasMore, setHasMore]=useState(true);
const [page,setPage]=useState(1);
const limit=1;

/*useEffect(()=>{
  const getImagesAllUser=async()=>{
    setLoading(true);
    try{
      const response = await fetch(`${host}/api/images/fetchallimagesallusers/${page}/${limit}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setImagesAllUsers([...data,...response.data]);
      setHasMore(response.data.length===limit);
      setPage(page+1);
    }
    catch(error){
      console.error(error);
    } 
    setLoading(false);
      };
    getImagesAllUser();
  },[page]);
*/
  const getImagesAllUser = async (pg) => {
    //get all images
    const response = await fetch(`${host}/api/images/fetchallimagesallusers/1/10`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    //console.log(json);
    setImagesAllUsers(json);
  };

  //Add a image
  const addImage = async (title, description, imagedata,parent) => {
    //API
    const response = await fetch(`${host}/api/images/addimages`, {
      method: "POST",
      
  timeout: 900000,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, imagedata, username: localStorage.getItem("username"),parent}),
    });

    //client
    //console.log('oii');
    let image = {
      _id: "66a5254bbgcfa8922aaa50c957cc",
      user: "66a4a491e1d336f2351df056",
      title: title,
      description: description,
      imagedata: imagedata,
      date: "2024-07-27T16:50:19.222Z",
      __v: 0,
    };
    image = await response.json();
    setImages(images.concat(image));
    //console.log(image);
  };

  //Delete a image
  const deleteImage = async (id) => {
    //API
    const response = await fetch(`${host}/api/images/deleteimages/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    //console.log(response.json);

    //client end
    setImages(
      images.filter((image) => {
        return image._id !== id;
      })
    );
  };

  //Update a image
  const editImage = async (id, title, description, tag) => {
    //API
    const response = await fetch(`${host}/api/images/updateimages/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //logic for client
    let newImages = images;
    for (let i = 0; i < images.length; i++) {
      const ele = images[i];
      if (ele._id === id) {
        newImages[i].title = title;
        newImages[i].description = description;
        newImages[i].tag = tag;
        break;
      }
    }
    setImages([].concat(newImages));
  };

  return (
    <ImageContext.Provider
      value={{ images, imagesAllUsers,addImage, deleteImage, editImage, getImages, getImagesAllUser }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};
export default ImageState;

/*<ImageContext.Provider value={{state, update}}>
{
    props.children
}
</ImageContext.Provider>*/
