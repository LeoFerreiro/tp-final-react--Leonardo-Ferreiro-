import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPokemonByName, addFavorite, removeFavorite } from "../store/pokemonSlice.js";
import "../styles/detail.css";

export default function PokemonDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedPokemon, favorites, loading } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonByName(id));
  }, [dispatch, id]);

  const isFavorite = selectedPokemon && favorites.some((f) => f.name === selectedPokemon.name);

  const handleFavorite = () => {
    if (!selectedPokemon) return;
    if (isFavorite) {
      dispatch(removeFavorite(selectedPokemon.name));
    } else {
      dispatch(addFavorite({ name: selectedPokemon.name, id: selectedPokemon.id }));
    }
  };

  if (loading || !selectedPokemon) return <p>Cargando Pokémon...</p>;

  return (
    <div className="detail-container">
      <h2>{selectedPokemon.name.toUpperCase()}</h2>
      <img
        src={selectedPokemon.sprites.front_default}
        alt={selectedPokemon.name}
        className="detail-img"
      />
      <p><strong>Altura:</strong> {selectedPokemon.height}</p>
      <p><strong>Peso:</strong> {selectedPokemon.weight}</p>
      <p>
        <strong>Tipo:</strong>{" "}
        {selectedPokemon.types.map((t) => t.type.name).join(", ")}
      </p>
      <p>
        <strong>Habilidades:</strong>{" "}
        {selectedPokemon.abilities.map((a) => a.ability.name).join(", ")}
      </p>
      <button className="fav-btn" onClick={handleFavorite}>
        {isFavorite ? "★ Quitar de Favoritos" : "☆ Agregar a Favoritos"}
      </button>
    </div>
  );
}