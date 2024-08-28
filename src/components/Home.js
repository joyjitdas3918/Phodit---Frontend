//import React, { useContext } from "react";
import AddImage from "./AddImage";
import Images from "./Images";
const Home = (props) => {
  
  return (
    <div>
      <AddImage showAlert={props.showAlert} text="Add Image" parent=""/>
      <br />
      <Images showAlert={props.showAlert}/>
    </div>
  );
};

export default Home;