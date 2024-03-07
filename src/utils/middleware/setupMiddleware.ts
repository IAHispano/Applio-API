import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { prettyJSON } from "hono/pretty-json";

export const setupMiddleware = (app: any, faviconPath: string) => {
  // Middleware for logging all requests
  app.use("*", logger());

  // Middleware for pretty JSON
  app.use(prettyJSON({ space: 2 }));

  // Middleware for serving favicon
  app.use("/favicon.ico", serveStatic({ path: faviconPath }));
};
