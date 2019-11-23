/** @format */

export interface LNURLResponse {
  status: string
  reason: string
}

export interface LNURLChannelParams {
  tag: string
  callback: string
  k1: string
  uri: string
}

export interface LNURLWithdrawParams {
  tag: string
  k1: string
  callback: string
  minWithdrawable: number
  maxWithdrawable: number
  defaultDescription: string
}

export interface LNURLAuthParams {
  tag: string
  k1: string
  callback: string
}

export interface LNURLPayParams {
  tag: string
  callback: string
  minSendable: number
  maxSendable: number
  metadata: string
  decodedMetadata: string[][]
}

export interface LNURLPayResult {
  pr: string
  successAction: SuccessAction
  routes: object[][]
}

interface SuccessAction {
  tag: string
  description: string
  data: string
}
