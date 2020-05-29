/** @format */

export interface LNURLResponse {
  status: string
  reason: string
  domain: string
  url: string
}

export interface LNURLChannelParams {
  tag: string
  callback: string
  domain: string
  k1: string
  uri: string
}

export interface LNURLWithdrawParams {
  tag: string
  k1: string
  callback: string
  domain: string
  minWithdrawable: number
  maxWithdrawable: number
  defaultDescription: string
}

export interface LNURLAuthParams {
  tag: string
  k1: string
  callback: string
  domain: string
}

export interface LNURLPayParams {
  tag: string
  callback: string
  domain: string
  minSendable: number
  maxSendable: number
  metadata: string
  decodedMetadata: string[][]
}

export interface LNURLPayResult {
  pr: string
  successAction: LNURLPaySuccessAction | null
  disposable: boolean | null
  routes: object[][]
}

export interface LNURLPaySuccessAction {
  tag: string
  description: string | null
  url: string | null
  message: string | null
  ciphertext: string | null
  iv: string | null
}
