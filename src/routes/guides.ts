import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { getEntriesEasyPaged } from "../services/guidesService";

const max_page_size = 20;
const guides = new Hono();

guides.get("/", async (c) => {
  try {
    const page = Number(c.req.header("page")) || 1;
    let pageSize = Number(c.req.header("perPage")) || 20;

    if (pageSize > max_page_size) {
      return c.text(
        `Page size cannot exceed, the max page size is ${max_page_size}.`,
        400
      );
    }

    const data = await getEntriesEasyPaged(page, pageSize);
    return c.json(data);
  } catch (error) {
    return errorHandler(c, error);
  }
});

export default guides;
