import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { getUsersByName, getUsers } from "../services/usersService";
import { minPage, maxPerPage } from "../config";

const users = new Hono();

users.get("/", async (c) => {
  try {
    const username = c.req.header("username");
    const page = Number(c.req.header("page")) || minPage;
    const pageSize = Number(c.req.header("perPage")) || maxPerPage;

    if (username) {
      const data = await getUsersByName(username, page, pageSize);
      if (data.length === 0) {
        return c.json({ message: "No results found." });
      }
      return c.json(data);
    }

    if (!username) {
      const data = await getUsers(page, pageSize);
      if (data.length === 0) {
        return c.json({ message: "No results found." });
      }
      return c.json(data);
    }
  } catch (error) {
    return errorHandler(c, error);
  }
});

export default users;
