import { AxiosError, AxiosInstance } from 'axios'

export class AxiosRetry {
  retry(axiosInstance: AxiosInstance, error: AxiosError) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const config = error.response!.config!
    const { waitTime, count } = config.requestOptions?.retryRequest || {}
    config.__retryCount__ = config.__retryCount__ || 0
    if (config.__retryCount__ >= (count ?? 0)) {
      return Promise.reject(error)
    }
    config.__retryCount__ += 1
    if (waitTime) {
      return this.delay(waitTime).then(() => axiosInstance(config))
    }
    return axiosInstance(config)
  }

  private delay(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime))
  }
}
