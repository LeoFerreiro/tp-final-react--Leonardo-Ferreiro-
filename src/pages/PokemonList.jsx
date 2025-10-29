import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/list.css";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando pokemons", err));
  }, []);

  if (loading) return <p>Cargando Pokemons...</p>;

  return (
    <div className="pokemon-list">
      {pokemons.map((p, index) => (
        <Link to={`/pokemon/${p.name}`} key={p.name} className="pokemon-card">
  <img
    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
    alt={p.name}
    />
    <h3>{p.name.toUpperCase()}</h3>
    </Link>
  ))}
    </div>
  );
}

export default PokemonList;