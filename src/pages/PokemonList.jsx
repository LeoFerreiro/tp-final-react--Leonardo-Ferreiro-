import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../store/pokemonSlice";
import { Link } from "react-router-dom";
import "../styles/list.css";

export default function PokemonList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando Pokémon...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pokemon-list">
      {list.map((p, index) => (
        <Link key={p.name} to={`/pokemon/${p.name}`} className="pokemon-card">
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