import React from "react";
import { ItemInfo } from "../DetailedView/ItemInfo";
import tempImage from "../../assets/images/item-image-temp1.png";
import { useNavigate } from "react-router-dom";

import "./DetailedViewLayout.css";

//TO-DO: Implement multiple image scrollthrough
export function DetailedView({ onExit, item }) {
    const navigate = useNavigate();

    var image = item.imageURIs[0];
    if (image === undefined) {
        image = tempImage;
    }
    

    const isCar = item.make !== undefined;

    const onDeleteClicked = async () => {
        const respJSON = JSON.stringify({ _id: item._id });

        var resp = undefined;

        if (isCar) {
            resp = await fetch("/api/listings/cars", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: respJSON,
            });
        } else {
            resp = await fetch("/api/listings/items", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: respJSON,
            });
        }

        //const json = await resp.json();
        //console.log(json);
        //alert(json);
        if (resp.status === 204) {
            //placeholder reload, we'd navigate to a page once we have proper nav paths done
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } else {
            //placeholder alert, should be something nicer later
            const json = await resp.json();
            alert(`Something went wrong while deleting the entry: ${json}`);
        }
        //The below should work when we have routers for individual items working.
        //For now, it works only once.
        //navigate("/");
    };

    const handleFullViewURL = () => {
        navigate("/fullview/?itemId=" + item._id, { state: { data: item } });
    }

    return (
        <div className={"overlay"} onClick={onExit}>
            <div className={"detailed-view"}>
                <div className={"item-image"}>
                    <button className={"item-image-button right"}></button>
                    <img src={image} alt="preview"/>
                    <button className={"item-image-button"}></button>
                </div>
                <div className="item-info-container">
                    <ItemInfo onDeleteClicked={onDeleteClicked} item={item} />
                    <button onClick={handleFullViewURL}>Full View</button>
                </div>
            </div>
        </div>
    );
}
