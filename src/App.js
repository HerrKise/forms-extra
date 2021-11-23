import React from "react";
import { Route, Routes } from "react-router-dom";
import Edit from "./components/edit";

import Main from "./components/main";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/edit" element={<Edit />} />
                <Route path="/" exact element={<Main />} />
            </Routes>
        </div>
    );
}

export default App;
