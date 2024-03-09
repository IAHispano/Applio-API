import { Context } from "hono";
import { supabaseClient } from "../config";

export const apiKeys = async (c: Context, next: Function) => {
    const apiKey = c.req.header("apiKey");

    if (!apiKey) {
        console.error("API key missing");
        return c.text("API key missing", 400);
    }

    const { data, error } = await supabaseClient
        .from("tokens")
        .select("role")
        .eq('token', apiKey)
        .single();

    if (error) {
        console.error("Error validating API key", error);
        return c.text("Error validating API key", 403);
    }

    if (!data) {
        console.error("Invalid API key");
        return c.text("Invalid API key", 403);
    }

    c.set('role', data.role);
    await next();
}

export default apiKeys;