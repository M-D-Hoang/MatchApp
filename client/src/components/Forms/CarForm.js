import { useState } from 'react';
import { ImagePreview } from './ImagePreview.js';
import { updateListing, editListing } from './FormSubmit.js';
import { useNavigate } from 'react-router-dom';
export function CarForm({ item }) {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const submitItem = async (e) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    formData.append('image', image);
    var resp = undefined;
    if (item !== undefined) {
      //For editing an item
      console.log("Editing item");
      formData.append("id", item._id);
      resp = await editListing(formData, "/api/listings/cars");
    } else {
      //For adding a listing
      resp = await updateListing(formData, "/api/listings/cars");
    }
    if (resp.status === 201) {
      navigate('/')
    }
    else {
      alert(`Unable to add listing: ${resp}`);
    }

  };


  async function onImageChange(e) {
    const pickedFiles = e.target.files
    console.log("Image changed!")
    console.log(pickedFiles)
    if (pickedFiles !== undefined) {
      //set image statevar to the picked image
      setImage(pickedFiles);
    }
  }



  return (
    <div className="item-form">
      <form onSubmit={submitItem}>
        <label>Title: <input type="text" name="title" required defaultValue={item !== undefined ? item.title : ""}></input></label>
        <label>Description: <input type="text" name="description" defaultValue={item !== undefined ? item.description : ""}></input></label>
        <label>Price: <input type="number" name="price" defaultValue={item !== undefined ? item.price : ""}></input></label>
        <input type="file" name="image" accept="image/*" onChange={onImageChange} required></input>
        <label>Condition:
          <select
            name="condition"
            className="condition-select"
            required
            defaultValue={item !== undefined ? item.condition : "new"}>
            <option value="new">New</option>
            <option value="fair">Fair</option>
            <option value="used">Used</option>
          </select></label>
        <label>Make: <input type="text" name="make" required defaultValue={item !== undefined ? item.make : ""}></input></label>
        <label>Model: <input type="text" name="model" required defaultValue={item !== undefined ? item.model : ""}></input></label>
        <label>Body Type: <input type="text" name="bodyType" required defaultValue={item !== undefined ? item.bodyType : ""}></input></label>
        <label>Mileage: <input type="number" name="mileage" required defaultValue={item !== undefined ? item.mileage : ""}></input></label>
        <label>Transmission: <input type="text" name="transmission" required defaultValue={item !== undefined ? item.transmission : ""}></input></label>
        <label>DriveTrain: <input type="text" name="driveTrain" required defaultValue={item !== undefined ? item.driveTrain : ""}></input></label>
        <input type="submit"></input>
      </form>
      <ImagePreview src={image} />
    </div>
  );
}