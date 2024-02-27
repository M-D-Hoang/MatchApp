//Page for Selling
import { useState } from "react";
import { ItemForm } from "../../components/Forms/ItemForm.js";
import { CarForm } from "../../components/Forms/CarForm.js";
import "./Sell.css";

export function Sell() {
    const [sellJSX, setSellJSX] = useState(<></>);
    const [isMenuOpen, setOpen] = useState(false);

    const handleCarForm = () => {
        setOpen(false);
        setSellJSX(<CarForm />)
    }

    const handleItemForm = () => {
        handleOpen(false);
        setSellJSX(<ItemForm />)
    }

    const handleOpen = () => {
        setOpen(!isMenuOpen);
    };
    return (
        <div className="sell-page">
            <h1>Add Your Listing</h1>
            <div className="dropdown">
                <button className="sort-button" onClick={handleOpen}>
                    Select Category
                </button>
                {isMenuOpen ? (
                    <div className="dropdown-content">
                        <button onClick={handleCarForm}>
                            Car
                        </button>
                        <button onClick={handleItemForm}>
                            Other
                        </button>
                    </div>
                ) : null}
            </div>
            {sellJSX}
        </div>
    );
}
