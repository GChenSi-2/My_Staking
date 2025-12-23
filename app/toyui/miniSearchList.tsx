import React, { useMemo, useState } from "react";

type itemsList = { id: number; name: string }[];
const DEFAUlT_ITEMS: itemsList = [
  { id: 1, name: "React" },
  { id: 2, name: "Javascript" },
  { id: 3, name: "CSS" },
  { id: 4, name: "NodeJS" },
  { id: 5, name: "NodeTypeScript" },
  { id: 6, name: "TypeScript" },
  { id: 7, name: "Vite" },
  { id: 8, name: "Viem" },
];

export function MiniSearchList(): Element {
  const [q, setQ] = useState<string>("");
  const [items] = useState<itemsList>(DEFAUlT_ITEMS);

  //   const filtered = useMemo(() =>{
  //     const keyword = q.trim.
  //
  //   }, [q, items]);
  // }

  return (
    <div className="w-full max-w-md rounded-2xl border bg-blue-200 p-5 mt-5 shadow-md">
      <h2 className="text-xl fond-semibold">Mini Search List</h2>
      <div className="flex mt-5 items-center gap-2">
        <input
          className="w-full rounded-xl border px-3 py-2 outline-none focus: ring-2"
          placeholder="Search...e.g. react"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          className="rounded-xl border px-3 py-2 hover:bg-gray 50"
          onClick={() => setQ("")}
        >
          Clear
        </button>
      </div>
      <div className="flex mt-5 items-center gap-2">
        {DEFAUlT_ITEMS.map((item: any) => (
          <span className="font-medium">{item.name}</span>
        ))}
      </div>
    </div>
  );
}
