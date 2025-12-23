'use client';
import { CounterCard } from "../toyui/counterCard";
import { MiniSearchList } from "../toyui/miniSearchList";

export default function Page() {
  return (
    <div>
      <h1> Hello Next.js! </h1>
      <CounterCard />
      <MiniSearchList />
    </div>
  );
}
