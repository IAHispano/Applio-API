import { Context } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { supabaseClient } from "../config";
import { errorHandler } from "./error/errorHandler";


export const apiKeys = async (c: Context, next: Function) => {
    try {
        const token = c.req.header("Authorization");

        if (!token) {
            return c.text('You must enter an API key via header, see https://applio.org/api/docs for more information.', 400);
        } else {
            const {data, error} = await supabaseClient
            .from('tokens')
            .select('role')
            .eq('token', token)

            if (error || data.length === 0) {
                return c.text('You must enter a valid api key, see https://applio.org/api and generate one if you don`t have one.', 400);
            }

            if (data) {
                bearerAuth({ token });
                await next();
            }
        }
    } catch (error) {
        return errorHandler(c, error);
    }
}

export default apiKeys;