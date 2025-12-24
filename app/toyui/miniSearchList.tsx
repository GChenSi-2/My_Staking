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

export function MiniSearchList(): React.JSX.Element {
  const [q, setQ] = useState<string>("");
  const [items] = useState<itemsList>(DEFAUlT_ITEMS);

  // const filtered = useMemo(() => {
  //   const keyword = q.trim().toLowerCase();
  //   console.log(keyword);
  //   if (!keyword) return items;
  //   const filteredList = items.filter((item) => item.name.includes(keyword));
  //   console.log(filteredList);
  //   return filteredList
  // }, [q, items]);


  const keyword = (q ?? "").trim().toLowerCase();

  const filtered = !keyword
    ? items
    : items.filter(item =>
      item.name.toLowerCase().includes(keyword)
    );

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
      <div className="mt-4 rounded-xl bg-blue-300">
        {filtered.length > 0 && (
          <ul className="flex-col">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-2xl border mt-2 pt-1 px-4"
              >
                <span>{item.id}</span>
                <span>{item.name}</span>

              </li>
            ))}
          </ul>
        )}
        <div className="flex mt-5 items-center gap-2">
          {DEFAUlT_ITEMS.map((item: any) => (
            <span className="font-medium px-3">{item.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
