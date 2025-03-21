import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { GamesList } from './Games/GamesList.jsx'
import { Register } from "../pages/Register.jsx"


export const ApplicationViews = () => {
    const gamerRaterUser = JSON.parse(localStorage.getItem("token"))
    console.log(gamerRaterUser)
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<GamesList />} />
            </Route>
        </Routes>
    </BrowserRouter>
}