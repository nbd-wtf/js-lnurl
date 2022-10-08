/** @format */

export interface LNURLResponse {
  status: string
  reason: string
  domain: string
  url: string
}

export interface LNURLChannelParams {
  tag: "channelRequest"
  callback: string
  domain: string
  k1: string
  uri: string
}

export interface LNURLWithdrawParams {
  tag: "withdrawRequest"
  k1: string
  callback: string
  domain: string
  minWithdrawable: number
  maxWithdrawable: number
  defaultDescription: string
  balanceCheck?: string
  payLink?: string
}

export interface LNURLAuthParams {
  tag: "login"
  k1: string
  callback: string
  domain: string
}

export interface LNURLPayParams {
  tag: "payRequest"
  callback: string
  domain: string
  minSendable: number
  maxSendable: number
  metadata: string
  decodedMetadata: string[][]
  commentAllowed: number
  payerData?: PayerDataSpec
}

export interface LNURLPayResult {
  pr: string
  successAction: LNURLPaySuccessAction | null
  disposable: boolean | null
  routes: []
}

export interface PayerDataSpec {
  name?: {mandatory: boolean}
  pubkey?: {mandatory: boolean}
  identifier?: {mandatory: boolean}
  email?: {mandatory: boolean}
  auth?: {
    mandatory: boolean
    k1: string
  }
}

export interface LNURLPaySuccessAction {
  tag: string
  description: string | null
  url: string | null
  message: string | null
  ciphertext: string | null
  iv: string | null
}
