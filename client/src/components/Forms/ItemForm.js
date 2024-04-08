import { useEffect, useState } from "react";
import { editListing, updateListing } from "./FormSubmit.js";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "./Form.css";
import { useTranslation } from "react-i18next";
import { LocationSelect } from "../Location/LocationPicker.js";
import { itemCategories } from "../categories.js";


export function ItemForm({ item, setSending }) {
    const { t } = useTranslation("global");
    const navigate = useNavigate();
    const [images, setImage] = useState([]);
    const [imageFiles, setImageFiles] = useState(null);
    
    //Coords data & address
    const [place, setPlace] = useState(null);

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
        setSending(true);
        var formData = new FormData(e.target);
        formData.append("image", imageFiles);
        if (place != null){
            formData.append("location",place.name);
            formData.append("coordinates", place.coordinates);
        }

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
            resp.json().then((resp) => navigate("/fullview/item/" + resp.id));
        } else {
            alert("Listing update failed.");
        }
        setSending(false);
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
    
    const categoryOptionJSX = itemCategories.map(cat=>{
        return(<option value={cat}>{t(`category.${cat}`)}</option>)
    })

    return (
        <div className="item-form">
            <form onSubmit={submitItem}>
                <label>
                    {t("form.title")}{" "}
                    <input
                        type="text"
                        name="title"
                        defaultValue={item !== undefined ? item.title : ""}
                        required></input>
                </label>
                <label>
                    {t("form.description")}{" "}
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
                    {t("form.price")}{" "}
                    <input
                        type="number"
                        name="price"
                        step={0.01}
                        defaultValue={
                            item !== undefined ? item.price : ""
                        }></input>
                </label>
                <label>
                    {t("form.condition")}{" "}
                        <select name='condition' className="form-dropdown">                  
                        <option value="new">{t(`form.new`)}</option>
                        <option value="fair">{t(`form.fair`)}</option>
                        <option value="used">{t(`form.used`)}</option>
                        </select>
                </label>                
                <label>
                    {t("form.category")}{" "}
                    <select name='category' className="form-dropdown">                  
                    {categoryOptionJSX}
                    </select>
                </label>
                <label>
                    {t("form.extra")}{" "}
                    <input
                        type="text"
                        name="extraField"
                        defaultValue={
                            item !== undefined ? item.extraField : ""
                        }></input>
                </label>
                <label>
                    {t("form.location")}{" "}
                    <LocationSelect coordinates={place} setCoordinates={setPlace} />
                </label>
                <label>
                    {t("form.images")}{" "}
                    <div className="image-input-container">
                        {t("form.select")}
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
