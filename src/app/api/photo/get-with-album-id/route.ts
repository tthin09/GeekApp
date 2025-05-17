import { NextResponse } from 'next/server';
import { Photo } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get('albumId');

    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`An error occurred while fetching Album data. Status: ${response.status}`);
    }

    const data: Photo[] = await response.json();

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
