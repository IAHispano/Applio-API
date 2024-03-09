import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { getEntriesEasyPaged } from "../services/guidesService";
import { maxPageSizeHandler } from "../utils/error/maxPageSizeHandler";

const guides = new Hono();

guides.get("/", async (c) => {
  try {
    const page = Number(c.req.header("page")) || 1;
    let pageSize = Number(c.req.header("perPage")) || 20;

    maxPageSizeHandler(c, pageSize);

    const data = await getEntriesEasyPaged(page, pageSize);
    return c.json(data);
  } catch (error) {
    return errorHandler(c, error);
  }
});

export default guides;
