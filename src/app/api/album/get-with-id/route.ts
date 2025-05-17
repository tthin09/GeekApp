import { NextResponse } from 'next/server';
import { Album, User } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const albumResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!albumResponse.ok) {
      throw new Error(`An error occurred while fetching Album data. Status: ${albumResponse.status}`);
    }

    const albumData: Album[] = await albumResponse.json();

    return NextResponse.json({
      "status": 200,
      "data": albumData[0],
    });
  } catch (error: any) {
    return NextResponse.json({
      "status": 500,
      "error": 'Server error: Failed to fetch data',
    });
  }
}