import { beforeAll, test } from '@jest/globals';
import nock from 'nock';
import { testParams } from './helpers'

beforeAll(async () => {
  const basePayRequestWithEmptyMetadata = nock('https://example.com')
    .get('/.well-know/lnurlp/base')
    .reply(200, {
      tag: "payRequest",
      callback: "https://example.com/callback",
      minSendable: 1000,
      maxSendable: 2000,
      metadata: ""
    })
    .persist();

  const basePayRequestWithUndefinedMetadata = nock('https://example.com')
    .get('/.well-know/lnurlp/base-with-undefined-metadata')
    .reply(200, {
      tag: "payRequest",
      callback: "https://example.com/callback",
      minSendable: 1000,
      maxSendable: 3000
    })
    .persist();

  const basePayRequestWithMetadata = nock('https://example.com')
    .get('/.well-know/lnurlp/base-with-metadata')
    .reply(200, {
      tag: "payRequest",
      callback: "https://example.com/callback",
      minSendable: 1000,
      maxSendable: 4000,
      metadata: "[[\"text/plain\", \"lorem ipsum blah blah\"]]"
    })
    .persist();

});

test('Base payRequest with undefined/null metadata', async () => {
  const expectedResults = {
    tag: 'payRequest',
    callback: 'https://example.com/callback',
    minSendable: 1000,
    maxSendable: 3000,
    domain: 'example.com',
    decodedMetadata: [],
    commentAllowed: 0
  }
  // bech32 encoded
  testParams(`lnurl1dp68gurn8ghj7etcv9khqmr99e3k7mf09emk2mrv944kummh9akxuatjd3cz7cnpwdjj6amfw35z6atwv3jkv6twv4jz6mt9w3skgct5vyzwn852`, expectedResults)

  // Protocol scheme
  testParams(`https://example.com/.well-know/lnurlp/base-with-undefined-metadata`, expectedResults)
});

test('Base payRequest with empty metadata', async () => {
  const expectedResults = {
    tag: 'payRequest',
    callback: 'https://example.com/callback',
    minSendable: 1000,
    maxSendable: 2000,
    metadata: '',
    domain: 'example.com',
    decodedMetadata: [],
    commentAllowed: 0
  }
  testParams(`lnurl1dp68gurn8ghj7etcv9khqmr99e3k7mf09emk2mrv944kummh9akxuatjd3cz7cnpwdjsu6lyyr`, expectedResults)
  testParams(`https://example.com/.well-know/lnurlp/base`, expectedResults)
});

test('Base payRequest with metadata', async () => {
  const expectedResults = {
    tag: 'payRequest',
    callback: 'https://example.com/callback',
    minSendable: 1000,
    maxSendable: 4000,
    metadata: "[[\"text/plain\", \"lorem ipsum blah blah\"]]",
    domain: 'example.com',
    decodedMetadata: [
      ["text/plain", "lorem ipsum blah blah"]
    ],
    commentAllowed: 0
  }
  testParams(
    `lnurl1dp68gurn8ghj7etcv9khqmr99e3k7mf09emk2mrv944kummh9akxuatjd3cz7cnpwdjj6amfw35z6mt9w3skgct5vy0njz4u`, 
    expectedResults
  )
  testParams(`https://example.com/.well-know/lnurlp/base-with-metadata`, expectedResults)
});