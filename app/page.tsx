'use client';

import dynamic from 'next/dynamic';

const TransitMap = dynamic(() => import('@/components/TransitMap'), { ssr: false });

export default function Home() {
  return <TransitMap />;
}
