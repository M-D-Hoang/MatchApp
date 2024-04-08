import { useLocation } from "react-router-dom";
import { ItemForm } from "../../components/Forms/ItemForm.js";
import { CarForm } from "../../components/Forms/CarForm.js";
import "./Edit.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ReactLoading from 'react-loading';

export function Edit() {
    const [t] = useTranslation("global");
    const [sending, setSending] = useState(false);
    const location = useLocation();
    const item = location.state.data;
    const isCar = item.objectType === 'car';
    return (
        <div className="edit-page">
            <h1 className="edit-title">{t("edit.edit")}</h1>
            {sending ? <ReactLoading className="loading-bar" type={"spin"} color={"#58cc77"} height={400} width={400} /> :
                (
                    isCar ? <CarForm item={item} setSending={setSending} isEdit={true}/> : <ItemForm item={item} setSending={setSending} isEdit={true}/>
                )
            }
        </div>
    );
}
