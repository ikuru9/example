import getQueryClient from '@/lib/utils/react-query/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { User } from './types'
import ListUsers from './users'

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = (await res.json()) as User[]
  return users
}

export default async function HydratedUsers() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['hydrate-users'],
    queryFn: getUsers,
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListUsers />
    </HydrationBoundary>
  )
}
