'use client';
import { CounterCard } from '../toyui/counterCard';
import { MiniSearchList } from '../toyui/miniSearchList';
import { TodoList } from '../toyui/todoList';
import FakeFetch from '../toyui/fakeFetch';

export default function Page() {
  return (
    <div>
      <h1> Hello Next.js! </h1>
      <CounterCard />
      <MiniSearchList />
      <TodoList />
      <FakeFetch />
    </div>
  );
}
