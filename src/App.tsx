import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PokeCard from "./components/PokeCard";
import usePokemon from "./hooks/usePokemon";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const { pokemon, loading, error } = usePokemon(pokemonName);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
  };

  return (
    <Box>
      <TextField
        label="pokemon name"
        name="pokemonName"
        value={pokemonName}
        onChange={changeName}
        fullWidth
      />
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {pokemon && <PokeCard pokemon={pokemon} />}
      {/* <Button type="submit" variant="contained" color="primary">
        search
      </Button> */}
    </Box>
  );
}

export default App;
