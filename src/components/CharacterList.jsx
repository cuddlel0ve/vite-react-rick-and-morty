import React, { useState, useEffect } from "react";
import Character from "./Character";


function NavPage({page, setPage}){
  return (
    <header className="d-flex justify-content-between aling-center">
      <p>page: {page}</p>
      <button className="btn btn-primary btn-sm"
      onClick={() =>{
        setPage(page+1)
      }}>
        Next page {page+1}
      </button>
      <button className="btn btn-primary btn-sm"
      onClick={() =>{
        setPage(page-1)
      }}>
        prev page {page-1}
      </button>
    </header>
  )
}


function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await res.json();
      setLoading(false);
      setCharacters(data.results);
    }

    fetchData();
  }, [page]);

  return (
    <div className="container">
       <NavPage page={page} setPage={setPage}/>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
