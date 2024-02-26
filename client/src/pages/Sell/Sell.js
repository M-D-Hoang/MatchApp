//Page for Selling
import {useState} from "react";
import {ItemForm} from '../../components/Forms/ItemForm.js'
import {CarForm} from '../../components/Forms/CarForm.js'


export function Sell() {

    const [sellJSX, setSellJSX] = useState(<></>)
  

    return (
        <div>
            <h1>Add Your Listing</h1>

            <button onClick={()=>setSellJSX(<CarForm/>)}>Sell Car</button>
            <button onClick={()=>setSellJSX(<ItemForm/>)}>Sell Misc</button>
            {sellJSX}
        </div>
    );
}