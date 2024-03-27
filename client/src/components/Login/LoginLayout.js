// GoogleLogou
import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { response } from "../../../../server/server";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Login(props) {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

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
        props.setPfpURL(data.picture);
        
      } catch (e) {
        console.error(e)
      }
    }

    checkAuth()
  }, [props]);

  const handleLogin = async (response) => {
    const resp = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response),
      credentials: 'include'
    })
    if (!resp.ok) {
      toast.error('Failed to login')
      return
    }
    const data = await resp.json()
    
    setUserInfo(data)
    props.setPfpURL(data.picture);
    toast.success('Login Successful')
  }

 
  const handleLogout = async (response) => {
    const resp = await fetch('/api/users/logout', {
      method: 'DELETE',      
      credentials: 'include'
    })
    if (!resp.ok) {
      toast.error('Failed to log out')
      return
    }
    //const data = await resp.json()
    
    setUserInfo(null)
    toast.success('Logout Successful')
    navigate('/')
  }


  let displayableJSX = <LoggedInUserButton user={userInfo} onLogOut={handleLogout} pfpURL={props.pfpURL}/>
  if(userInfo === null){
    displayableJSX = (
      <GoogleLogin 
        onSuccess={handleLogin}
        onError={() => toast.error('Login failed')}
        useOneTap={true}/>
    );
  }

  console.log(displayableJSX);
  return (

    <div className="link-container">
      {displayableJSX}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}


function LoggedInUserButton({user, onLogOut, pfpURL}){
  const [t, i18n] = useTranslation("global");
  return(
    //Link to User Page & Sell Button
        <div className="link-container">
          <div className="link">
            <p onClick={async()=>{await onLogOut()}}>{t("nav.logout")}</p>
          </div>
          <div className="link">
            <Link to="/sell">{t("nav.sell")}</Link>
          </div>
          
          <div className="link pfp-container">
            <Link className="pfp-container-link" to={`/user/${user.username}`}>
              <img
                className="navbar-pfp"
                src={pfpURL}
                alt="my-account"></img>
            </Link>
          </div>
        </div>
  );
}