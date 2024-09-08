'use server'

import { queryOption } from '@/hooks/samples/useMockPhotos.sample'
import { getDehydratedQuery } from '@/lib/utils/react-query/dehydrate'
import { HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import Comments from './Comments.sample'
import Photos from './Photos.sample'

export default async function HydratedUsers() {
  const query = await getDehydratedQuery(queryOption.photos())

  return (
    <>
      {/* 서버 사이드 렌더링 & 서버 컴포넌트 */}
      <HydrationBoundary state={query}>
        {/* Client Component */}
        <Photos />

        {/* Server Component */}
        <ErrorBoundary fallback={<div>에러가 발생했어요...</div>}>
          <Comments id={1} />
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  )
}
