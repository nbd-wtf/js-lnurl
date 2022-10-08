import { beforeAll, test } from '@jest/globals';
import nock from 'nock';
import { testParams } from './helpers'

beforeAll(async () => {
  const basePayRequestWithEmptyMetadata = nock('https://example.com')
    .get('/url/channel')
    .reply(200, {
      tag: "channelRequest",
      callback: "https://example.com/channel",
      k1: "non-random",
      uri: "node_key@ip_address:port_number"
    })
    .persist();

});

test('Base channel request', async () => {
  const expectedResults = {
    tag: "channelRequest",
    callback: "https://example.com/channel",
    k1: "non-random",
    uri: "node_key@ip_address:port_number",
    domain: 'example.com'
  }
  // Bech32 encoded
  testParams(`lnurl1dp68gurn8ghj7etcv9khqmr99e3k7mf0w4exctmrdpskumn9dsup0gp4`, expectedResults)

  // Protocol scheme 
  testParams(`lnurlc://example.com/url/channel`, expectedResults)
});