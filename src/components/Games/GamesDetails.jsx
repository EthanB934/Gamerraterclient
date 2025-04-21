import { useNavigate, useParams } from "react-router-dom";
import "./GamesDetails.css";
import { ReviewsList } from "./ReviewList";
export const GameDetails = ({ token, games, reviews }) => {
  const { gameId } = useParams();
  const navigate = useNavigate()

  const gameFromGames = () => {
    const game = games.find((game) => game.id === parseInt(gameId));
    return (
      <>
        <article className="game-details">
          <h1 className="game-title">{game.title}</h1>
          <section className="details">
            <p className="game-description">{game.description}</p>
            <p className="game-designer">Designed by {game.designer}</p>
            <ul className="game-category-list">
              {game.categories.map((category) => {
                return (
                  <li className="game-category" key={category.id}>
                    {category.name}
                  </li>
                );
              })}
            </ul>
            <footer className="details-footer">
              |{" "}Released in: <strong>{game.year_released}</strong>{" "}|{" "}Total players:
              {" "}<strong>{game.player_count}</strong>{" "}| Estimated play time <strong>{game.play_time}</strong> hours{" "}|{" "}Recommended
              age: <strong>{game.age_to_play}</strong>{" "}|
            </footer>
          </section>
          <section className="game-review">
              <button className="review-button" id="review" onClick={() => {
                navigate(`/games/${game.id}/review`, {state: game})
              }}>Leave a Review</button>
              <h1 className="reviews-section-header">Reviews</h1>
              <ReviewsList reviews={reviews} game={game}/>
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
