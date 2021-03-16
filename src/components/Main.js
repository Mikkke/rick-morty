import React, { useEffect, useState } from "react";
import axios from "axios";
import Character from "./Character";

const url = "https://rickandmortyapi.com/api/character";
const Main = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = () => {
      try {
        axios
          .get(url)
          .then((res) => {
            setLoading(false);
            setCharacters(res.data.results);
            console.log("res.data :>> ", res.data);
          })
          .catch((err) => {
            setLoading(false);
            console.log("err :>> ", err);
          });
      } catch (error) {
        setLoading(false);
        console.log("error :>> ", error);
      }
    };
    fetchCharacters();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      Welcome to my main
      <Character character={characters} />
    </div>
  );
};

export default Main;
