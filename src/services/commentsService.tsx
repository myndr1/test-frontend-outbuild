import { Comment } from '../interfaces/interfaces';

export const fetchComments = async (page: number = 1, limit: number = 50): Promise<Comment[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: Comment[] = await response.json();
  return data;
};
