import React, { useEffect, useState } from "react";
import axios from "axios";
import Character from "./Character";

const url = "https://rickandmortyapi.com/api/character";
const Main = () => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  const fetchCharacters = async () => {
    try {
      await axios
        .get(url)
        .then((res) => {
          setLoading(false);
          setCharacters(res.data.results);
          setNextPage(res.data.info.next);
          setPrevPage(res.data.info.prev);
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

  const fetchNextCharacters = () => {
    axios.get(nextPage).then((res) => {
      setNextPage(res.data.info.next);
      setPrevPage(res.data.info.prev);
      setCharacters(res.data.results);

      console.log("res.data :>> de next ", res.data);
    });
  };
  const fetchPrevCharacters = () => {
    axios.get(prevPage).then((res) => {
      setPrevPage(res.data.info.prev);
      setCharacters(res.data.results);

      console.log("res.data :>> ", res.data);
    });
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .get(`https://rickandmortyapi.com/api/character/?name=${searchInput}`)
        .then((res) => {
          setCharacters(res.data.results);
          console.log("res.data :>> ", res.data);
        })
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
      {prevPage === null ? (
        ""
      ) : (
        <button onClick={fetchPrevCharacters}>Precedent</button>
      )}
      {nextPage === null ? (
        ""
      ) : (
        <button onClick={fetchNextCharacters}>Suivant</button>
      )}
    </section>
  );
};

export default Main;
