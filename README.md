# Mercado Pago SDK for NodeJS

[![NPM Version](https://img.shields.io/npm/v/mercadopago.svg)](http://npmjs.com/package/mercadopago)
[![Downloads](https://img.shields.io/npm/dt/mercadopago.svg)](http://npmjs.com/package/mercadopago)
[![License](https://img.shields.io/apm/l/vim-mode)](https://github.com/mercadopago/sdk-nodejs)

This library provides developers with a simple set of bindings to help you integrate Mercado Pago API to a website and start receiving payments.

## 💡 Requirements

The SDK Supports NodeJS version 12 or higher.

## 📲 Installation 

First time using Mercado Pago? Create your [Mercado Pago account](https://www.mercadopago.com), if you don’t have one already.

1. Install NodeJS SDK for MercadoPago running in command line:
```sh
$ npm install --save mercadopago
```

2. Copy the access_token in the [credentials](https://www.mercadopago.com/mlb/account/credentials) section of the page and replace YOUR_ACCESS_TOKEN with it.

That's it! Mercado Pago SDK has been successfully installed.

## 🌟 Getting Started

  Simple usage looks like:

```javascript
var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'YOUR_ACCESS_TOKEN'
});

var preference = {
  items: [
    {
      title: 'Test',
      quantity: 1,
      currency_id: 'ARS',
      unit_price: 10.5
    }
  ]
};

mercadopago.preferences.create(preference)
```

## 📚 Documentation 

Visit our Dev Site for further information regarding:
 - Payments APIs: [Spanish](https://www.mercadopago.com.ar/developers/es/guides/payments/api/introduction/) / [Portuguese](https://www.mercadopago.com.br/developers/pt/guides/payments/api/introduction/)
 - Mercado Pago checkout: [Spanish](https://www.mercadopago.com.ar/developers/es/guides/payments/web-payment-checkout/introduction/) / [Portuguese](https://www.mercadopago.com.br/developers/pt/guides/payments/web-payment-checkout/introduction/)
 - Web Tokenize checkout: [Spanish](https://www.mercadopago.com.ar/developers/es/guides/payments/web-tokenize-checkout/introduction/) / [Portuguese](https://www.mercadopago.com.br/developers/pt/guides/payments/web-tokenize-checkout/introduction/)

Check our [official code reference](https://mercadopago.github.io/sdk-nodejs/) to explore all available functionalities.

## 🤝 Contributing

All contributions are welcome, ranging from people wanting to triage issues, others wanting to write documentation, to people wanting to contribute with code.

Please read and follow our [contribution guidelines](CONTRIBUTING.md). Contributions not following these guidelines will be disregarded. The guidelines are in place to make all of our lives easier and make contribution a consistent process for everyone.

### Patches to version 1.x.x

Since the release of version 2.0.0, version 1 is deprecated and will not be receiving new features, only bug fixes. If you need to submit PRs for that version, please do so by using develop-v1 as your base branch.

## ❤️ Support 

If you require technical support, please contact our support team at our developers
site: [English](https://www.mercadopago.com/developers/en/support/center/contact)
/ [Portuguese](https://www.mercadopago.com/developers/pt/support/center/contact)
/ [Spanish](https://www.mercadopago.com/developers/es/support/center/contact)

## 🏻 License 

```
MIT license. Copyright (c) 2023 - Mercado Pago / Mercado Libre 
For more information, see the LICENSE file.
```
