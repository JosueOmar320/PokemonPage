import { useParams } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import { useEffect } from "react";

const PokemonDetails = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { fetchPokemon, pokemon } = usePokemon();

  useEffect(() => {
    fetchPokemon(id || "");
  }, [id]);

  return <img src={pokemon?.sprites.front_shiny}></img>;
};

export default PokemonDetails;
