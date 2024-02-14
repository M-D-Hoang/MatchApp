import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Listings } from "./pages/Listings/Listings";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Listings/>} />
                        {/* <Route path="sell" element={<Sell />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
