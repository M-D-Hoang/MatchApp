import React from "react";
import {GoogleLogin, GoogleLogout} from 'react-oauth/google';
import { response } from "../../../../server/server";

export function Login() {
  const handleLogin = response => {
    console.log(response);
  }
  return (
    <div className="login-page">
      <h1>Login</h1>
      <GoogleLogin onSuccess={handleLogin}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
  
}