import { Comment } from "../interfaces/interfaces";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchComments = async (
  page: number = 1,
  limit: number = 50,
): Promise<Comment[]> => {
  try {
    console.log("apiUrl", process.env.REACT_APP_API_URL);
    const response = await fetch(
      `${apiUrl}/comments?_page=${page}&_limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Comment[] = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
