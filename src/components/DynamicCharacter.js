import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DynamicCharacter = () => {
  const [perso, setPerso] = useState({});
  const { id } = useParams();

  console.log("perso :>> ", perso);
  useEffect(() => {
    const fetchPerso = async () => {
      try {
        await axios
          .get(`https://rickandmortyapi.com/api/character/${id}`)
          .then((res) => {
            console.log("res.data :>> ", res.data);
            setPerso(res.data);
          });
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    fetchPerso();
  }, [id]);
  console.log("id :>> ", id);
  const { name, image, gender, location, origin, species, status } = perso;
  return (
    <div>
      <img src={image} alt={name} />
      <div className="data-container">
        <h4>{name}</h4>
        <h6>{location?.name}</h6>
        <h6>{origin?.name}</h6>
        <h6>{species}</h6>
        <h6>{status}</h6>
        <h6>{gender}</h6>
      </div>
    </div>
  );
};

export default DynamicCharacter;
