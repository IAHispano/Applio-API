import { Hono } from "hono";
import * as path from "path";

export const app = new Hono();
export const port = parseInt(process.env.PORT || "3000");
export const routesDir = path.join(__dirname, process.env.ROUTES_DIR || "./routes");
export const faviconPath = process.env.FAVICON_PATH || "./src/public/favicon.ico";