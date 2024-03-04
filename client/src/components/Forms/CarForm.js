import {useState} from 'react';
import {ImagePreview} from './ImagePreview.js';
import {updateListing} from './FormSubmit.js';
import { useNavigate } from 'react-router-dom';
export function CarForm(){
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const submitItem = async (e) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    formData.append('image',image);
    const resp = await updateListing(formData, '/api/listings/cars')
    if(resp.status === 201){
      navigate('/')
    }
    else{
      alert(`Unable to add listing: ${resp}`);
    }
    
};


  async function onImageChange(e){
    const pickedFiles = e.target.files
    console.log("Image changed!")
    console.log(pickedFiles)
    if(pickedFiles !== undefined){
        //set image statevar to the picked image
        setImage(pickedFiles);
    }
}



   return (
    <div className="item-form">
      <form onSubmit={submitItem}>
        <label>Title: <input type="text" name="title" required></input></label>
        <label>Description: <input type="text" name="description"></input></label>
        <label>Price: <input type="number" name="price"></input></label>
        <input type="file" name="image" accept="image/*" onChange={onImageChange} required multiple="multiple"></input>
        <label>Condition: <input type="text" name="condition" required></input></label>
        <label>Make: <input type="text" name="make" required></input></label>
        <label>Model: <input type="text" name="model" required></input></label>
        <label>Body Type: <input type="text" name="bodyType" required></input></label>
        <label>Mileage: <input type="number" name="mileage" required></input></label>
        <label>Transmission: <input type="text" name="transmission" required></input></label>
        <label>DriveTrain: <input type="text" name="driveTrain" required></input></label>
        <input type="submit"></input>
      </form>
      <ImagePreview src={image}/>
    </div>
  );
}