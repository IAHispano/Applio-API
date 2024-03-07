import { app, port, faviconPath, routesDir } from "./config";
import { setupRoutes } from "./routes";
import { setupMiddleware } from "./utils/middleware/setupMiddleware";
import { errorHandler } from "./utils/error/errorHandler";
import { notFoundHandler } from "./utils/error/notFoundHandler";

// Setup Middleware
setupMiddleware(app, faviconPath);

// Setup Error Handling
app.onError(errorHandler);
app.notFound(notFoundHandler(routesDir));

// Setup Routes
setupRoutes();

// Export configuration
export default {
  port: port,
  fetch: app.fetch,
};
