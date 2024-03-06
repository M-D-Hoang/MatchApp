import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { Listings } from "./pages/Listings/Listings";
import { Sell } from "./pages/Sell/Sell";
import { Edit } from "./pages/Edit/Edit";
import { FullView } from "./pages/FullView/FullView";
import { UserPage } from "./pages/UserProfile/UserProfile";
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {
    return (
        <GoogleOAuthProvider clientId="process.env.REACT_APP_GOOGLE_CLIENT_ID">
          <div className="App">
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<AppLayout />}>
                          <Route index element={<Listings />} />
                          <Route path="sell" element={<Sell />} />
                          <Route path="edit" element={<Edit />} />
                          <Route path="fullview" element={<FullView />} />
                          <Route path='my-page' element={<UserPage/>}/>
                      </Route>
                  </Routes>
              </BrowserRouter>
          </div>
        </GoogleOAuthProvider>
    );
}

export default App;
