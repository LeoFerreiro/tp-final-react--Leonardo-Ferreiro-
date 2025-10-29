import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Acción asincrónica para cargar la lista de Pokémon
export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
    const data = await res.json();
    return data.results;
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
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { setSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;