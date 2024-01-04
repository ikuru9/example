import NextAuth from 'next-auth/next'

import { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  debug: process.env.APP_ENV === 'local',
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@gmail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        // TODO: auth api
        const user = { id: '1', name: 'John', email: credentials?.email }
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        }

        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter

        return null
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    signOut: '/',
    newUser: '/sign-up',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
