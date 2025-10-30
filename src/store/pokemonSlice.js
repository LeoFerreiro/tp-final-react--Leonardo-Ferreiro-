import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Obtener lista de Pokémon
export const fetchPokemons = createAsyncThunk("pokemon/fetchPokemons", async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  return data.results;
});

// 🔹 Obtener detalle por nombre o ID
export const fetchPokemonByName = createAsyncThunk("pokemon/fetchPokemonByName", async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return data;
});

// 🔹 Leer favoritos del localStorage al iniciar
const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
    selectedPokemon: null,
    favorites: initialFavorites,
    loading: false,
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favorites.some((f) => f.name === action.payload.name);
      if (!exists) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((f) => f.name !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.loading = false;
        state.error = "Error al cargar los Pokémon.";
      })
      .addCase(fetchPokemonByName.pending, (state) => {
        state.loading = true;
        state.selectedPokemon = null;
      })
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonByName.rejected, (state) => {
        state.loading = false;
        state.error = "Error al cargar el detalle.";
      });
  },
});

export const { addFavorite, removeFavorite } = pokemonSlice.actions;

export default pokemonSlice.reducer;