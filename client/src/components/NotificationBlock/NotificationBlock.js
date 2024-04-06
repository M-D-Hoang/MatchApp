import { useEffect, useState } from "react";
import { UserButton } from "../../components/UserButton/UserButton";
import "./NotificationBlock.css";
import { useNavigate } from "react-router-dom";


export function NotificationBlock({ notification }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();


  useEffect (() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch(`/api/users/${notification.buyerID}`);
        if (!resp.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await resp.json();
        setUser(data);
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [notification.buyerID]);

   const handleNotificationClick = async () => {
      const resp = await fetch("/api/messages/", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ _id: notification._id }),
          });
      if (resp.status !== 204) {
          const json = await resp.json();
          alert(`Something went wrong while deleting the entry: ${json}`);
      } else {
        window.location.reload();
      }
  };

  const handleImageClick = ()=>{
    if(notification.listingURL){
      navigate(`/${notification.listingURL}`)
    }
   
  };

  return (
    <div className="notification-block">
      <div className="notification-first-metadata">
        <div className="user">
        <UserButton userID={user.username}/>    
        </div>
        <button className="close-button" onClick={handleNotificationClick}>Remove Notification</button>
      </div>
      <div className="notification-info">     
      <p>{notification.message}</p>  
      </div>
      <img onClick={handleImageClick} src={notification.itemImage} alt="listing img"/>
      
      
    </div>
  );
}