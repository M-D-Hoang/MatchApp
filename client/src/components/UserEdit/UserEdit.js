
// import { ImagePreview } from "../../components/Forms/ImagePreview";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserEdit.css";
import { useTranslation } from "react-i18next";

export function UserEdit({ setPfpURL }) {
    const [t] = useTranslation("global");
    const [previewImage, setPreviewImage] = useState([]);

    const onImageChange = (e) => {
        const pickedFiles = e.target.files;
        if (pickedFiles[0] !== undefined) {
            //set image statevar to the picked image
            const img =URL.createObjectURL(pickedFiles[0]);
            setPreviewImage(img);
        }
    };

  const navigate = useNavigate();

  //get userdata from location state
  const location = useLocation();
    const { data } = location.state || null;
    if (data === null) {
        data.navigate("/");
    }

  const user = data;
  
  useEffect(() => {
    if (user.picture !== undefined) {
        setPfpURL(user.picture);
    }
});

const onEditSubmit = async (e) => {
  e.preventDefault();
  var formData = new FormData(e.target);
  formData.append("imageURIs", previewImage);
  formData.append("username", user.username);

  const resp = await fetch("/api/users/", {
      method: "PATCH",
      headers: {},
      body: formData,
  });

  const json = await resp.json();
  if (!resp.ok) {
      console.error(JSON.stringify(json));
  } else {
      //If post went through, navigate back to user page
      //console.log(json);
      if (json.picture !== undefined) {
          setPfpURL(json.picture);
      } else {
          //set the new image by fetching from the db again
          fetch(`/api/users/${user.username}`)
              .then((resp) => {
                  return resp.json;
              })
              .then((json) => {
                  setPfpURL(json.picture);
              });
      }

      navigate(`/user/${user.username}`, {
          state: { data: user.username },
      });
  }
};

  return (
      <div className="user-form">
        <img className="profile-pfp" src={user.picture} alt="preview"></img>
          <form onSubmit={onEditSubmit}>
            <label>
              <div className="image-input-container">
                {t("user.profilePicture")}{" "}
                  <input
                      className="image-input"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={onImageChange}
                      required></input>
              </div>
            </label>
              <label>
                {t("user.firstName")}{" "}
                  <input
                      type="text"
                      name="firstName"
                      defaultValue={user !== undefined ? user.firstName : ""}
                      required></input>
              </label>
              <label>
                {t("user.lastName")}{" "}
                  <input
                      type="text"
                      name="lastName"
                      defaultValue={user !== undefined ? user.lastName : ""}></input>
              </label>
              <label>
                {t("user.birthday")}{" "}
                  <input
                      type="date"
                      name="birthday"
                      defaultValue={user !== undefined ? user.birthday : ""}></input>
              </label>
              <label>
                {t("user.gender")}{" "}
                  <input
                      type="text"
                      name="gender"
                      defaultValue={user !== undefined ? user.gender : ""}
                      required></input>
              </label>
              <label>
                {t("user.email")}{" "}
                  <input
                      type="email"
                      name="email"
                      defaultValue={
                          user !== undefined ? user.email : ""
                      }></input>
              </label>
              <label>
                {t("user.phoneNumber")}{" "}
                  <input
                      type="tel"
                      name="phoneNumber"
                      defaultValue={user !== undefined ? user.phoneNumber : ""}
                      required
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
              </label>
              <input type="submit"></input>
          </form>
      </div>
  );
}
//     return (
//         <div className="user-form">
//             <img className="profile-pfp" src={previewImage} alt="preview"></img>
//             <form onSubmit={onEditSubmit}>
//                 <label>
//                     <div className="image-input-container">
//                         Edit Picture
//                         <input
//                             className="image-input"
//                             type="file"
//                             name="image"
//                             accept="image/*"
//                             onChange={onImageChange}
//                             required></input>
//                     </div>
//                 </label>
//                 <label>
//                     First Name:{" "}
//                     <input
//                         type="text"
//                         name="firstName"
//                         defaultValue={user !== undefined ? user.firstName : ""}
//                         required></input>
//                 </label>
//                 <label>
//                     Last Name:{" "}
//                     <input
//                         type="text"
//                         name="lastName"
//                         defaultValue={
//                             user !== undefined ? user.lastName : ""
//                         }></input>
//                 </label>
//                 <label>
//                     Birthday:{" "}
//                     <input
//                         type="date"
//                         name="birthday"
//                         defaultValue={
//                             user !== undefined ? user.birthday : ""
//                         }></input>
//                 </label>

//                 <label>
//                     Gender:{" "}
//                     <input
//                         type="text"
//                         name="gender"
//                         defaultValue={user !== undefined ? user.gender : ""}
//                         required></input>
//                 </label>
//                 <label>
//                     E-Mail:{" "}
//                     <input
//                         type="email"
//                         name="email"
//                         defaultValue={
//                             user !== undefined ? user.email : ""
//                         }></input>
//                 </label>
//                 <label>
//                     Phone Number:{" "}
//                     <input
//                         type="tel"
//                         name="phoneNumber"
//                         defaultValue={
//                             user !== undefined ? user.phoneNumber : ""
//                         }
//                         required
//                         pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
//                 </label>
//                 <input type="submit" className="submit-button"></input>
//             </form>
//         </div>
//     );
// }

