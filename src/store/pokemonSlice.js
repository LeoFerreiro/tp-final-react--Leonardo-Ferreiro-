export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonDetail",
  async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.loading = true;
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