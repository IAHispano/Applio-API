import { app } from "./config";

import pingRoute from "./routes/ping";
import usersRoute from "./routes/users";
import modelsRoute from "./routes/models";
import blogsRoute from "./routes/blogs";
import guidesRoute from "./routes/guides";
import uploadRoute from "./routes/upload";

export const setupRoutes = () => {
  // Handler for root route
  app.get("/", (context: any) => {
    return context.text(
      "Welcome to Applio API, check https://applio.org/api for more usage information.",
    );
  });

  // Routes
  app.route("/ping", pingRoute);
  app.route("/models", modelsRoute);
  app.route("/blogs", blogsRoute);
  app.route("/guides", guidesRoute);
  app.route("/users", usersRoute);
  app.route("/upload", uploadRoute);
};
