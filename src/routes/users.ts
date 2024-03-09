import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { getUsersByName } from "../services/usersService";
import { maxPageSizeHandler } from "../utils/error/maxPageSizeHandler";

const users = new Hono();

users.get("/", async (c) => {
  try {
    const username = c.req.header("username");
    const page = Number(c.req.header("page"));
    let pageSize = Number(c.req.header("perPage"));

    maxPageSizeHandler(c, pageSize);

    if (username) {
      const data = await getUsersByName(username, page, pageSize);
      return c.json(data);
    }
  } catch (error) {
    users.onError(errorHandler);
  }
});

export default users;
