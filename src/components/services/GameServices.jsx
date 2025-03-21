export const getAllGames = async () => {
    return await fetch("http://localhost:8000/games").then((res) => res.json())
}