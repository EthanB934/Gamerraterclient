import { useEffect, useRef, useState } from "react";
import "./GamesForm.css";
import { useNavigate } from "react-router-dom";
export const GamesForm = ({ token, categories }) => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const title = useRef();
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
    console.log(gameForm);
    // const gameResponse = await fetch("http://localhost:8000/games", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Token ${token.token}`,
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(gameForm),
    // });

    if (gameResponse.ok) {
      navigate("/");
    } else {
      window.alert("Something has went wrong with the submission");
    }
  };

  const listCategories = () => {
    // Maps a list of checkboxes representing each category
    return categories.map((category) => {
      return (
        <section key={category.id}> 
        {/* Each checkbox is listening for onChange event */}
          <input type="checkbox" id={category.id}  onChange={handleCheckboxSelection} />
          {category.name}
        </section>
      );
    });
  };

  const handleCheckboxSelection = (event) => {
    // Selects all checkboxes it document. We will iterate through modifying their properties
    const checkboxes = document.querySelectorAll("input[type=\"checkbox\"]")
    if (event.target.checked) {
      // Retrieves the id of the selected checkbox
      const checkBoxId = parseInt(event.target.id);
      // Stores the checkBox's unique id in state
      setCategory([...category, checkBoxId]);
      // Disables all other checkboxes that were not chosen
      checkboxes.forEach((checkbox) => {
        if(checkbox.id !== event.target.id) {
          checkbox.disabled = true;
        }
      })
    }
    else {
      // If the chosen checkbox is unchecked
      // Resets the chosen checkbox array to an empty array
      setCategory([])
      // Reenables all checkboxes again.
      checkboxes.forEach((checkbox) => {
        checkbox.disabled = false;
      })
    }
  };

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
        <section className="game-categories">
          <h2>
            Categories (Please Choose One):
            <ul className="category-list">{listCategories()}</ul>
          </h2>
        </section>
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
