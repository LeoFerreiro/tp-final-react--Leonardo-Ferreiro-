import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/list.css";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  return (
    <section className="pokemon-list fade-in">
      <h2>Listado de Pokémons</h2>
      <div className="grid">
        {pokemons.map((p, index) => (
          <Link key={p.name} to={`/pokemon/${p.name}`} className="card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              alt={p.name}
            />
            <h3>{p.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PokemonList;