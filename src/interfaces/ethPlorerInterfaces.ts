export interface AddressInfo {
  address: number //address,
  ETH: {   //ETH specific information
    balance: number //ETH balance
    totalIn: number //Total incoming ETH value
    totalOut: number //Total outgoing ETH value
  },
  contractInfo: { //exists if specified address is a contract
    creatorAddress: number //contract creator address,
    transactionHash: number // contract creation transaction hash,
    timestamp: string //contract creation timestamp
  },
  tokenInfo?: TokenInfo //exists if specified address is a token contract address (same format as token info),
  tokens: [  //exists if specified address has any token balances
    {
      tokenInfo?: TokenInfo // token data (same format as token info),
      balance: number //token balance (as is, not reduced to a floating point value),
      totalIn: number //total incoming token value
      totalOut: number //total outgoing token value
    }
    ],
  countTxs: number //Total count of incoming and outcoming transactions (including creation one),
}


interface TokenInfo {
  address: number // token address,
  totalSupply: number // total token supply,
  name: string // token name,
  symbol: string // token symbol,
  decimals: number // number of significant digits,
  price?: { // token price (false, if not available)
    rate: number // current rate
    currency: string // token price currency (USD)
    diff: number // 24 hour rate difference (in percent)
    ts: number // last rate update timestamp
    diff7d: number
    marketCapUsd: number
    availableSupply: number
    volume24h: number
  },
  owner: number // token owner address,
  countOps?: number // total count of token operations
  totalIn?: number // total amount of incoming tokens
  totalOut?: number // total amount of outgoing tokens
  holdersCount: number // total numnber of token holders
  issuancesCount?: number // total count of token issuances

}
