import { useState } from "react";
import ReactLoading from 'react-loading';
import './AddressPicker.css'
import { useTranslation } from "react-i18next";


export function AddressTextField({ setCoordinates }) {
  const { t } = useTranslation("global");
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const [fetchedPlaces, setFetchedPlaces] = useState([]);

  //Set the address state var
  const onInputChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  }

  const checkAddress = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`/api/location/${address}`).then(resp => {
      if (!resp.ok) {
        throw new Error('Address could not be read.');
      }
      return resp.json();
    })
      .then(json => {
        //setCoordinates(json[0]);
        setFetchedPlaces(json)
      })
      .finally(() => { setIsLoading(false) })
  }

  const onFetchedPlaceClicked = (place) => {
    //sets the current map coords to the selected place
    setCoordinates(place)
  }

  const fetchedPlacesJSX = fetchedPlaces.map((place) => {
    return (
      <p className="location-picker-found-location" onClick={() => { onFetchedPlaceClicked(place) }}>{place.name}</p>
    );
  });

  return (
    <div className="address-text-box-container">
      {isLoading && <ReactLoading className="loading-bar" type={"spin"} color={"#58cc77"} height={16} width={16} />}
      <div className="address-text-box">
        <input type='text' onChange={onInputChange}></input>
        <button onClick={checkAddress}>{t("form.check")}</button>
      </div>
      {fetchedPlaces.length > 0 && <div>{fetchedPlacesJSX}</div>}
    </div>
  );
}

//https://geocode.maps.co/search?q=${ADDRESS}&api_key=${LOCATION_KEY}