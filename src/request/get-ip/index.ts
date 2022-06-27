import { getIP } from '../request'
import type { GetIPRes } from './types/index'

export async function getRealIP() {
  return getIP.get<GetIPRes>('')
}
