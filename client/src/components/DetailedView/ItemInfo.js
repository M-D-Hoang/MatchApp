import React from "react";
import { useTranslation } from "react-i18next";

export function ItemInfo({ item, isFull }) {
  const [t] = useTranslation("global");
    return (
        <div className="item-info">
            <h1 className="title">{item.title}</h1>
            <h2 className="price">{item.price}$</h2>
            {/* <UserButton userID={item.ownerID}/> */}
            <div className="detail-container">
                {item.make && (
                    <p className="detail">
                        <b>{t("form.make")}</b> {item.make}
                    </p>
                )}
                {item.model && (
                    <p className="detail">
                        <b>{t("form.model")}</b> {item.model}
                    </p>
                )}
                {isFull && item.bodyType && (
                    <p className="detail">
                        <b>{t("form.bodyType")}</b> {item.bodyType}
                    </p>
                )}
                {isFull && item.transmission && (
                    <p className="detail">
                        <b>{t("form.transmission")}</b> {item.transmission}
                    </p>
                )}
                {isFull && item.driveTrain && (
                    <p className="detail">
                        <b>{t("form.driveTrain")}</b> {item.driveTrain}
                    </p>
                )}
                {item.year && (
                    <p className="detail">
                        <b>{t("form.year")}</b> {item.year}
                    </p>
                )}
                {item.mileage && (
                    <p className="detail">
                        <b>{t("form.mileage")}</b> {item.mileage} km
                    </p>
                )}
                {item.category && (
                    <p className="detail">
                        <b>{t("form.category")}</b> {t(`category.${item.category.toLowerCase()}`)}
                    </p>
                )}
                {item.condition && (
                    <p className="detail">
                        <b>{t("form.condition")}</b> {item.condition}
                    </p>
                )}                
                {isFull && item.extraField && item.extraField !== "none" && (
                    <p className="detail">
                        <b>{t("form.extra")}</b> {item.extraField}
                    </p>
                )}
            </div>
            <h3 className="description-title">{t("form.description")}</h3>
            <p className="description">{item.description}</p>
        </div>
    );
}
