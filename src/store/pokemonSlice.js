// src/store/pokemonSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Acción para cargar la lista de Pokémon
export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
    if (!res.ok) throw new Error("Error al cargar Pokémon");
    const data = await res.json();
    return data.results;
  }
);

// Acción para cargar detalle de un Pokémon
export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonDetail",
  async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error("Error al cargar detalle del Pokémon");
    const data = await res.json();
    return data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selected = action.payload;
    },
    clearSelectedPokemon: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Lista de Pokémon
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Detalle Pokémon
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading = false;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedPokemon, clearSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;