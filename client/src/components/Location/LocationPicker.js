//An aggregation of Map and AddressTextField to create an address selector component

//import { useState } from "react";

const { AddressTextField } = require("./AddressTextField");
const { MapScreen } = require("./Map");


export function LocationSelect({coordinates, setCoordinates}){

    

    return(<div className="location-select-parent">
        <AddressTextField setCoordinates={setCoordinates}/>
        <MapScreen marker={coordinates}/>
    </div>);
}