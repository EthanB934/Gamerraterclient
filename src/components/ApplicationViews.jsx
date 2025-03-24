import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import Home from "../pages/Home";
import { GamesList } from "./Games/GamesList.jsx";
import { Register } from "../pages/Register.jsx";
import { useEffect, useState } from "react";
import { GamesForm } from "./Games/GamesForm.jsx";

export const ApplicationViews = () => {
  const [token, setToken] = useState({});
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("gamer_token")));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home token={token}/>} />
          <Route path="games" element={<GamesForm token={token}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
