//Page for Selling
import { useState } from "react";
import { ItemForm } from "../../components/Forms/ItemForm.js";
import { CarForm } from "../../components/Forms/CarForm.js";
import "./Sell.css";

export function Sell() {
    const [sellJSX, setSellJSX] = useState(<></>);
    

    const handleFormChoice = (value) => {
        
        switch (value) {
            case "Car":
                setSellJSX(<CarForm />);
                console.log("Car");
                break;
            case "Other":
                setSellJSX(<ItemForm />);
                break;
            default:
                break;
        }
    };

    return (
        <div className="sell-page">
            <h1>Add Your Listing</h1>

            <select className="form-select" onChange={(e) => handleFormChoice(e.target.value)}>
                <option>Select Category</option>
                <option value="Car">Car</option>
                <option value="Other">Other</option>
            </select>

            {sellJSX}
        </div>
    );
}
