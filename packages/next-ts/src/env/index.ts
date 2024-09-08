// https://env.t3.gg/docs/nextjs

import { VALIDATION_ERROR_MESSAGES } from '@/config/messages'
import { createEnv } from '@t3-oss/env-nextjs'
import { type ZodError, z } from 'zod'

export const env = createEnv({
  server: {
    APP_ENV: z.enum(['local', 'dev', 'text', 'prod']).default('prod'),
  },

  client: {
    NEXT_PUBLIC_BASE_URL: z.string({
      message: VALIDATION_ERROR_MESSAGES.required,
    }),
    NEXT_PUBLIC_API_MOCKING: z.enum(['enabled']).optional(),
  },

  runtimeEnv: {
    APP_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
  },

  onValidationError: (error: ZodError) => {
    console.error('❌ 유효하지 않은 환경변수들 입니다:', error.flatten().fieldErrors)
    throw new Error('환경변수가 유효하지 않습니다.')
  },
  // Called when server variables are accessed on the client.
  onInvalidAccess: (_variable: string) => {
    throw new Error('❌ 클라이언트에서 서버 사이드 환경 변수에 접근을 시도했습니다')
  },
})
