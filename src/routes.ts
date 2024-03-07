import { app } from "./config";
import pingRoute from "./routes/ping";

export const setupRoutes = () => {
  // Handler for root route
  app.get("/", (context: any) => {
    return context.text(
      "Welcome to Applio API, check https://applio.org/api for more usage information."
    );
  });

  // Routes
  app.route("/ping", pingRoute);
    //app.route("/models", modelsRoute);
    //app.route("/blogs", blogsRoute);
    //app.route("/guides", guidesRoute);
    //app.route("/users", usersRoute);
};
