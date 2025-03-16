'use client'

import { usePhotos } from '@/hooks/samples/useMockPhotos.sample'
import Image from 'next/image'

export default function UsersContainer() {
  const { data } = usePhotos()

  return (
    <section style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      {
        <article
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 20,
          }}>
          {data?.map((photo) => (
            <div key={photo.id} style={{ border: '1px solid #ccc', textAlign: 'center' }}>
              <Image src={photo.thumbnailUrl} alt={photo.title} width={180} height={180} />
              <h3>{photo.title}</h3>
            </div>
          ))}
        </article>
      }
    </section>
  )
}
