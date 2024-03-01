import { useState } from "react";
import { ImagePreview } from "./ImagePreview.js";
import { updateListing } from "./FormSubmit.js";
import { useNavigate } from 'react-router-dom';
import "./Form.css";

export function ItemForm() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const submitItem = async (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        formData.append("image", image);
        const json =  await updateListing(formData, "/api/listings/items");
        if(json.status === 201){
            navigate('/')
          }
          else{
            alert(`Unable to add listing: ${json.content}`);
          }
    };

    async function onImageChange(e) {
        const pickedFiles = e.target.files;
        console.log("Image changed!");
        console.log(pickedFiles);
        if (pickedFiles[0] !== undefined) {
            //set image statevar to the picked image
            setImage(pickedFiles[0]);
        }
    }

    return (
        <div className="item-form">
            <form onSubmit={submitItem}>
                <label>
                    Title: <input type="text" name="title" required></input>
                </label>
                <label>
                    Description: <input type="text" name="description"></input>
                </label>
                <label>
                    Price: <input type="number" name="price"></input>
                </label>
                <label>
                    Image:{" "}
                    <input
                        className="image-input"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={onImageChange}
                        required></input>
                </label>
                <label>
                    Condition:{" "}
                    <input type="text" name="condition" required></input>
                </label>
                <label>
                    Extra: <input type="text" name="extraField"></input>
                </label>
                <label>
                    Category:{" "}
                    <input type="text" name="category" required></input>
                </label>
                <input type="submit"></input>
            </form>

            <ImagePreview src={image} />
        </div>
    );
}
