import { useLocation } from "react-router-dom";
import { ItemForm } from "../../components/Forms/ItemForm.js";
import { CarForm } from "../../components/Forms/CarForm.js";
import "./Edit.css";
import { useTranslation } from "react-i18next";

export function Edit() {
    const [t, i18n] = useTranslation("global");
    const location = useLocation();
    const item = location.state.data;
    const isCar = item.make !== undefined;
    return (
        <div className="edit-page">
            <h1 className="edit-title">{t("edit.edit")}</h1>
            {isCar ? <CarForm item={item} /> : <ItemForm item={item} />}
        </div>
    );
}
