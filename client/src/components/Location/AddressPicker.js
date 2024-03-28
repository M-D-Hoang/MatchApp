import { useState } from "react";
import ReactLoading from 'react-loading';



function AddressTextField({setCoordinates}){

  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  //Set the address state var
  const onInputChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  }

  const checkAddress = (e) => {
    //fetch(`https://geocode.maps.co/search?q=${address}&api_key=${LOCATION_KEY}`)
  }

  return(
    <div>
      <ReactLoading className="loading-bar" type={"spin"} color={"#58cc77"} height={16} width={16} />
      <label>Address for Pickup: <input type='text' onChange={onInputChange}></input></label><button onClick={checkAddress}>Check</button>
    </div>
  );
}

//https://geocode.maps.co/search?q=${ADDRESS}&api_key=${LOCATION_KEY}