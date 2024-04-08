//Page for Selling
import { useState } from "react";
import { ItemForm } from "../../components/Forms/ItemForm.js";
import { CarForm } from "../../components/Forms/CarForm.js";
import "./Sell.css";
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';

export function Sell() {
    const [t] = useTranslation("global");
    const [sellJSX, setSellJSX] = useState(<></>);

    const [sending, setSending] = useState(false);
    const handleFormChoice = (value) => {

        switch (value) {
            case "Car":
                setSellJSX(<CarForm setSending={setSending} />);
                break;
            case "Item":
                setSellJSX(<ItemForm setSending={setSending} />);
                break;
            default:
                break;
        }
    };

    if (sending) {
        return (<ReactLoading className="loading-bar" type={"spin"} color={"#58cc77"} height={400} width={400} />)
    }

    return (
        <div className="sell-page">
            <h1 className="sell-title">{t("sell.sellTitle")}</h1>

            <select
                className="form-select"
                onChange={(e) => handleFormChoice(e.target.value)}>
                <option>{t("sell.select")}</option>
                <option value="Item">{t("sell.item")}</option>
                <option value="Car">{t("sell.car")}</option>
            </select>

            {sellJSX}
        </div>
    );
}
