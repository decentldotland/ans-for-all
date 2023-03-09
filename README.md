<p align="center">
  <h2>
    ANS-for-all has been deprecated in favor of react-arconnect! Check it out <a href="https://github.com/decentldotland/react-arconnect">here</a>.
  </h2>
</p>

<p align="center">
  <a href="https://decent.land">
    <img src="./img/logo25.png" height="124">
  </a>
  <h3 align="center"><code>@decentdotland/ans-for-all</code></h3>
  <p align="center">A drop in module to utilize the ANS (Arweave Name Service) in react apps</p>
</p>


## Usage: 
Add it to your project:

```console
yarn add decentldotland/ans-for-all
```

### How to use ans-for-all in your React app:

```jsx 
//App.js | index.js

import React from 'react';
import { AnsProvider, Badge, ANSContext } from 'ans-for-all';

//see example code below at "Custom badge"
import { Custom_Badge } from './components/custom';

//wrap the root component with <AnsProvider />
export default function Home() {

  return (
    <AnsProvider>
      <div className="mb-2">
        <Name />
      </div>

      <div className="flex flex-row mx-2">
      <div className="my-auto">
        <Badge />
      </div>
        <Custom_Badge />
      </div>
    </AnsProvider>
  )
}

export function Name() {

  /* 
  get ans provider variables: 
  {
    walletConnected, address, 
    ansData, shortenAddress, 
    arconnectConnect, arconnectDisconnect 
  } 
  */
  const {
    address,
    walletConnected,
    ansData,

  } = useAns();

  return (
    walletConnected ?
      <>
        <h1 className="text-3xl font-bold underline" style={{ color: ansData?.address_color }}>
          Welcome {ansData?.currentLabel}
        </h1>
        <br />
        <h1 className="text-xl font-bold" style={{ color: ansData?.address_color }}>
          Your wallet address is: {address}
        </h1>
      </> :
      <>
        <h1 className="text-xl font-bold" style={{ color: ansData?.address_color }}>
          Please Login using an Arweave Wallet
        </h1>
      </>
  )
}
```

## API

### &lt;AnsProvider />

This is the provider component. It should be placed above all components using `useAns()`.

### useAns

This is the hook to be used throughout the app. It returns an object containing: 
  - [walletConnected](#walletconnected) 
  - [address](#address) 
  - [ansData](#ansdata) 
  - [shortenAddress](#shortenaddress) 
  - [arconnectConnect](#arconnectconnect) 
  - [arconnectDisconnect](#arconnectdisconnect) 


## walletConnected 
- State of the Arconnect/Finnie wallet.
- 
## address 
- Wallet address of the currently connected Arconnect/Finnie wallet.

## ansData 

 Returns:
  - address_color: The ANS profile color.
  - currentLabel:  The current ANS label in use.
  - avatar: The TXID for the ANS Avatar Image.

## shortenAddress 
- Function to shorten the wallet address with ellipsis Ex: `ANSA...ANSA`

## arconnectConnect 
- Function used to request connecting site to ArConnect.

## arconnectDisconnect 
- Function used to request disconnecting site from ArConnect.

# Custom Badge Example:

```jsx
// components/custom.jsx

import * as React from 'react';


import { useAns } from 'ans-for-all';

export const Default_Badge = () => {

    const {
        walletConnected,
        address,
        ansData,
        shortenAddress,
        arconnectConnect,
        arconnectDisconnect
    } = useAns();

    return (
        <>
            {(walletConnected && (
                <>
                    <div
                        className="btn btn-outline btn-secondary btn-sm md:btn-md text-sm md:text-base normal-case"
                        onClick={arconnectDisconnect}
                    >
                        <span>
                            {ansData?.currentLabel ? `${ansData?.currentLabel}.ar` : shortenAddress(address)}
                        </span>
                        {(ansData?.avatar === "") ?
                            <div className="mx-auto rounded-full h-6 w-6 ml-2 btn-secondary border-[1px]" style={{ backgroundColor: ansData?.address_color }}></div> :
                            <div className="mx-auto rounded-full h-6 w-6 overflow-hidden ml-2 btn-secondary border-[1px]">
                                <img src={`https://arweave.net/${ansData?.avatar}`} alt="Profile" width="100%" height="100%" />
                            </div>}

                    </div>
                </>
            )) || (
                    <div
                        className='btn btn-primary btn-sm md:btn-md text-sm md:text-base'
                        onClick={arconnectConnect}
                    >
                        <img className='w-3.5 h-3.5 mr-3.5 md:w-4 md:h-4 md:mr-4' src="https://nanofuxion.ar.page/favicon.png"></img> {"ANS login"}
                    </div>
                )}
        </>
    )
}
```

## Examples

To run the examples, switch to the respective directories. Run `npm install` or `yarn install`, Then run `npm start dev` or `yarn dev`.

## License
This project is licensed under the [MIT license](./LICENSE)

