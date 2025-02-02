import { Box, Typography } from "@mui/material";
import { Pokemon } from "../types/Pokemon";

interface PokeCardProps {
  pokemon: Pokemon;
}

const PokeCard = ({ pokemon }: PokeCardProps) => {
  return (
    <Box>
      <Typography variant="h2" component="h2">
        {pokemon.name}
      </Typography>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </Box>
  );
};

export default PokeCard;
