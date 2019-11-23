/** @format */

export function findlnurl(bodyOfText: string): string | null {
  let res = /(lnurl{1}[a-z0-9]+)/.exec(bodyOfText.toLowerCase())
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
  return url
    .split('://')[1]
    .split('/')[0]
    .split('@')
    .slice(-1)[0]
    .split(':')[0]
}
