import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { getBlogs } from "../services/blogsService";

const max_page_size = 20;
const blogs = new Hono();

blogs.get("/", async (c) => {
  try {
    const page = Number(c.req.header("page")) || 1;
    let pageSize = Number(c.req.header("perPage")) || 20;

    if (pageSize > max_page_size) {
      return c.text(
        `Page size cannot exceed, the max page size is ${max_page_size}.`,
        400
      );
    }

    const data = await getBlogs(page, pageSize);
    return c.json(data);
  } catch (error) {
    return errorHandler(c, error);
  }
});

export default blogs;
