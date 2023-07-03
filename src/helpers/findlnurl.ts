/** @format */

export function findlnurl(bodyOfText: string): string | null {
  let res = /,*?((lnurl)([0-9]{1,}[a-z0-9]+){1})/.exec(bodyOfText.toLowerCase())
  if (res) {
    return res[1]
  }
  return null
}
