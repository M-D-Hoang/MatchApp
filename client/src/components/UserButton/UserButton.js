import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./UserButton.css";
//A simple button displaying the user and their PFP. Clicking on them navigates
//to their user page.
export function UserButton({userID}){
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [userName, setUsername] = useState('');

  const onUserClick=()=>{
    if(userName !== ''){
      navigate(`/user/${userName}`,  { state: { data: userName } });
    }
   
    
  };

  //Fetch username & image from DB
  useEffect(()=>{
    fetch(`/api/users/${userID}`)
    .then(resp=>{return resp.json()})
    .then(json=>{setImage(json.picture);})
    .catch(()=>{setImage('https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg')});
    
    setUsername(userID);
  },[userID])

  return(
    <div className={'user-button'} onClick={onUserClick}>
      <img className={'user-button-image'} src={image} alt={`${userName} profile`}></img>
      <div className={'user-button-name'}>{userName}</div>
    </div>
  );


}