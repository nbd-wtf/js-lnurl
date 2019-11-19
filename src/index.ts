/** @format */

import bech32 from 'bech32'
import axios from 'axios'
import qs from 'query-string'
import {Buffer} from 'safe-buffer'

import {
  LNURLResponse,
  LNURLChannelParams,
  LNURLWithdrawParams,
  LNURLAuthParams,
  LNURLPayParams
} from './types'

export {findlnurl, randomHex} from './helpers'

export async function getParams(
  lnurl: string
): Promise<
  | LNURLResponse
  | LNURLChannelParams
  | LNURLWithdrawParams
  | LNURLAuthParams
  | LNURLPayParams
> {
  let url = Buffer.from(
    bech32.fromWords(bech32.decode(lnurl, 1500).words)
  ).toString()

  let spl = url.split('?')
  if (spl.length > 1 && qs.parse(spl[1]).tag === 'login') {
    return {
      tag: 'login',
      k1: qs.parse(spl[1]).k1 as string,
      callback: url
    }
  }

  try {
    let r = await axios.get(url)
    let res = r.data

    if (r.status >= 300) {
      throw res
    }

    switch (res.tag) {
      case 'withdrawRequest':
        return res as LNURLWithdrawParams
        break
      case 'payRequest':
        res.decodedMetadata = JSON.parse(res.metadata)
        return res as LNURLPayParams
      case 'channelRequest':
        return res as LNURLChannelParams
      default:
        if (res.status === 'ERROR') {
          return res as LNURLResponse
        }

        throw new Error('unknown tag: ' + res.tag)
    }
  } catch (err) {
    return {
      status: 'ERROR',
      reason: `${url} returned error: ${err.message}`
    } as LNURLResponse
  }
}
