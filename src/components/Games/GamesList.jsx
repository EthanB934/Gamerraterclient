import { useEffect, useState } from "react"
import { getAllGames } from "../services/GameServices"

export const GamesList = () => {
    const [games, setGames] = useState([])
    useEffect(() => {getAllGames().then((gamesArray) => setGames(gamesArray))}, [])
    return <>This is where the list of added games will be</>
}