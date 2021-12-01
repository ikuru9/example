import { setupWorker } from 'msw'
import Handlers from './handlers'

export const worker = setupWorker(...Handlers)
