import React, { useEffect, useMemo, useState } from "react";

function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  return [state, setState];
}

export function TodoList() {
  const key = "todo_lite_v1";
  const [todos, setTodos] = useLocalStorageState(key, []);
  const [text, setText] = useState("");

  const doneCount = useMemo(
    () => todos.filter((t) => t.done).length,
    [todos]
  );
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(todos));
    } catch {
      // ignore
    }
  }, [key, todos]);
  // console.log(localStorage);

  function addTodo(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;

    setTodos((prev) => [
      { id: crypto.randomUUID(), title: value, done: false },
      ...prev,
    ]);
    setText("");
  }

  function toggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function remove(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  return (
    <div className="w-full max-w-md rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Todo Lite</h2>
          <p className="mt-1 text-sm text-gray-600">
            localStorage 持久化 + 增删改
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-700">
          Done: <span className="font-semibold">{doneCount}</span> /{" "}
          {todos.length}
        </div>
      </div>

      <form onSubmit={addTodo} className="mt-4 flex gap-2">
        <input
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="Add a todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
          Add
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {todos.length === 0 ? (
          <div className="rounded-xl border border-dashed p-4 text-sm text-gray-500">
            还没有 todo，先添加一个试试。
          </div>
        ) : (
          todos.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-3 rounded-xl border p-3"
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                  className="h-4 w-4"
                />
                <span className={t.done ? "text-gray-400 line-through" : ""}>
                  {t.title}
                </span>
                <span className={t.done ? "text-gray-400 line-through" : ""}>
                  {t.id}
                </span>
              </label>

              <button
                className="rounded-lg px-2 py-1 text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => remove(t.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 rounded-xl border px-4 py-2 hover:bg-gray-200"
          type="button"
          onClick={clearDone}
          disabled={doneCount === 0}
          title={doneCount === 0 ? "No done items" : "Remove done items"}
        >
          {doneCount === 0 ? "No done items" : "Remove done items"}
        </button>
        <button
          className="flex-1 rounded-xl border px-4 py-2 hover:bg-gray-200"
          type="button"
          onClick={() => setTodos([])}
          disabled={todos.length === 0}
          title={todos.length === 0 ? "Empty" : "Remove all"}
        >
          {todos.length === 0 ? "Clear" : "Remove all"}
        </button>
      </div>
    </div>
  );
}