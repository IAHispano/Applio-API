import { supabaseClient, maxPageSize } from "../config";

export const getEntriesEasyPaged = async (
  page: number = 1,
  pageSize: number = maxPageSize,
) => {
  try {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const { data, error } = await supabaseClient
      .from("guides")
      .select("*")
      .range(startIndex, endIndex - 1);

    if (error) {
      console.error("Error getting paged data", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error getting paged data", error);
    return [];
  }
};

export const findByName = async (searchTerm: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("guides")
      .select("*")
      .filter("title", "ilike", `${searchTerm}%`);

    if (error) {
      console.error("Error when searching by name", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error when searching by name", error);
    return [];
  }
};
