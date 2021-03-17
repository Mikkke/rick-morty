import React, { useEffect, useState } from "react";
import axios from "axios";
import Character from "./Character";

const url = "https://rickandmortyapi.com/api/character";
const Main = () => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchCharacters = async () => {
    try {
      await axios
        .get(url)
        .then((res) => {
          setLoading(false);
          setCharacters(res.data.results);
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
  useEffect(() => {
    fetchCharacters();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .get(`https://rickandmortyapi.com/api/character/?name=${searchInput}`)
        .then((res) => console.log("res.data :>> ", res.data))
        .catch((err) => console.log("err :>> ", err));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <section className="main-section">
      Welcome to my main
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          placeholder="exemple rick..."
          onChange={(e) => {
            setSearchInput(e.target.value);
            console.log(e.target.value);
          }}
        />
        <button type="submit">Rechercher</button>
      </form>
      <Character character={characters} />
    </section>
  );
};

export default Main;
