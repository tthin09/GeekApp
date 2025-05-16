import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`An error occurred. Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({
      "status": 200,
      "data": data,
    });
  } catch (error: any) {
    return NextResponse.json({
      "status": 500,
      "error": 'Server error: Failed to fetch data',
    });
  }
}
