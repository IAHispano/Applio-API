import { Context } from "hono";
import { getRouteFiles } from "../routeFiles";

export const notFoundHandler = (routesDir: string) => (context: Context) => {
  const possibleRoutes = getRouteFiles(routesDir);
  const errorMessage = {
    error: "Not Found",
    message: "The requested resource was not found.",
    possibleRoutes: possibleRoutes,
  };
  return context.json(errorMessage, 404);
};
