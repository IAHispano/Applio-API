import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { headerHandler } from "../utils/error/headerHandler";
import { getEntriesEasyPaged } from "../services/guidesService";

const max_page_size = 20;

const guides = new Hono();

guides.get("/", async (c) => {
  try {
    const page = Number(c.req.header("page"));
    let pageSize = Number(c.req.header("perPage"));

    if (pageSize > max_page_size) {
      return c.text(
        `Page size cannot exceed, the max page size is ${max_page_size}.`,
        400
      );
    }

    if (!page || !pageSize) {
      return headerHandler(c);
    }

    const data = await getEntriesEasyPaged(page, pageSize);
    return c.json(data);
  } catch (error) {
    return errorHandler(c, error);
  }
});

export default guides;
