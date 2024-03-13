import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { findByName, getEntriesEasyPaged } from "../services/guidesService";
import { maxPageSizeHandler } from "../utils/error/maxPageSizeHandler";

const guides = new Hono();

guides.get("/", async (c) => {
  try {
    const page = Number(c.req.header("page")) || 1;
    let pageSize = Number(c.req.header("perPage")) || 20;
    const title = c.req.header("title");

    maxPageSizeHandler(c, pageSize);

    if (title) {
      const data = await findByName(title);
      return c.json(data);
    }

    if (!title) {
      const data = await getEntriesEasyPaged(page, pageSize);
      return c.json(data);
    }
  } catch (error) {
    return errorHandler(c, error);
  }
});

export default guides;
