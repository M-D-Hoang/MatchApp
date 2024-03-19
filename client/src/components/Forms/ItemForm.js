import { useEffect, useState } from "react";
import { ImagePreview } from "./ImagePreview.js";
import { editListing, updateListing } from "./FormSubmit.js";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "./Form.css";
import tempImage from "../../assets/images/item-image-temp1.png";

export function ItemForm({ item }) {
    const navigate = useNavigate();
    const [images, setImage] = useState([]);
    const [imageFiles, setImageFiles] = useState(null);

    useEffect(() => {
        // create images slides
        if (item) {
            item.imageURIs.forEach((img) => {
                setImage((images) => [
                    ...images,
                    <img src={img} alt="preview"></img>,
                ]);
            });
        }
    }, [item]);

    const submitItem = async (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        formData.append("image", imageFiles);
        var resp = undefined;
        if (item !== undefined) {
            //For editing an item
            formData.append("id", item._id);
            resp = await editListing(formData, "/api/listings/items");
        } else {
            //For adding a listing
            resp = await updateListing(formData, "/api/listings/items");
        }
        if (resp.status === 201) {
            //navigate to item full view
            console.log(resp.json().then((resp) => navigate("/fullview/item/" + resp.id)));
        } else {
            alert("Listing update failed.");
        }
    };

    async function onImageChange(e) {
        const pickedFiles = e.target.files;
        if (pickedFiles !== undefined) {
            //set image statevar to the picked image
            setImageFiles(pickedFiles);
            setImage([]);
            Object.entries(pickedFiles).forEach((file) => {
                setImage((images) => [
                    ...images,
                    <img
                        src={URL.createObjectURL(file[1])}
                        alt="preview"></img>,
                ]);
            });
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
                    <textarea
                        type="text"
                        name="description"
                        id="description-input"
                        cols="30"
                        rows="10"
                        required
                        defaultValue={
                            item !== undefined ? item.description : ""
                        }></textarea>
                </label>
                <label>
                    Price:{" "}
                    <input
                        type="number"
                        name="price"
                        defaultValue={
                            item !== undefined ? item.price : ""
                        }></input>
                </label>
                <label>
                    Condition:{" "}
                    <input
                        type="text"
                        name="condition"
                        defaultValue={item !== undefined ? item.condition : ""}
                        required></input>
                </label>
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
                <label>
                    Images:{" "}
                    <div className="image-input-container">
                        Select files
                        <input
                            className="image-input"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={onImageChange}
                            multiple="multiple"></input>
                    </div>
                </label>
                <Carousel className="form-carousel" infiniteLoop={true}>
                    {images}
                </Carousel>
                <input type="submit" className="submit-button"></input>
            </form>
        </div>
    );
}
