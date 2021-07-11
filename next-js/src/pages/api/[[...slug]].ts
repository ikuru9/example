import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> {
  return httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: process.env.API_BASE_URL,
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
    pathRewrite: {
      '^/api/new': '/v2',
      '^/api': '',
    },
  })
}
