import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { NotificationBlock } from "./NotificationBlock";

export function Notifications() {
  const [noti, setNoti] = useState([]);
  const [user, setUser] = useState({});
  const [t] = useTranslation("global");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await fetch('/api/users/check-auth', {
          method: 'GET',
          credentials: "include"
        })

        if (!resp.ok) {
          return
        }

        const data = await resp.json()
        console.warn(data);
        setUser(data);        
      } catch (e) {
        console.error(e)
      }
    }

    checkAuth()
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const resp = await fetch(`/api/messages/${user.username}`);
        if (!resp.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const json = await resp.json();
        setNoti(json);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchNotifications();
  }, [user.username]);

  return (
    <div>
      <h1>{t("noti.noti")}</h1>
      {noti.length > 0 && (
        <>
          {noti.map((noti, index) => (
            <NotificationBlock notification={noti}/>
          ))}
        </>
      )}
    </div>
  );
}
