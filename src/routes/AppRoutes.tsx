import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import PokemonDetails from "../pages/PokemonDetails";

export const mainRoutes = {
  HOME: { route: "/", label: "Home" },
};

export const routes = {
  ...mainRoutes,
  POKEMON: { route: "/details", label: "Details" },
};

const router = createBrowserRouter(
  [
    {
      path: routes.HOME.route,
      element: <HomePage />,
    },
    {
      path: `${routes.POKEMON.route}/:id`,
      element: <PokemonDetails />,
    },
    { path: "*", element: <NotFoundPage /> },
  ],
  {
    basename: "/PokemonPage/",
  }
);

export default router;
