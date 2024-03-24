import { ImagePreview } from "../../components/Forms/ImagePreview";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export function UserEdit({ user }) {

    const [previewImage, setPreviewImage] = useState([])

    const onImageChange = (e) => {
        const pickedFiles = e.target.files
        console.log("Image changed!")
        console.log(pickedFiles)
        if (pickedFiles[0] !== undefined) {
            //set image statevar to the picked image
            setPreviewImage(pickedFiles);
        }
    }

    const navigate = useNavigate();

    const onEditSubmit = async (e) => {

        e.preventDefault();
        var formData = new FormData(e.target);
        formData.append("imageURIs", previewImage);
        formData.append('username', user.username);

        const resp = await fetch('/api/users/', {
            method: "PATCH",
            headers: {},
            body: formData,
        });

        const json = await resp.json();
        if (!resp.ok) {
            console.error(JSON.stringify(json));
        }
        else {
            //If post went through, navigate back to user page
            navigate(`/user/${user.username}`, { state: { data: user.username } });
        }
        console.error(JSON.stringify(json));


    }

    return (
        <div className="item-form">
            <form onSubmit={onEditSubmit}>
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

            <ImagePreview src={previewImage} />
        </div>
    );
}