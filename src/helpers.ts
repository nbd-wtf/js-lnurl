/** @format */

import aesjs from 'aes-js'
import Base64 from 'base64-js'
import {LNURLPaySuccessAction} from './types'

export function decodelnurl(lnurl: string): string {
  lnurl = lnurl.trim()

  if (lnurl.toLowercase().slice(0, 6) === 'lnurl1') {
    return Buffer.from(
      bech32.fromWords(bech32.decode(lnurl, 20000).words)
    ).toString()
  } else if (
    url.slice(0, 9) === 'lnurlc://' ||
    url.slice(0, 9) === 'lnurlw://' ||
    url.slice(0, 9) === 'lnurlp://' ||
    url.slice(0, 10) === 'keyauth://'
  ) {
    let [_, post] = url.split('://')
    let pre = post.match(/\.onion($|\W)/) ? 'http' : 'https'
    return pre + '://' + post
  } else if (url.slice(0, 8) === 'https://') {
    let bech32lnurl = findlnurl(lnurl)
    if (bech32lnurl) {
      return Buffer.from(
        bech32.fromWords(bech32.decode(bech32lnurl, 20000).words)
      ).toString()
    }

    return url
  }

  throw new Error(`invalid url ${lnurl}`)
}

export function findlnurl(bodyOfText: string): string | null {
  let res = /,*?((lnurl)([0-9]{1,}[a-z0-9]+){1})/.exec(bodyOfText.toLowerCase())
  if (res) {
    return res[1]
  }
  return null
}

export function randomHex(nbytes: number): string {
  let len = nbytes * 2
  const hex = '0123456789abcdef'
  var output = ''
  for (let i = 0; i < len; ++i) {
    output += hex.charAt(Math.floor(Math.random() * hex.length))
  }
  return output
}

export function getDomain(url: string): string {
  return url.split('://')[1].split('/')[0].split('@').slice(-1)[0].split(':')[0]
}

export function decipherAES(
  sa: LNURLPaySuccessAction,
  preimage: string
): string {
  if (sa.tag !== 'aes') {
    return ''
  }

  let key = aesjs.utils.hex.toBytes(preimage)
  let iv = Base64.toByteArray(sa.iv as string)
  let ciphertext = Base64.toByteArray(sa.ciphertext as string)

  let CBC = new aesjs.ModeOfOperation.cbc(key, iv)
  var plaintext = CBC.decrypt(ciphertext)

  // remove padding
  let size = plaintext.length
  let pad = plaintext[size - 1]
  plaintext = plaintext.slice(0, size - pad)

  return aesjs.utils.utf8.fromBytes(plaintext)
}
