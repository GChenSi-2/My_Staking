import { NextResponse } from 'next/server';

export async function GET() {
  return fetch('https://jsonplaceholder.typicode.com/todos/8')
    .then(response =>
      response.ok
        ? response.json()
        : Promise.reject(new Error(`HTTP error! status: ${response.status}`))
    )
    .then(data => NextResponse.json(data))
    .catch(error => {
      console.error('API Error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: 500 }
      );
    });
}

//localhost:3000/api/toyui
