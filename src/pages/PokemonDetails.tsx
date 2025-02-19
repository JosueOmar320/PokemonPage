import { useParams } from "react-router-dom";
import { useEffect } from "react";
import usePokemon from "../hooks/usePokemon";
import { Pokemon } from "../types/Pokemon";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Chip,
  Divider,
  Grid2,
} from "@mui/material";

const PokemonDetails = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { fetchPokemon, pokemon, loading, error } = usePokemon();

  useEffect(() => {
    if (id) fetchPokemon(id);
  }, [id]);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;
  if (error || !pokemon)
    return <Typography color="error">Error al cargar el Pokémon</Typography>;

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 5,
        borderRadius: 3,
      }}
    >
      <Grid2 container spacing={3} justifyContent="center">
        <Grid2 display="flex" flexDirection="column" alignItems="center">
          <Typography variant="subtitle1">Normal</Typography>
          <CardMedia
            component="img"
            height="200"
            image={pokemon.sprites.front_default}
            alt={`${pokemon.name} normal`}
            sx={{
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          />
        </Grid2>

        <Grid2 display="flex" flexDirection="column" alignItems="center">
          <Typography variant="subtitle1">Shiny ✨</Typography>
          <CardMedia
            component="img"
            height="200"
            image={pokemon.sprites.front_shiny}
            alt={`${pokemon.name} shiny`}
            sx={{
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          />
        </Grid2>
      </Grid2>

      <CardContent>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
        >
          {pokemon.name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
        >
          #{pokemon.id}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Tipos:
        </Typography>
        <Grid2 container spacing={1} justifyContent="center">
          {pokemon.types.map(({ type }: Pokemon["types"][number]) => (
            <Grid2 key={type.name}>
              <Chip label={type.name} color="primary" />
            </Grid2>
          ))}
        </Grid2>

        <Divider sx={{ my: 2 }} />

        <Grid2 container spacing={2} justifyContent="space-between">
          <Grid2>
            <Typography variant="body1">
              <strong>Altura:</strong> {pokemon.height / 10} m
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">
              <strong>Peso:</strong> {pokemon.weight / 10} kg
            </Typography>
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Habilidades:
        </Typography>
        <Grid2 container spacing={1}>
          {pokemon.abilities.map(
            ({ ability }: Pokemon["abilities"][number]) => (
              <Grid2 key={ability.name}>
                <Chip label={ability.name} variant="outlined" />
              </Grid2>
            )
          )}
        </Grid2>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Estadísticas Base:
        </Typography>
        <Grid2 container spacing={1}>
          {pokemon.stats.map(
            ({ base_stat, stat }: Pokemon["stats"][number]) => (
              <Grid2 key={stat.name}>
                <Typography variant="body2">
                  <strong>{stat.name.toUpperCase()}:</strong> {base_stat}
                </Typography>
              </Grid2>
            )
          )}
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default PokemonDetails;
