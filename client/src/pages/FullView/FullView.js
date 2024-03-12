import React from "react";
import { ItemInfo } from "../../components/DetailedView/ItemInfo";
import tempImage from "../../assets/images/item-image-temp1.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import "./FullView.css";

export function FullView({isCar}) {
    const navigate = useNavigate();
    const itemId = useParams().id;
    const [item, setItem] = useState();

    useEffect(() => {
        fetch(`/api/listings/${isCar ? 'car' : 'item'}/` + itemId)
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                setItem(json);
            })
            .catch((e) => {
                console.error(e);
                setItem();
            });
    }, [itemId, isCar]);

    const handleDelete = async () => {
        const respJSON = JSON.stringify({ _id: item._id });
        let resp;
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
        if (resp.status !== 204) {
            //placeholder alert, should be something nicer later
            const json = await resp.json();
            alert(`Something went wrong while deleting the entry: ${json}`);
            //placeholder reload, we'd navigate to a page once we have proper nav paths done
            // eslint-disable-next-line no-restricted-globals
            //location.reload();
        }
        //The below should work when we have routers for individual items working.
        //For now, it works only once.
        navigate('/');
    };

    const images = [];
    if (item) {
        // prepare images array
        // set placeholder if listing has no images
        if (item.imageURIs.length === 0) {
            images.push(<><img src={tempImage} alt="preview"></img></>);
        }
        // create images slides
        item.imageURIs.forEach(img => {
            images.push(<><img src={img} alt="preview"></img></>);
        });
    }

    const handleEdit = () => {
        navigate("/edit", { state: { data: item } });
    };

    if (item) {
        return (
            <div className={"full-view-page"}>
                <div className={"item-image"}>
                    <Carousel className="carousel" infiniteLoop={true}>{images}</Carousel>
                </div>
                <div className="item-info-container">
                    <ItemInfo item={item} />
                    <div className="action-container">
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }
}
