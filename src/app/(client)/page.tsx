"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      router.push('/albums');
    }
  }, [router]);

  return (
    <div className="w-full bg-gray-200">
      
    </div>
  );
}
