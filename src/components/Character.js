import React from "react";
import { useHistory } from "react-router-dom";

const Character = ({ character }) => {
  console.log("props :>> ", character);
  let history = useHistory();
  return (
    <div className="character-container">
      {character.map((el, index) => {
        const { id, name, image } = el;
        return (
          <div
            className="card"
            key={index}
            onClick={() => history.push(`/character/${id}`)}
          >
            <img src={image} alt={name} className="card-img" />
            <h4>{name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Character;
