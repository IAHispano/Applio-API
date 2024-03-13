import { supabaseClient, maxPerPage, minPage } from "../config";

export const getUsers = async (
  page: number = minPage,
  pageSize: number = maxPerPage,
) => {
  try {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .range(startIndex, endIndex - 1);

    if (error) {
      console.error("Error getting paged data", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error getting paged data", error);
    return [];
  }
};

export const getUsersByName = async (
  username: string,
  page: number = minPage,
  pageSize: number = maxPerPage,
) => {
  try {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .range(startIndex, endIndex - 1)
      .eq("full_name", username);

    if (error) {
      console.error("Error getting data by username", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error getting data by username", error);
    return [];
  }
};
