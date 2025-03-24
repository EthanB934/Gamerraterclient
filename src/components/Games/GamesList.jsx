import { useEffect, useState } from "react";
import "./GamesList.css"
export const GamesList = ({ token }) => {
  const [games, setGames] = useState([]);
  // Depends on user token. Does not execute unless the token object's token property is defined.
  useEffect(() => {
    const getAllGames = async () => {
      if (token.token) {
        const response = await fetch("http://localhost:8000/games", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token.token}`,
            Accept: "application/json",
          },
        });
        const games = await response.json();
        // Updates state variable.
        return setGames(games);
      }
    };
    getAllGames();
  }, [token]);

  // Maps each element in the games array to fit a list format
  const gamesListing = (games) => {
    const list = games.map((game) => {
      return <li className="game">
        {game.title}
        <img className="game-image" src={game.picture_of_game} alt="Cover Image"/>
        <p className="game-year">Released in {game.year_released}</p>
        <p className="game-player">Daily concurrent players: {game.player_count}</p>
        <p className="game-player-age">Must be {game.age_to_play} years old to play</p>
      </li>;
    });
    return list
  };

  return (
    <>{games.length > 0 ? <ul className="game-list">{gamesListing(games)}</ul> : "Loading games list..."}</>
  );
};
