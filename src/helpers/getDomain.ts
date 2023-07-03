/** @format */

export function getDomain(url: string): string {
  return url
    .split('://')[1]
    .split('?')[0]
    .split('/')[0]
    .split('@')
    .slice(-1)[0]
    .split(':')[0]
}
