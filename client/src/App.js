import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { Listings } from "./pages/Listings/Listings";
import { Sell } from "./pages/Sell/Sell";
// import { YourListings } from "./pages/YourListings/YourListings";
import { Edit } from "./pages/Edit/Edit";
import { FullView } from "./pages/FullView/FullView";
import { Notifications } from "./pages/Notifications/Notifications";
import { UserPage } from "./pages/UserProfile/UserProfile";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { useState } from "react";
import {MissingPage} from './pages/404/404.js'
import { UserEdit } from "./components/UserEdit/UserEdit.js";
// import { set } from "../../server/server.js";

function App() {
    const [pfpURL, setPfpURL] = useState('');
    //This sends out stale data sometimes.
    const [username, setUsername] = useState("");
    const clientID = '814081120756-6v1oiqc3019b696l91gq12gikok50975.apps.googleusercontent.com';

    return (
        <GoogleOAuthProvider clientId={clientID}>
          <div className="App">
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<AppLayout setUsername={setUsername} username={username} pfpURL={pfpURL} setPfpURL={setPfpURL}/>}>
                      <Route index element={<Listings />} />
                      <Route path="sell" element={<Sell />} />
                      <Route path="edit" element={<Edit />} />
                      <Route path="fullview/item/:id" element={<FullView key={"full-view-item"} isCar={false} />} />
                      <Route path="fullview/car/:id" element={<FullView key={"full-view-car"} isCar={true} />} />
                      <Route path="notifications/" element={<Notifications/>} />
                      <Route path='my-page' element={<UserPage/>}/>
                      <Route path="fullview" element={<FullView key={"full-view"} />} />                     
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
