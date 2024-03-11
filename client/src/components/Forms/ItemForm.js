import { useState } from "react";
import { ImagePreview } from "./ImagePreview.js";
import { editListing, updateListing } from "./FormSubmit.js";
import { useNavigate } from 'react-router-dom';
import "./Form.css";

export function ItemForm({ item }) {
    const navigate = useNavigate();

    const [image, setImage] = useState(null);

    const submitItem = async (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        //add extra form parameters
        formData.append("image", image);
        //formData.append("date", );
        //formData.append("location", );

        var resp = undefined
        if (item !== undefined) {
            //For editing an item
            console.log("Editing item");
            formData.append("id", item._id);
            resp = await editListing(formData, "/api/listings/items");
        } else {
            //For adding a listing
            resp = await updateListing(formData, "/api/listings/items");
        }

        if (resp.status === 201) {
            navigate('/');
        }
        else {
            alert('Listing update failed.');
        }

    };

    async function onImageChange(e) {
        const pickedFiles = e.target.files;
        console.log("Image changed!");
        console.log(pickedFiles);
        if (pickedFiles !== undefined) {
            //set image statevar to the picked image
            setImage(pickedFiles);
        }
    }

    return (
        <div className="item-form">
            <form onSubmit={submitItem}>
                <label>
                    Title:{" "}
                    <input
                        type="text"
                        name="title"
                        defaultValue={item !== undefined ? item.title : ""}
                        required></input>
                </label>
                <label>
                    Description:{" "}
                    <input
                        type="text"
                        name="description"
                        defaultValue={item !== undefined ? item.description : ""}></input>
                </label>
                <label>
                    Price:{" "}
                    <input
                        type="number"
                        name="price"
                        defaultValue={item !== undefined ? item.price : ""}></input>
                </label>
                <label>
                    Image:{" "}
                    <input
                        className="image-input"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={onImageChange}
                        required
                        multiple="multiple"></input>
                </label>
                <label>Condition:{" "}
                    <select
                        name="condition"
                        className="condition-select"
                        required
                        defaultValue={item !== undefined ? item.condition : "new"}>
                        <option value="new">New</option>
                        <option value="fair">Fair</option>
                        <option value="used">Used</option>
                    </select></label>
                <label>
                    Extra:{" "}
                    <input
                        type="text"
                        name="extraField"
                        defaultValue={
                            item !== undefined ? item.extraField : ""
                        }></input>
                </label>
                <label>
                    Category:{" "}
                    <input
                        type="text"
                        name="category"
                        defaultValue={item !== undefined ? item.category : ""}
                        required></input>
                </label>
                <input type="submit"></input>
            </form>

            <ImagePreview src={image} />
        </div>
    );
}
