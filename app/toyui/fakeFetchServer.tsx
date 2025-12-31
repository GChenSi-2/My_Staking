interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
export default async function FakeFetchServer() {
  const response: Response = await fetch('http://localhost:3000/api/toyui');
  const json: Todo = await response.json();
  return (
    <div className="space-y-4w-full max-w-sm rounded-2xl border bg-blue-200 p-5 mt-5 shadow-md">
      <h2 className="px-3 py-3 text-xl font-semibold bg-red-400 rounded-md">
        <strong>Todo Item</strong>
      </h2>
      <p className="font-sans text-blue-600">
        <strong>ID:</strong> {json?.id}
      </p>
      <p className="font-sans text-blue-600">
        <strong>Title:</strong> {json?.title}
      </p>
      <p className="font-sans text-blue-600">
        <strong>User ID:</strong> {json?.userId}
      </p>
      <p className="font-sans text-blue-600">
        <strong>Completed:</strong> {json?.completed ? 'Yes' : 'No'}
      </p>
    </div>
  );
}
