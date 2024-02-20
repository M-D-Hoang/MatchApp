import {useState} from 'react';
import {ImagePreview} from './ImagePreview.js';


export function ItemForm(){
  
  const [image, setImage] = useState(null);

  const submitItem = async (e)=>{
    //do funny fetch thing, for now, alert the recieved form JSON
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
    const resp = await fetch('/api/listing', {
      method: 'POST',
      headers: { "Content-Type": "application/json",},
      body: formJSON
  });
  const json = await resp.json();
  alert(JSON.stringify(json))
  }

  function onImageChange(e){
    const pickedFiles = e.target.files
    console.log("Image changed!")
    console.log(pickedFiles)
    if(pickedFiles[0] !== undefined){
        //set image statevar to the picked image
        setImage(pickedFiles[0]);
    }
}



   return (
    <div className="item-form">
      <form onSubmit={submitItem}>
        <label>Title: <input type="text" name="name"></input></label>
        <label>Description: <input type="text" name="description"></input></label>
        <label>Price: <input type="number" name="price"></input></label>
        <input type="file" name="image" accept="image/*" onChange={onImageChange}></input>
        <label>Condition: <input type="text" name="condition"></input></label>
        <label>Extra: <input type="text" name="extra"></input></label>
        <label>Category: <input type="text" name="category"></input></label>
        <input type="submit"></input>
      </form>
      <ImagePreview src={image}/>
    </div>
  );
}



