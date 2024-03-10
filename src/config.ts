import { Hono } from "hono";
import * as path from "path";
import { createClient } from "@supabase/supabase-js";


export const app = new Hono();

export const port = parseInt(process.env.PORT || "3000");
export const routesDir = path.join(__dirname, process.env.ROUTES_DIR || "./routes");
export const faviconPath = process.env.FAVICON_PATH || "./src/public/favicon.ico";

export const maxPageSize = parseInt(process.env.MAX_PAGE_SIZE || "20");

// Rates
export const premiumRateLimit = parseInt(process.env.premiumRateLimit || "300");
export const defaultRateLimit = parseInt(process.env.defaultRateLimit || "100");

// Supabase
export const supabaseUrl = process.env.SUPABASE_URL || "";
export const supabaseKey = process.env.SUPABASE_KEY || "";
export const supabaseClient = createClient(supabaseUrl, supabaseKey);