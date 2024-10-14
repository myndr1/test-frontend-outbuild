import { Comment } from '../interfaces/interfaces';

export const fetchComments = async (): Promise<Comment[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Comment[] = await response.json(); 
    return data;
};
