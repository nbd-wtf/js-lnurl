/** @format */

import bech32 from 'bech32'
import {Buffer} from 'safe-buffer'
import {findlnurl} from './findlnurl'

export function decodelnurl(lnurl: string): string {
  lnurl = lnurl.trim()

  if (lnurl.toLowerCase().slice(0, 6) === 'lnurl1') {
    return Buffer.from(
      bech32.fromWords(bech32.decode(lnurl, 20000).words)
    ).toString()
  } else if (
    lnurl.slice(0, 9) === 'lnurlc://' ||
    lnurl.slice(0, 9) === 'lnurlw://' ||
    lnurl.slice(0, 9) === 'lnurlp://' ||
    lnurl.slice(0, 10) === 'keyauth://'
  ) {
    let [_, post] = lnurl.split('://')
    let pre = post.match(/\.onion($|\W)/) ? 'http' : 'https'
    return pre + '://' + post
  } else if (lnurl.slice(0, 8) === 'https://') {
    let bech32lnurl = findlnurl(lnurl)
    if (bech32lnurl) {
      return Buffer.from(
        bech32.fromWords(bech32.decode(bech32lnurl, 20000).words)
      ).toString()
    }

    return lnurl
  }

  throw new Error(`invalid url ${lnurl}`)
}
