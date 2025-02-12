import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Pokemon } from "../types/Pokemon";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/AppRoutes";

interface PokeCardProps {
  pokemon: Pokemon;
}

const PokeCard = ({ pokemon }: PokeCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 345,
        textAlign: "center",
        boxShadow: 3,
        borderRadius: 2,
        padding: 2,
        backgroundColor: "#f8f9fa",
      }}
    >
      <CardActionArea
        onClick={() => navigate(`${routes.POKEMON.route}/${pokemon.id}`)}
      >
        <CardMedia
          component="img"
          height="140"
          image={pokemon.sprites.front_default}
          alt={pokemon.name}
          sx={{ objectFit: "contain", padding: 2 }}
        />

        <CardContent>
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            {pokemon.name.toUpperCase()}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Tipo: {pokemon.types.map((t) => t.type.name).join(", ")}
          </Typography>

          <Typography variant="body2">
            Peso: {pokemon.weight / 10} kg | Altura: {pokemon.height / 10} m
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokeCard;
