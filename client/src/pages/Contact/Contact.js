import "./Contact.css";
import React from "react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
export function Contact({ onExit, item, onOverlayClick }) {
  const [t] = useTranslation("global");
  const [userInfo, setUserInfo] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

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
        setUserInfo(data);
        
      } catch (e) {
        console.error(e)
      }
    }
    checkAuth()
  }, []);

  const submitMessage= async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    formDataObj.sellerID = item.ownerID;
    formDataObj.buyerID = userInfo.username;
    formDataObj.listingID = item._id;
    formDataObj.isViewed = false;

    try {
      const resp = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify(formDataObj),
        credentials: 'include'
      });
      if (!resp.ok) {
        console.error('Failed to submit message');
        return;
      }
      console.log('Message submitted successfully');
      setIsVisible(false);
    } catch (error) {
      console.error('Error submitting message:', error);
  }};

  if (!isVisible) {
    return null;
  }

  return (
    <div className={"overlay"} onClick={onOverlayClick}>
      <div className={"contact-view"}>
        <form onSubmit={submitMessage}>
          <label htmlFor="textInput">{t("fullView.enterMessage")}</label>
          <textarea
            type="text"
            name="message"
            id="message-input"
            cols="30"
            rows="10"
            required
            defaultValue={"I'm interested in this item, please contact me back."}>
            </textarea>
          <button type="submit" className="submit-button">{t("fullView.send")}</button>
        </form>
      </div>
    </div>
  );
}
