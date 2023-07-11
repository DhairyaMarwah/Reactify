import React from "react"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes/routes"; 
 
function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Navigation /> 
        </BrowserRouter>
    );
}

export default App;
