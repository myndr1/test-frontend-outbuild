import { fetchComments } from './commentsService';
import { Comment } from '../interfaces/interfaces';

describe('fetchComments', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch comments successfully', async () => {
    const mockComments: Comment[] = [
      {
        postId: 1,
        id: 1,
        name: 'Test Comment 1',
        email: 'test1@example.com',
        body: 'This is a test comment',
      },
      {
        postId: 1,
        id: 2,
        name: 'Test Comment 2',
        email: 'test2@example.com',
        body: 'This is another test comment',
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockComments),
      } as Response),
    );

    const comments = await fetchComments(1, 2);
    expect(comments).toEqual(mockComments);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/comments?_page=1&_limit=2',
    );
  });

  it('should throw an error if the network response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response),
    );

    await expect(fetchComments(1, 2)).rejects.toThrow('Network response was not ok');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/comments?_page=1&_limit=2',
    );
  });

  it('should throw an error if fetch fails', async () => {
    const mockError = new Error('Fetch failed');
    global.fetch = jest.fn(() => Promise.reject(mockError));

    await expect(fetchComments(1, 2)).rejects.toThrow('Fetch failed');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/comments?_page=1&_limit=2',
    );
  });
});
