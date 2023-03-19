# Near Web3 Extension

A browser extension that gives you Near Social data on Near Wallet.

## Features

### dApp account tags on contract auth

Check the public tags for a given smart contract when adding its key to your account

### Verify receiver's NEAR Account when sending tokens

Know the receiver's profile and public tags before sending funds

### Near Social notification feed and updates counter

Watch Near Social updates right from your wallet

### Social profile in wallet

See your social avatar for your current Near wallet account

## Installation (prepare for chrome web store)

Run these commands to prepare a zip file to be uploaded to the Chrome Web Store.

```bash
yarn
yarn prep
```

You will find the prepared zip file at `./packed/extension.zip`.

## Installation (dev)

First, run these command to install deps and build bundle.

```bash
yarn
yarn dev
```

Then, go to your browser's extensions page, enable `Developer Mode`.

Then, click `Load unpacked` to navigate to the `/dist` directory and load it up.

Now when you open a new tab, you should be prompted whether you want to use this extension or not.

Have fun!
