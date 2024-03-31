import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserButton } from "../../components/UserButton/UserButton";
import "./NotificationBlock.css";

export function NotificationBlock({ notification }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [item, setItem] = useState({});
  const [itemPicture, setItemPicture] = useState('');

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

  useEffect (() => {
    const fetchItem = async () => {
      try {
        const resp = await fetch(`/api/listings/item/${notification.listingID}`);
        if (!resp.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await resp.json();
        setItem(data);
        setItemPicture(data.imageURIs[0]);
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchItem();
   }, [notification.itemID, notification.listingID]);

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

  return (
    <div className="notification-block" onClick={handleNotificationClick}>
      <UserButton userID={user.username}/>
      <div className="notification-info">
        <p>{item && item.title && item.title.length > 60 ? item.title.substring(0, 60) + "..." : item && item.title}</p>
        <p>{notification.message}</p>    
      </div>
      <img src={itemPicture} alt="listing img"/>
    </div>
  );
}