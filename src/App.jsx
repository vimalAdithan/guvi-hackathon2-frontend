import "./App.css";
import * as React from "react";
import { UserEdit } from "./Checkout";
import { Head } from "./Head";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { AddForm } from "./AddForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Head />} />
        <Route path="/cart" element={<UserEdit />} />
        <Route path="/add" element={<AddForm />} />
      </Routes>
    </div>
  );
}
export default App;
