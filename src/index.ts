import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { prettyJSON } from "hono/pretty-json";
import * as fs from "fs";
import * as path from "path";

// Import routes
import pingRoute from "./routes/ping";
//import modelsRoute from "./routes/models";
//import blogsRoute from "./routes/blogs";
//import guidesRoute from "./routes/guides";
//import usersRoute from "./routes/users";

const app = new Hono();
const port = parseInt(process.env.PORT || "3000");

// Middleware for logging all requests
app.use("*", logger());

// Middleware for pretty JSON
app.use(prettyJSON({ space: 2 }));

// Middleware for serving favicon
const faviconPath = process.env.FAVICON_PATH || "./src/public/favicon.ico";
app.use("/favicon.ico", serveStatic({ path: faviconPath }));

// Handler for root route
app.get("/", (context) => {
  return context.text(
    "Welcome to Applio API, check https://applio.org/api for more usage information."
  );
});

// Handler for 404 Not Found

// Function to get list of route files
const getRouteFiles = () => {
  const routesDir = path.join(__dirname, "routes");
  const files = fs.readdirSync(routesDir);
  return files.map((file) => "/" + path.parse(file).name);
};

// Handler for 404 Not Found
app.notFound((context) => {
  const possibleRoutes = getRouteFiles();
  const errorMessage = {
    error: "Not Found",
    message: "The requested resource was not found.",
    possibleRoutes: possibleRoutes,
  };
  return context.json(errorMessage, 404);
});

// Error handling middleware
app.onError((error, context) => {
  console.error(error);
  return context.text(
    "500: Unexpected error, if this continues do not hesitate to report it at https://github.com/IAHispano/Applio-API/issues",
    500
  );
});

// Routes
app.route("/ping", pingRoute);
//app.route("/models", modelsRoute);
//app.route("/blogs", blogsRoute);
//app.route("/guides", guidesRoute);
//app.route("/users", usersRoute);

// Export configuration
export default {
  port: port,
  fetch: app.fetch,
};
