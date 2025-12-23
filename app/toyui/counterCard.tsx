import React, { useMemo, useState } from "react";
import { cn } from "../lib/cn";

export function CounterCard() {
  const [count, setCount] = useState(0);

  const level = useMemo(() => {
    if (count <= 0) return "low";
    if (count <= 5) return "medium";
    return "high";
  }, [count]);

  const badgeClass =
    level === "low"
      ? "bg-gray-300"
      : level === "medium"
        ? "bg-yellow-100"
        : "bg-green-100";
  return (
    <div className="flex w-full rounded-2xl border bg-red-300 shadow-sm p-5">
      <h2 className="text-2xl font-sans">Counter Cards</h2>
      <div
        className={cn(
          "flex rounded-full px-3 py-3 text-2xl text-blue-500 items-center justify-between",
          badgeClass,
        )}
      >
        {level}
      </div>
      <div className="mt-4 rounded-xl board bg-purple-300 p-5">
        <div className="text-xl text-blue-300"> Current count</div>

        {count < 0 ? (
          <p className="pt-2 text-xl font-sans text-red-600">Count is negative. Maybe hit reset?</p>
        ) : (
          <div className="mt-3 text-4xl font-bold tabular-nums">{count}</div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 rounded-xl bg-gray-600 px-4 py-2 text-white hover:bg-gray-800"
          onClick={() => setCount((c) => c + 1)}
        >
          plus1
        </button>
        <button
          className="flex-1 rounded-xl bg-gray-600 px-4 py-2 text-white hover:bg-gray-800"
          onClick={() => setCount((c) => c - 1)}
        >
          minus1
        </button>
        <button
          className="flex-1 rounded-xl border px-4 py-2 text-white hover:bg-gray-80"
          onClick={() => setCount(0)}
          disabled={count === 0}
          title={count === 0 ? "Alread 0" : "Reset to 0"}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
