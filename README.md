js-lnurl
========

Tools for adding [lnurl](https://github.com/fiatjaf/awesome-lnurl) support in JavaScript wallet interfaces.

### Example

```js
import { getParams } from 'js-lnurl'

getParams("LNURL1...")
  .then(params => {
    switch (params.tag) {
      case 'withdrawRequest':
        // tag: string
        // k1: string
        // callback: string
        // domain: string
        // minWithdrawable: number
        // maxWithdrawable: number
        // defaultDescription: string
        break
      case 'payRequest':
        // tag: string
        // callback: string
        // domain: string
        // minSendable: number
        // maxSendable: number
        // metadata: string
        // decodedMetadata: string[][]
        // commentAllowed?: number
        break
      case 'login':
        // tag: string
        // k1: string
        // callback: string
        // domain: string
        break
      case 'channelRequest':
        // params.tag: string
        // params.callback: string
        // params.domain: string
        // params.k1: string
        // params.uri: string
        break
    }
  })
```

### Other included helpers

```js
import { findlnurl, decipherAES, getDomain }

// see ./helpers.js
```
