import { ImagePreview } from "../../components/Forms/ImagePreview";
import { useState } from "react";

export function UserEdit({user, onSubmit, editToggle}){

  const [previewImages, setPreviewImages] = useState([])

  const onImageChange = (e)=>{
      const pickedFiles = e.target.files
      console.log("Image changed!")
      console.log(pickedFiles)
      if(pickedFiles[0] !== undefined){
          //set image statevar to the picked image
          setPreviewImages(pickedFiles);
      }
  }

  return(
      <div className="item-form">
      <form onSubmit={onSubmit}>
          <label>
              First Name:{" "}
              <input
                  type="text"
                  name="firstName"
                  defaultValue={user !== undefined ? user.firstName : ""}
                  required></input>
          </label>
          <label>
           Last Name:{" "}
              <input
                  type="text"
                  name="lastName"
                  defaultValue={user !== undefined ? user.lastName : ""}></input>
          </label>
          <label>
              Birthday:{" "}
              <input
                  type="date"
                  name="birthday"
                  defaultValue={user !== undefined ? user.birthday : ""}></input>
          </label>
          <label>
              Profile Picture:{" "}
              <input
                  className="image-input"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={onImageChange}
                  required></input>
          </label>
          <label>
              Gender:{" "}
              <input
                  type="text"
                  name="gender"
                  defaultValue={user !== undefined ? user.gender : ""}
                  required></input>
          </label>
          <label>
              E-Mail:{" "}
              <input
                  type="email"
                  name="email"
                  defaultValue={
                      user !== undefined ? user.email : ""
                  }></input>
          </label>
          <label>
              Phone Number:{" "}
              <input
                  type="tel"
                  name="phoneNumber"
                  defaultValue={user !== undefined ? user.phoneNumber : ""}
                  required
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
          </label>
          <input type="submit"></input>
      </form>

      <ImagePreview src={previewImages} />
  </div>
  );
}