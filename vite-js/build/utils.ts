import { config, DotenvParseOutput } from 'dotenv'

export function loadEnv(): DotenvParseOutput {
  const nodeEnv = process.env.NODE_ENV
  const env: DotenvParseOutput = {}
  const envList = [
    `.env.${nodeEnv}.local`,
    `.env.${nodeEnv}`,
    '.env.local',
    '.env',
  ]

  envList.forEach((e) => {
    config({
      path: e,
    })
  })

  for (const envName of Object.keys(process.env)) {
    const realName = (process.env as unknown)[envName].replace(/\\n/g, '\n')
    env[envName] = realName
    process.env[envName] = realName
  }

  return env
}
