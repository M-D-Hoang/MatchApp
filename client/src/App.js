import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { Listings } from "./pages/Listings/Listings";
import { Sell } from "./pages/Sell/Sell";
// import { YourListings } from "./pages/YourListings/YourListings";
import { Edit } from "./pages/Edit/Edit";
import { FullView } from "./pages/FullView/FullView";
import { UserPage } from "./pages/UserProfile/UserProfile";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { useState } from "react";
import {MissingPage} from './pages/404/404.js'
import { UserEdit } from "./components/UserEdit/UserEdit.js";

function App() {
    const [pfpURL, setPfpURL] = useState('');
    const [username, setUsername] = useState("");

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <div className="App">
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<AppLayout setUsername={setUsername} username={username} pfpURL={pfpURL} setPfpURL={setPfpURL}/>}>
                      <Route index element={<Listings />} />
                      <Route path="sell" element={<Sell />} />
                      <Route path="edit" element={<Edit />} />
                      <Route path="fullview" element={<FullView />} />                     
                      <Route path='user/:username' element={<UserPage/>}/>
                      <Route path='user/edit' element={<UserEdit setPfpURL={setPfpURL}/>}/>
                      <Route path="*" element={<MissingPage/>}/>  
                      </Route>
                  </Routes>
              </BrowserRouter>
          </div>
        </GoogleOAuthProvider>
    );
}

export default App;
