// GoogleLogou
import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { response } from "../../../../server/server";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';

import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

import './MobileDropdown.css'

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


  let displayableJSX = <ReactLoading className="loading-bar" type={"spin"} color={"#58cc77"} height={32} width={32}/>
  if(userInfo === null){
    displayableJSX = (
      <GoogleLogin 
        onSuccess={handleLogin}
        onError={() => toast.error('Login failed')}
        useOneTap={true}/>
    );
  }
  else{
    displayableJSX = <LoggedInUserButton toggleDark={props.toggleDark} user={userInfo} onLogOut={handleLogout} pfpURL={props.pfpURL} isMobile={props.isMobile} navigate={navigate}  chLang={props.handleChangeLanguage}/>
  }

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




function LoggedInUserButton({user, onLogOut, pfpURL, isMobile, navigate, chLang, toggleDark}){
const [t] = useTranslation("global");

const [drawerOpen, setDrawerOpen] = useState(false);

const onProfileImageClick = ()=>{
  if(isMobile){
    //do dropdown
    setDrawerOpen(true);
  }
  else{
    navigate(`/user/${user.username}`);
  }
}



  return (
      //Link to User Page & Sell Button
      <div className="link-container">
          {!isMobile && <DesktopFunctions t={t} onLogOut={onLogOut}/>}

          <Drawer
                open={drawerOpen}
                onClose={setDrawerOpen}
                direction='right'
                className='mobile-drawer-parent'
            >
                <MobileFunctions t={t} toggleDark={toggleDark} onLogOut={onLogOut} navigate={navigate} chLang={chLang} setDrawer={setDrawerOpen} pfpURL={pfpURL} user={user}/>
            </Drawer>



          <div className="link pfp-container">
            <div className="pfp-container-link">
              <img
                  onClick={onProfileImageClick}
                  className="navbar-pfp"
                  src={pfpURL}
                  alt="my-account">
              </img>
              
            </div>

          </div>
      </div>
  );
}

function DesktopFunctions({onLogOut, t}){
return(
  <>
  <div className="link">
    <p
      className="navbar-link"
      onClick={async () => {
        await onLogOut();
      } }>
      {t("nav.logout")}
    </p>
  </div><div className="link">
      <Link to="/sell" className="navbar-link">
        {t("nav.sell")}
      </Link>
    </div>
    </>
);
}

function MobileFunctions({user,onLogOut, navigate, t, chLang, setDrawer, pfpURL, toggleDark}){
  

  return(
    <div className='mobile-drawer-option'>
      <div className='mobile-drawer-top'>
        <img                  
          className="navbar-drawer-pfp"
          src={pfpURL}
          alt="my-profile">
        </img>
        <p onClick={()=>{setDrawer(false)}}>{t("nav.closeDrawer")}</p>
        <p onClick={()=>{navigate(`/user/${user.username}`); setDrawer(false);}}>{t("nav.profile")}</p>
        
      <p onClick={()=>{navigate('/sell'); setDrawer(false)}}>{t("nav.sell")}</p>
      <p onClick={toggleDark}>{t("nav.toggleDark")}</p>

      <div className='mobile-drawer-language-parent'>
        <span className='mobile-drawer-option-language' onClick={()=>{chLang('en')}}>{t("nav.langEN")}</span>{" | "}
        <span className='mobile-drawer-option-language' onClick={()=>{chLang('fr')}}>{t("nav.langFR")}</span>{" | "}
        <span className='mobile-drawer-option-language' onClick={()=>{chLang('ru')}}>{t("nav.langRU")}</span>
      </div>
      
      
      </div>
      <div className='mobile-drawer-bottom'>
        <p onClick={async () => {
          await onLogOut();
          setDrawer(false);
        } }>{t("nav.logout")}</p>
        </div>
     </div>
  );
}