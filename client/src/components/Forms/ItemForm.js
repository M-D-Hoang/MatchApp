import {useState} from 'react';
import {ImagePreview} from './ImagePreview.js';
import {updateListing} from './FormSubmit.js';


export function ItemForm(){
  
  const [image, setImage] = useState(null);

  const submitItem = async (e) => {
      e.preventDefault();
      var formData = new FormData(e.target);
      formData.append('image',image);
      return await updateListing(formData, '/api/listings/items')
      
  };
  

  async function onImageChange(e){
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
      <form onSubmit={submitItem} >
        <label>Title: <input type="text" name="name"></input></label>
        <label>Description: <input type="text" name="description"></input></label>
        <label>Price: <input type="number" name="price"></input></label>
        <label>Image: <input type="file" name="image" accept="image/*" onChange={onImageChange}></input></label>
        <label>Condition: <input type="text" name="condition"></input></label>
        <label>Extra: <input type="text" name="extra"></input></label>
        <label>Category: <input type="text" name="category"></input></label>
        <input type="submit"></input>
      </form>
      
      <ImagePreview src={image}/>
    </div>
  );
}



