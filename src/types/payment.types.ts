export enum PAYMENT_TYPE_GAME {
  RUST = 'RUST',
  CS_GO = 'CS_GO',
  DOTA_2 = 'DOTA_2',
}

export enum CARD_TYPE {
  CREDIT_CARD = 'CREDIT_CARD',
  GIFT_CARD = 'GIFT_CARD',
  BIT_INVESTOR = 'BIT_INVESTOR',
  BANK_REVOLUT = 'BANK_REVOLUT',
  NOTAPAYMENT = 'NOTAPAYMENT',
}

export enum CRYPTO_CURRENCY {
  BITCOIN = 'btc',
  ETHEREUM = 'eth',
  USDT = 'usdtt',
  LITECOIN = 'ltc',
  BINANCE_COIN = 'bnb',
  BUSD = 'busd',
  TRON = 'trx',
}

export enum CRYPTO_CURRENCY_U {
  BITCOIN = 'BTC',
  ETHEREUM = 'ETH',
  USDT = 'USDTT',
  LITECOIN = 'LTC',
  BINANCE_COIN = 'BNB',
  BUSD = 'BUSD',
}


export type PAYMENT_METHOD =
  | PAYMENT_TYPE_GAME
  | CARD_TYPE
  | CRYPTO_CURRENCY

export enum TRANSACTION_TYPE {
  STEAM = 'steam',
  CRYPTO = 'crypto',
  WAXPEER = 'waxpeer',
  SKINSBACK = 'skinsback',
  STRIPE = 'stripe',
  TIP = 'tipping',
  BIT_INVESTOR = 'bitinvestor',
  NOT_A_PAYMENT = 'notapayment',
  ZEN = 'zen',
}

export enum PaymentBadge {
  FREE_CRATE = 'FREE_CRATE',
}