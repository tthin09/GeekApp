import { NextResponse } from 'next/server';
import { Album, User } from '@/lib/types';

export async function GET() {
  try {
    const albumResponse = await fetch('https://jsonplaceholder.typicode.com/albums', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!albumResponse.ok) {
      throw new Error(`An error occurred while fetching Album data. Status: ${albumResponse.status}`);
    }

    const albumData: Album[] = await albumResponse.json();

    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!userResponse.ok) {
      throw new Error(`An error occurred while fetching User data. Status: ${userResponse.status}`);
    }

    const userData: User[] = await userResponse.json();


    const data = albumData.map((album, index) => {
      const user = userData.find(user => user.id === album.userId);
      return {
        id: album.id,
        title: album.title,
        userId: album.userId,
        username: user ? user.name : "unknown",
      }
    });

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
