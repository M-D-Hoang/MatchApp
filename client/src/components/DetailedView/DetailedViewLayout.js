//render a react component
import React from "react";
import { ItemInfo } from "../DetailedView/ItemInfo";
import tempImage from "../../assets/images/item-image-temp1.png";
import { useNavigate } from "react-router-dom";
import "./DetailedViewLayout.css";

//TO-DO: Implement multiple image scrollthrough
export function DetailedView({isRender, onExit, item}) {
    const navigate = useNavigate();
    
    const image = item.imageURIs[0]
    if (image === undefined){
        image = tempImage;
    }

    const onDeleteClicked = ()=>{
       //fetch()
       //The below should work when we have routers for individual items working.
       //For now, it works only once.
       navigate("/");
    }

    return (
        <div className={"overlay"} onClick={onExit}>
            <div className={"detailed-view"}>
                <div className={"item-image"}>
                  
                    <button className={"item-image-button"}>L</button>
                    <img src={image} />
                    <button className={"item-image-button"}>R</button>

                </div>
                <ItemInfo onDeleteClicked={onDeleteClicked} item={item} />
            </div>
        </div>
    );
}
