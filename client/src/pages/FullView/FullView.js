import React, { useState, useEffect } from "react";
import { ItemInfo } from "../../components/DetailedView/ItemInfo";
import { UserButton } from "../../components/UserButton/UserButton";
import tempImage from "../../assets/images/item-image-temp1.png";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import ReactLoading from 'react-loading';
import { Contact } from "../../components/Contact/Contact";
import "./FullView.css";
import { MapScreen } from "../../components/Location/Map";
import { useTranslation } from "react-i18next";

export function FullView({ isCar }) {
    const [t] = useTranslation("global");
    const navigate = useNavigate();
    const itemId = useParams().id;
    const [item, setItem] = useState({ ownerID: undefined, imageURIs: [''] });
    const [isOwner, setisOwner] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    const [isContactView, setContactView] = useState(false);

    useEffect(() => {
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleHideContactdView = (e) => {
        if (e.target.className === "overlay") {
            setContactView(false);
        }
    };

    const forceHideContactdView = () => {
        setContactView(false);
    };

    const showHandler = (e) => {
        if (e.target.className !== "overlay") {
            setContactView(true);
        }
    };

    if (isContactView) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    useEffect(() => {
        fetch('/api/users/check-auth', {
            method: 'GET',
            credentials: "include"
        }).then(resp => {
            if (!resp.ok) {
                setisOwner(false);
                setLoggedIn(true);
                return
            }
            return resp.json();
        }).then(json => {
            setisOwner(item.ownerID === json.username)
            setLoggedIn(true);
        }).catch((e) => {
            console.error(e)
            setisOwner(false);
            setLoggedIn(false);
        })
    }, [item.ownerID]);

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
                // setItem();
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

                {item.ownerID === undefined ?
                    <ReactLoading className="loading-bar" type={"spin"} color={"#58cc77"} height={200} width={200} /> :
                    <><div className={"item-image"}>
                        <Carousel className="carousel" infiniteLoop={true}>
                            {images}
                        </Carousel>
                    </div>
                        <div className="item-info-container">
                            <ItemInfo item={item} isFull={true} />
                            <div className="action-container">
                                <div className="user-info">
                                    <p>{t("fullView.posted")}</p>
                                    <UserButton userID={item.ownerID} />
                                </div>

                                {item.coordinates.length > 0 && item.location !== undefined ?
                                    <div className="fullview-map-parent">
                                        <h2>{t("fullView.pickupLoc")}</h2>
                                        <MapScreen marker={{ name: item.location, coordinates: item.coordinates }} />
                                    </div> : <p>{t("fullView.noLocation")}</p>}
                                {isOwner ? (
                                    <>
                                        <button onClick={handleDelete}>{t("fullView.delete")}</button>
                                        <button onClick={handleEdit}>{t("fullView.edit")}</button>
                                    </>
                                ) : (
                                    <div>
                                        {isLoggedIn && <button className="contact-button" onClick={showHandler}>{t("fullView.contact")}</button>}
                                        {isContactView ? (
                                            <div>
                                                <Contact item={item} onExit={forceHideContactdView} onOverlayClick={handleHideContactdView}></Contact>
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </div></>
                }


            </div>
        );
    }
    return null;
}