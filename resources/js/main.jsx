import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App.jsx";
import AddCooperator from "./pages/AddCooperator.jsx";
import ListCooperator from "./pages/ListCooperator.jsx";
import EditCooperator from "./pages/EditCooperator";


ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cooperados" element={<ListCooperator />} />
        <Route path="/cooperados/add" element={<AddCooperator
        
        onSaved={(cooperator) => {
            console.log("Salvo:", cooperator);
        }}
        />} />
        <Route path="/cooperados/edit/:id" element={<EditCooperator
        onSaved={(cooperator) => {
            console.log("Salvo:", cooperator);
        }}
        />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);