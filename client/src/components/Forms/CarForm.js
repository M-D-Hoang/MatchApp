import { useEffect, useState } from "react";
import { editListing, updateListing } from "./FormSubmit.js";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "./Form.css";

export function CarForm({ item }) {
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
            resp = await editListing(formData, "/api/listings/cars");
        } else {
            //For adding a listing
            resp = await updateListing(formData, "/api/listings/cars");
        }
        if (resp.status === 201) {
            //navigate to item full view
            console.log(
                resp.json().then((resp) => navigate("/fullview/car/" + resp.id))
            );
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
                    Make:{" "}
                    <input
                        type="text"
                        name="make"
                        required
                        defaultValue={
                            item !== undefined ? item.make : ""
                        }></input>
                </label>
                <label>
                    Model:{" "}
                    <input
                        type="text"
                        name="model"
                        required
                        defaultValue={
                            item !== undefined ? item.model : ""
                        }></input>
                </label>
                <label>
                    Body Type:{" "}
                    <input
                        type="text"
                        name="bodyType"
                        required
                        defaultValue={
                            item !== undefined ? item.bodyType : ""
                        }></input>
                </label>
                <label>
                    Mileage:{" "}
                    <input
                        type="number"
                        name="mileage"
                        required
                        defaultValue={
                            item !== undefined ? item.mileage : ""
                        }></input>
                </label>
                <label>
                    Transmission:{" "}
                    <input
                        type="text"
                        name="transmission"
                        required
                        defaultValue={
                            item !== undefined ? item.transmission : ""
                        }></input>
                </label>
                <label>
                    DriveTrain:{" "}
                    <input
                        type="text"
                        name="driveTrain"
                        required
                        defaultValue={
                            item !== undefined ? item.driveTrain : ""
                        }></input>
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
