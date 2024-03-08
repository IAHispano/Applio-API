import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { findByName } from "../services/modelsService";

const max_page_size = 20;

const models = new Hono();

models.get("/", async (c) => {
  try {
    const title = c.req.header("title");
    const page = Number(c.req.header("page"));
    let pageSize = Number(c.req.header("perPage"));

    if (pageSize > max_page_size) {
      return c.text(
        `Page size cannot exceed, the max page size is ${max_page_size}.`,
        400
      );
    }

    if (title) {
      const data = await findByName(title);
      return c.json(data);
    } else {
      return c.text(
        "You need to add the header perPage and page to get the data. More information at https://applio.org/api/docs",
        400
      );
    }
  } catch (error) {
    models.onError(errorHandler);
  }
});

export default models;
