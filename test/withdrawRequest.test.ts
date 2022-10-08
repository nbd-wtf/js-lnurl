import { beforeAll, test } from '@jest/globals';
import nock from 'nock';
import { testParams } from './helpers'

beforeAll(async () => {
  const basePayRequestWithEmptyMetadata = nock('https://example.com')
    .get('/url/withdraw')
    .reply(200, {
      tag: "withdrawRequest",
      callback: "https://example.com/withdraw",
      k1: "non-random",
      minWithdrawable: 1000,
      maxWithdrawable: 1000,
      defaultDescription: "Withdrawable Request"
    })
    .persist();

});

test('Base withdraw request', async () => {
  const expectedResults = {
    tag: 'withdrawRequest',
    callback: 'https://example.com/withdraw',
    minWithdrawable: 1000,
    maxWithdrawable: 1000,
    k1: "non-random",
    defaultDescription: 'Withdrawable Request',
    domain: 'example.com'
  }
  // Bech32 encoded
  testParams(`lnurl1dp68gurn8ghj7etcv9khqmr99e3k7mf0w4exctmhd96xserjv9msqfp02n`, expectedResults)

  // Protocol Scheme
  testParams(`https://example.com/url/withdraw`, expectedResults)
});