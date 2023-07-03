import { 
  getParams,
} from '../src/index'
import { expect } from '@jest/globals';

export async function testParams(
  lnurl: string,
  expectedValue: any
) {
  const response = await getParams(
    lnurl
  )

  if ("reason" in response) {
    expect(response.reason).toBe(expectedValue.reason)
    return response
  }

  requiredField(response.tag)

  expect(response.tag).toBe(expectedValue.tag)
  expect(response.domain).toBe(expectedValue.domain)

  switch(response.tag) {
    case "payRequest":
      // Required fields
      requiredField(response.callback)
      requiredField(response.minSendable)
      requiredField(response.maxSendable)
      // requiredField(response.metadata)

      // Required field values
      expect(response.callback).toBe(expectedValue.callback)
      expect(response.minSendable).toBe(expectedValue.minSendable)
      expect(response.maxSendable).toBe(expectedValue.maxSendable)
      expect(response.metadata).toBe(expectedValue.metadata)
      expect(response.decodedMetadata).toStrictEqual(expectedValue.decodedMetadata)

      // Expect Optional fields... for payRequest extensions...
      expect(response.commentAllowed).toBe(expectedValue.commentAllowed)
      expect(response.payerData).toBe(expectedValue.payerData)
      break;
    case "withdrawRequest":
      // Required fields
      requiredField(response.callback)
      requiredField(response.k1)
      requiredField(response.defaultDescription)
      requiredField(response.minWithdrawable)
      requiredField(response.maxWithdrawable)

      // Required field values
      expect(response.callback).toBe(expectedValue.callback)
      expect(response.k1).toBe(expectedValue.k1)
      expect(response.defaultDescription).toBe(expectedValue.defaultDescription)
      expect(response.minWithdrawable).toBe(expectedValue.minWithdrawable)
      expect(response.maxWithdrawable).toBe(expectedValue.maxWithdrawable)

      break;
    case "channelRequest":
      // Required fields
      requiredField(response.callback)
      requiredField(response.k1)
      requiredField(response.uri)

      // Required field values
      expect(response.callback).toBe(expectedValue.callback)
      expect(response.k1).toBe(expectedValue.k1)
      expect(response.uri).toBe(expectedValue.uri)
      break;
    case "login":
      requiredField(response.tag)
      requiredField(response.k1)

      // Optional fields
      expect(response.action).toBe(expectedValue.action)
      break;
  }

  return response
}

const requiredField = (field: any) => {
  expect(field).not.toBeNull()
  expect(field).not.toBeUndefined()
}
