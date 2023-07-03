import { beforeAll, test } from '@jest/globals';
import nock from 'nock';
import { testParams } from './helpers'

beforeAll(async () => {
  const baseAuthRequestWithAction = nock('https://example.com')
    .get('/?tag=login&k1=hex_coin&action=login')
    .reply(200, {
      tag: "login",
      k1: "hex_coin",
      action: "login"
    })
    .persist();

});

test('Base auth request', async () => {
  const expectedResults = {
    tag: "login",
    k1: "hex_coin",
    action: "login",
    domain: "example.com"
  }
  // Bech32 encoded
  testParams(`lnurl1dp68gurn8ghj7etcv9khqmr99e3k7mflw3skw0tvdankjm3xdvcn66r90p0kxmmfdcnxzcm5d9hku0tvdankjmsud632t`, expectedResults)

  // Protocol Scheme URL
  testParams(`https://example.com?tag=login&k1=hex_coin&action=login`, expectedResults)
});

test('Auth request with action', async () => {
  const expectedResults = {
    tag: "login",
    k1: "hex_coin",
    domain: "example.com"
  }

  for (const action of ['register', 'login', 'link', 'auth']) {
    testParams(`https://example.com?tag=login&k1=hex_coin&action=${action}`, { ...expectedResults, action })
  }
})
