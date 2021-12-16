import fetch from 'cross-fetch'
import qs from 'query-string'

import {
  LNURLResponse,
  LNURLChannelParams,
  LNURLWithdrawParams,
  LNURLAuthParams,
  LNURLPayParams
} from './types'
import {decodelnurl, getDomain} from './helpers'

export {
  LNURLResponse,
  LNURLChannelParams,
  LNURLWithdrawParams,
  LNURLAuthParams,
  LNURLPayParams,
  LNURLPayResult,
  LNURLPaySuccessAction
} from './types'
export * from './helpers'

export async function getParams(
  lnurl: string
): Promise<
  | LNURLResponse
  | LNURLChannelParams
  | LNURLWithdrawParams
  | LNURLAuthParams
  | LNURLPayParams
> {
  let url
  try {
    url = decodelnurl(lnurl)
  } catch (err) {
    return {
      status: 'ERROR',
      reason: `invalid lnurl '${lnurl}'`
    } as LNURLResponse
  }

  let spl = url.split('?')
  if (spl.length > 1 && qs.parse(spl[1]).tag === 'login') {
    return {
      tag: 'login',
      k1: qs.parse(spl[1]).k1 as string,
      callback: url,
      domain: getDomain(url)
    }
  }

  try {
    let r = await fetch(url)

    if (r.status >= 300) {
      throw new Error(await r.text())
    }

    let res
    try {
      res = await r.json()
    } catch (err) {
      throw new Error('(invalid JSON)')
    }

    if (res.callback) {
      res.domain = getDomain(res.callback)
    }

    switch (res.tag) {
      case 'withdrawRequest':
        return res as LNURLWithdrawParams
        break
      case 'payRequest':
        try {
          res.decodedMetadata = JSON.parse(res.metadata)
        } catch (err) {
          res.decodedMetadata = []
        }

        res.commentAllowed =
          typeof res.commentAllowed === 'number' ? res.commentAllowed : 0

        return res as LNURLPayParams
      case 'channelRequest':
        return res as LNURLChannelParams
      default:
        if (res.status === 'ERROR') {
          return {...res, domain: getDomain(url), url} as LNURLResponse
        }

        throw new Error('unknown tag: ' + res.tag)
    }
  } catch (err) {
    return {
      status: 'ERROR',
      reason: `${url} returned error: ${err.message}`,
      url,
      domain: getDomain(url)
    } as LNURLResponse
  }
}
