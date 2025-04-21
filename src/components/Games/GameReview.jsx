import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const GameReview = ({ token }) => {
  const review = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const readLocationState = () => {
      if ("id" in location.state) {
        console.log(location.state)
        return <h1>Write a Review about {location.state.title}</h1>;
    } else {
      return;
    }
  };

  const handleSaveReview = async (event) => {
    event.preventDefault()
    const saveResponse = await fetch("http://localhost:8000/gamereviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        gameId: location.state.id,
        review: review.current.value,
      }),
    });
    if (saveResponse.ok) {
      navigate(`/games/${location.state.id}`);
    }
  };

  return (
    <form>
      {location.state ? readLocationState() : "Waiting for state..."}
      <textarea id="review-area" type="text" ref={review}></textarea>
      <button id="save" onClick={handleSaveReview}>
        Save
      </button>
    </form>
  );
};
