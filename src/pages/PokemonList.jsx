import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  return (
    <section className="list">
      <h2>Listado de Pokémons</h2>
      <div className="grid">
        {pokemons.map((p) => (
          <Link key={p.name} to={`/pokemon/${p.name}`} className="card">
            <h3>{p.name.toUpperCase()}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PokemonList;