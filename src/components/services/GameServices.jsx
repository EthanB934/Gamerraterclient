export const getAllGames = async (token) => {
    return await fetch("http://localhost:8000/games",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${(token.token)}`,
                "Accept": "application/json"
            }
        }
    ).then((res) => res.json())
}