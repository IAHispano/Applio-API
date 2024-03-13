import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { findByName, getEntriesEasyPaged } from "../services/modelsService";
import { minPage, maxPerPage } from "../config";

const models = new Hono();

models.get("/", async (c) => {
  try {
    const title = c.req.header("name");
    const page = Number(c.req.header("page")) || minPage;
    const pageSize = Number(c.req.header("perPage")) || maxPerPage;

    if (title) {
      const data = await findByName(title);
      if (data.length === 0) {
        return c.json({ message: "No results found." });
      }
      return c.json(data);
    }

    if (!title) {
      const data = await getEntriesEasyPaged(page, pageSize);
      if (data.length === 0) {
        return c.json({ message: "No results found." });
      }
      return c.json(data);
    }
  } catch (error) {
    return errorHandler(c, error);
  }
});

export default models;
