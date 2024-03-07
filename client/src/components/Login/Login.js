import React from "react";
import {GoogleLogin, GoogleLogout} from '@react-oauth/google';
import { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";
// import { response } from "../../../../server/server";

export function Login() {

const [userInfo, setUserInfo] = useState(null)
useEffect(() => {
  const checkAuth = async () => {
      try {
          const resp = await fetch('/api/users/check-auth', {
              method: 'GET',
              credentials: "include"
          })

          if(!resp.ok) {
              return
          }

          const data = await resp.json()
          setUserInfo(data.data)
      } catch(e) {
          console.error(e)
      }
  }

  checkAuth()
}, []);

const handleLogin = async (response) => {
  const resp = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(response),
      credentials: 'include'
  })
  if(!resp.ok) {
      toast.error('Failed to login')
      return
  }
  const data = await resp.json()
  setUserInfo(data.data)
  toast.success('Login Successful')
}
  return (
    <div className="login-page">
      <h1>Login</h1>
      <GoogleLogin onSuccess={handleLogin}
        onError={() => toast.error('Login failed')}
        useOneTap={true}
      />
      <h1>{userInfo && userInfo.username}</h1>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}