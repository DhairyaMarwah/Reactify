const appContent = `
import React from "react"; 
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes/routes";
 
function App() {
    return (
        <BrowserRouter> 
            <Navigation /> 
        </BrowserRouter>
    );
}

export default App;
`;

module.exports = appContent;
