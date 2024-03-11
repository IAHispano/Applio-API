import { maxPageSize } from "../../config";

export const maxPageSizeHandler = (context: any, pageSize: number) => {
  if (pageSize > maxPageSize) {
    return context.json(
      `Page size cannot exceed, the max page size is ${maxPageSize}.`,
      400
    );
  }
};
