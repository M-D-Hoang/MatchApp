import React from "react";

export function ItemInfo({ item }) {
    const isCar = item.make !== undefined;

    // TODO: implement delete button
    const onDeleteClicked = async () => {
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
    return (
        <div className="item-info">
            <h1 className="title">{item.title}</h1>
            <h2 className="price">{item.price}$</h2>
            <div className="detail-container">
                {item.make && (
                    <p className="detail">
                        <b>Make:</b> {item.make}
                    </p>
                )}
                {item.model && (
                    <p className="detail">
                        <b>Model:</b> {item.model}
                    </p>
                )}
                {item.year && (
                    <p className="detail">
                        <b>Mileage:</b> {item.year}
                    </p>
                )}
                {item.mileage && (
                    <p className="detail">
                        <b>Mileage:</b> {item.mileage} km
                    </p>
                )}
                {item.condition && (
                    <p className="detail">
                        <b>Condition:</b> {item.condition}
                    </p>
                )}
                {item.extraField && item.extraField !== "none" && (
                    <p className="detail">
                        <b>Extra:</b> {item.extraField}
                    </p>
                )}
            </div>
            <h3 className="description-title">Description</h3>
            <p className="description">{item.description}</p>
        </div>
    );
}
