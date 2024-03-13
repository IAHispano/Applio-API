import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { findByName, getEntriesEasyPaged } from "../services/guidesService";
import { minPage, maxPerPage } from "../config";

const guides = new Hono();

guides.get("/", async (c) => {
  try {
    const page = Number(c.req.header("page")) || minPage;
    const pageSize = Number(c.req.header("perPage")) || maxPerPage;
    const title = c.req.header("title");

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
