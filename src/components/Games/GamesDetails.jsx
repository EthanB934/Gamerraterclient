import { useParams } from "react-router-dom";

export const GameDetails = ({ token, games }) => {
  const { gameId } = useParams();

  const gameFromGames = () => {
    const game = games.find((game) => game.id === parseInt(gameId));
    return (
      <>
        <article>
          <section>
            <h1>{game.title}</h1>
            <p>{game.description}</p>
            <p>Designed by {game.designer}</p>
            <ul>
              {game.categories.map((category) => {
                return <li key={category.id}>{category.name}</li>
              })}
            </ul>
            <footer>
              Released in: {game.year_released} Total players:{" "}
              {game.player_count} Played for: {game.play_time} hours Recommended
              age: {game.age_to_play}
            </footer>
          </section>
        </article>
      </>
    );
  };

  return (
    <>
      {token && games.length > 0
        ? gameFromGames()
        : "Waiting for games to load..."}
    </>
  );
};
