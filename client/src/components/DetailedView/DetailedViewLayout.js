import React from "react";
import { ItemInfo } from "../DetailedView/ItemInfo";
import tempImage from "../../assets/images/item-image-temp1.png";
import { useNavigate } from "react-router-dom";

import "./DetailedViewLayout.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export function DetailedView({ onExit, item }) {
    const navigate = useNavigate();
    // prepare images array
    const images = [];
    // set placeholder if listing has no images
    if (item.imageURIs.length === 0) {
        images.push(<><img src={tempImage} alt="preview"></img></>);
    }
    // create images slides
    item.imageURIs.forEach(img => {
        images.push(<><img src={img} alt="preview"></img></>);
    });

    // TODO: change this
    const isCar = item && item.make !== undefined;

    const handleFullViewURL = () => {
        navigate(`/fullview/${isCar ? 'car' : 'item'}/` + item._id, { state: { data: item } });
    }
    return (
        <div className={"overlay"} onClick={onExit}>
            <div className={"detailed-view"}>
                <div className={"item-image"}>
                    <Carousel className="carousel" infiniteLoop={true}>{images}</Carousel>
                </div>
                <div className="item-info-container">
                    <ItemInfo item={item} />
                    <button onClick={handleFullViewURL}>Full View</button>
                </div>
            </div>
        </div>
    );
}
