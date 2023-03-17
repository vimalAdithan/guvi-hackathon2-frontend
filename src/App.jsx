import "./App.css";
import * as React from "react";
import { UserEdit } from "./Checkout";
import { Head } from "./Head";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Head />} />
        <Route path="/cart" element={<UserEdit />} />
      </Routes>
    </div>
  );
}
export default App;
