'use server'

import { queryOption } from '@/hooks/samples/useMockPhotos.sample'
import { getDehydratedQueries } from '@/lib/utils/react-query/dehydrate'
import type { Photo } from '@/models/samples/photo.sample'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function Comments({ id }: Pick<Photo, 'id'>) {
  // const { showBoundary, resetBoundary } = useErrorBoundary()
  const queries = await getDehydratedQueries([queryOption.photoComments({ photoId: id })])

  // showBoundary('error')
  return (
    <HydrationBoundary state={{ queries }}>
      <h2>Comments</h2>
      <article
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 20,
        }}
      >
        {queries[1].state.data?.map((comment) => (
          <div key={comment.id}>{comment.body}</div>
        ))}
      </article>
    </HydrationBoundary>
  )
}
