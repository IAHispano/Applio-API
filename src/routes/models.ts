import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { findByAlgorithm, findByName, findByType, findByUsername, findByUsernameAndType, getEntriesEasyPaged } from "../services/modelsService";
import { maxPageSize } from "../config";

const models = new Hono();

models.get("/", async (c) => {
  try {
    const title = c.req.header("name");
    const type = c.req.header("type");
    const username = c.req.header("createdBy")
    const algorithm = c.req.header("algorithm");
    const page = Number(c.req.header("page")) || minPage;
    const pageSize = Number(c.req.header("perPage")) || maxPerPage;

    if (pageSize > maxPageSize) {
      const message = `Page size cannot exceed, the max page size is ${maxPageSize}.`;
      console.log(message);
      return c.text(message, 400);
    }

    if (title) {
      const data = await findByName(title);
      return c.json(data);
    }

    if (type) {
      const data = await findByType(type, page, pageSize);
      return c.json(data);
    }

    if (username) {
      const data = await findByUsername(username);
      return c.json(data);
    }

    if (algorithm) {
      const data = await findByAlgorithm(algorithm, page, pageSize);
      return c.json(data);
    }

    if (username && type) {
      const data = await findByUsernameAndType(username, type);
      return c.json(data);
    }

    if (!title && !type && !username && !algorithm) {
      const data = await getEntriesEasyPaged(page, pageSize);
      return c.json(data);
    }

  } catch (error) {
    return errorHandler(c, error);
  }
});

export default models;
