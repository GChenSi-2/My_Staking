'use client';
import { Suspense } from 'react';
import { CounterCard } from '../toyui/counterCard';
import { MiniSearchList } from '../toyui/miniSearchList';
import { TodoList } from '../toyui/todoList';
import FakeFetch from '../toyui/fakeFetch';
import FakeFetchServer from '../toyui/fakeFetchServer';
import { MySwitch } from '../toyui/mySwitch';

export default function Page() {
  return (
    <div>
      <h1> Hello Next.js! </h1>
      <CounterCard />
      <MiniSearchList />
      <TodoList />
      <Suspense
        fallback={
          <div className="w-full max-w-sm rounded-2xl border bg-gray-100 p-5 mt-5 shadow-md animate-pulse">
            <div className="h-8 bg-gray-300 rounded-md mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        }
      >
        <FakeFetch />
      </Suspense>
      <Suspense
        fallback={
          <div className="w-full max-w-sm rounded-2xl border bg-gray-100 p-5 mt-5 shadow-md animate-pulse">
            <div className="h-8 bg-gray-300 rounded-md mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        }
      >
        <FakeFetchServer />
      </Suspense>
      <MySwitch />
    </div>
  );
}
