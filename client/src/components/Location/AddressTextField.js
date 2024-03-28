import { useState } from "react";
import ReactLoading from 'react-loading';
import './AddressPicker.css'


export function AddressTextField({setCoordinates}){

  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  //Set the address state var
  const onInputChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  }

  const checkAddress = (e) => {
    setIsLoading(true);
    fetch(`/api/location/${address}`).then(resp => {
      if (!resp.ok){
        throw new Error('Address could not be read.');
      }
      return resp.json();
    })
    .then(json => {
      setCoordinates(json[0]);
    })
    .finally(()=>{setIsLoading(false)})
  }

  return(
    <div className="address-text-box-container">
      {isLoading && <ReactLoading className="loading-bar" type={"spin"} color={"#58cc77"} height={16} width={16} />}
      <div className="address-text-box"><input type='text' onChange={onInputChange}></input><button onClick={checkAddress}>Check</button></div>
    </div>
  );
}

//https://geocode.maps.co/search?q=${ADDRESS}&api_key=${LOCATION_KEY}