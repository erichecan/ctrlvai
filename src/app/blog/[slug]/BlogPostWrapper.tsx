'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Loading from '@/components/Loading';

export default function BlogPostWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary 
      fallback={
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-2xl font-bold text-red-600">Failed to load blog post</h1>
          <p className="mt-2 text-gray-600">Please try again later.</p>
        </div>
      }
    >
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}