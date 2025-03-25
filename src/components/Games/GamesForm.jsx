import { useRef, useState } from "react";
import "./GamesForm.css";
import { useNavigate } from "react-router-dom";
export const GamesForm = ({ token }) => {
  const [pictureData, setPictureData] = useState("")
  const navigate = useNavigate();
  const title = useRef();
  const picture = useRef();
  const description = useRef();
  const designer = useRef();
  const year = useRef();
  const playerCount = useRef();
  const playTime = useRef();
  const age = useRef();

  const handleFormSubmit = async (event) => {
    const gameForm = {
      title: title.current.value,
      description: description.current.value,
      designer: designer.current.value,
      year: year.current.value,
      players: playerCount.current.value,
      play_time: playTime.current.value,
      age_to_play: age.current.value,
    };
    const gameResponse = await fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(gameForm),
    });
    const createdData = await gameResponse.json()
    
    const gamePictureResponse = await fetch("http://localhost:8000/gamepictures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token.token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify({
        game: createdData,
        game_image: pictureData
      })
    })

    if (response.ok) {
        navigate("/games")
    }
    else {
        window.alert("Something has went wrong with the submission")
    }
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file)
  }

  const createGameImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      console.log("Base64 of file is ", base64ImageString)
      setPictureData(base64ImageString)
    })
  }
  return (
    <article className="game-form">
      <fieldset className="entry-group">
        <label className="title-entry">Title</label>
        <input
          type="text"
          id="title-input"
          ref={title}
          placeholder="Game Title"
        />
        <label className="file-entry column-2">Picture:</label>
        <input type="file" id="file-input" ref={picture} onChange={createGameImageString} />
        <input type="hidden" id="game_id" />
        <label className="description-entry ">Description:</label>
        <textarea
          type="text"
          id="description-input"
          ref={description}
          placeholder="Describe Your Game"
        />
        <label className="designer-entry ">Game Designer:</label>
        <input
          type="text"
          id="designer-input"
          ref={designer}
          placeholder="Designer"
        />
        <label className="year-entry ">Year:</label>
        <input
          type="number" 
          id="year-input"
          ref={year}
          max="2025"
          min="1980"
          placeholder="1980"
        />
        <label className="player-count-entry ">Player Estimate:</label>
        <input type="number" id="player-count-input" ref={playerCount} />
        <label className="play-time-entry ">Play Time:</label>
        <input type="number" id="play-time-input" ref={playTime} />
        <label className="age-entry ">Recommended Age Group:</label>
        <input
          type="number"
          id="age-input"
          min="10"
          max="18"
          placeholder="18"
          ref={age}
        />
        <button
          className="form-submission"
          id="submit"
          onClick={handleFormSubmit}
        >
          Add Game
        </button>
      </fieldset>
    </article>
  );
};
