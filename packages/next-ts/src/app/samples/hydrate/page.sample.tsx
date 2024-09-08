'use server'

import { queryOption } from '@/hooks/samples/usePhotos.sample'
import { getDehydratedQuery } from '@/lib/utils/react-query/dehydrate'
import { HydrationBoundary } from '@tanstack/react-query'
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
        <Comments id={1} />
      </HydrationBoundary>
    </>
  )
}
