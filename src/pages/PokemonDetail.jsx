import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/detail.css";

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [name]);

  if (!pokemon) return <p className="loading">Cargando...</p>;

  return (
    <section className="pokemon-detail fade-in">
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <h2>{pokemon.name.toUpperCase()}</h2>
      <div className="info">
        <p><strong>Altura:</strong> {pokemon.height}</p>
        <p><strong>Peso:</strong> {pokemon.weight}</p>
        <p>
          <strong>Tipo:</strong>{" "}
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
      </div>
      <Link to="/pokemons" className="back-btn">← Volver</Link>
    </section>
  );
}

export default PokemonDetail;