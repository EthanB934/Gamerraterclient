import { Link } from "react-router-dom";

export const GamesList = ({ token, games }) => {
  const listGames = (games) => {
    const gamesList = games.map((game) => {
      return <li key={game.id} className="game-card"><Link to={`/games/${game.id}`}>{game.title}</Link></li>;
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
