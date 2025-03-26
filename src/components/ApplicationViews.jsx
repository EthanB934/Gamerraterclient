import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { useEffect, useState } from "react";
import { GamesList } from "./Games/GamesList.jsx";
import { GameDetails } from "./Games/GamesDetails.jsx";
import { GamesForm } from "./Games/GamesForm.jsx";
import Home from "../pages/Home.jsx";

export const ApplicationViews = () => {
  const [token, setToken] = useState({});
  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])
  // Gets user-specific token from local storage after login or registration process
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("gamer_token")));
  }, []);

  // GETs all game resources from database, user must be logged in before a response is given
  const getAllGames = async () => {
    const gamesResponse = await fetch("http://localhost:8000/games", {
      method: "GET",
      headers: {
        "Authorization": `Token ${token.token}`,
        Accept: "application/json"
      }
    })

    // Resolves promises of API fetch
    const games = await gamesResponse.json()

    setGames(games)
  }

  const getAllCategories = async () => {
    const categoriesResponse = await fetch("http://localhost:8000/categories", {
      method: "GET",
      headers: {
        "Authorization": `Token ${token.token}`,
        Accept: "application/json"
      }
    })
    const categories = await categoriesResponse.json()
    setCategories(categories)
  }

  useEffect(() => {
    if(token.token) {
      getAllGames()
      getAllCategories()
    }
    else {
      return;
    }
  }, [token])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home token={token} games={games}/>} />
          <Route path="games/:gameId" element={<GameDetails token={token} games={games}/>} />
          <Route path="game-form" element={<GamesForm token={token} categories={categories}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
