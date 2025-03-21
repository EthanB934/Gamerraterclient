import { useEffect, useState } from "react"
import { getAllGames } from "../services/GameServices"

export const GamesList = ({ token }) => {
    const [games, setGames] = useState([])
    useEffect(() => {getAllGames(token).then((gamesArray) => setGames(gamesArray))}, [token])
    return <>This is where the list of added games will be</>
}