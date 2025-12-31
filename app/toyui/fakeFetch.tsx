import { useEffect, useState } from 'react';

// Define the Todo interface for the API response
interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export default function FakeFetch(): React.ReactElement {
  const [post, setPost] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // 添加3秒延迟来测试Suspense fallback效果
      await delay(3000);

      const response: Response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: Todo = await response.json();
      setPost(json);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No data</div>;

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-blue-200 p-5 mt-5 shadow-md">
      <h2 className="px-3 py-3 text-xl font-semibold bg-red-400 rounded-md">
        <strong>Todo Item</strong>
      </h2>
      <p className="mt-2">
        <strong>ID:</strong> {post?.id}
      </p>
      <p className="mt-2">
        <strong>Title:</strong> {post?.title}
      </p>
      <p className="mt-2">
        <strong>User ID:</strong> {post?.userId}
      </p>
      <p className="mt-2">
        <strong>Completed:</strong> {post?.completed ? 'Yes' : 'No'}
      </p>
    </div>
  );
}
