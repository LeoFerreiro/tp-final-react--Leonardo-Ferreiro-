import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [name]);

  if (!pokemon) return <p>Cargando...</p>;

  return (
    <section className="detail">
      <h2>{pokemon.name.toUpperCase()}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width="150"
        height="150"
      />
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <p>Tipo: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <Link to="/pokemons">Volver al listado</Link>
    </section>
  );
}

export default PokemonDetail;