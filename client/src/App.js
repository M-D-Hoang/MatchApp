import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { Listings } from "./pages/Listings/Listings";
import { Sell } from "./pages/Sell/Sell";
import { YourListings } from "./pages/YourListings/YourListings";
import { Edit } from "./pages/Edit/Edit";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Listings />} />
                        <Route path="sell" element={<Sell />} />
                        <Route path="your-listings" element={<YourListings />} />
                        <Route path="edit" element={<Edit />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
