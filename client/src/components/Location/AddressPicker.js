function AddressTextField({setAddress}){

  const checkAddress = (e) => {

  }

  return(
    <div>
      <label>Address for Pickup: <input type='text'></input></label><button onClick={checkAddress}>Check</button>
    </div>
  );
}

//https://geocode.maps.co/search?q=${ADDRESS}&api_key=${LOCATION_KEY}