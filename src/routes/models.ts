import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { findByName, getEntriesEasyPaged } from "../services/modelsService";
import { maxPageSize } from "../config";

const models = new Hono();

models.get("/", async (c) => {
  try {
    const title = c.req.header("name");
    const page = Number(c.req.header("page")) || 1;
    let pageSize = Number(c.req.header("perPage")) || 20;

    if (pageSize > maxPageSize) {
      return c.text(
        `Page size cannot exceed, the max page size is ${maxPageSize}.`,
        400
      );
    }

    if (!title) {
      const data = await getEntriesEasyPaged(page, pageSize);
      return c.json(data);
    }

    if (title) {
      const data = await findByName(title);
      return c.json(data);
    }
  } catch (error) {
    models.onError(errorHandler);
  }
});

export default models;
