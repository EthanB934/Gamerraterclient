import { Link } from "react-router-dom";
import "./GamesList.css"
import "../../pages/Home.css"
export const GamesList = ({ token, games }) => {
  const listGames = (games) => {
    const gamesList = games.map((game) => {
      return <li key={game.id} className="game-card"><Link to={`/games/${game.id}`} className="game">{game.title}{" "}<i class="fa-solid fa-arrow-right"></i></Link></li>;
    });
    gamesList.join(" ");
    return gamesList;
  };
  return (
    <article className="all-games">
      {token && games ? (
        <ul className="games-list">{listGames(games)}</ul>
      ) : (
        "Waiting for games..."
      )}
    </article>
  );
};
