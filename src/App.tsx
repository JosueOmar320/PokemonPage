import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PokeCard from "./components/PokeCard";
import { Pokemon } from "./types/Pokemon";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokeInfo, setPokeInfo] = useState<Pokemon | null>(null);
  //test
  useEffect(() => {
    if (pokemonName) {
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then((response) => response.json())
        .then((data) => setPokeInfo(data))
        .catch(() => {
          setPokeInfo(null);
        });
    }
  }, [pokemonName]);

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
      />
      {pokeInfo && (
        <Box>
          <PokeCard pokemon={pokeInfo} />
        </Box>
      )}
      {/* <Button type="submit" variant="contained" color="primary">
        search
      </Button> */}
    </Box>
  );
}

export default App;
