import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokeInfo, setPokeInfo] = useState<any>(null);

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
          <h2>{pokeInfo.name}</h2>
          <img src={pokeInfo.sprites.front_default} alt={pokeInfo.name} />
          {/* Puedes agregar más detalles si lo deseas */}
        </Box>
      )}
      {/* <Button type="submit" variant="contained" color="primary">
        search
      </Button> */}
    </Box>
  );
}

export default App;
