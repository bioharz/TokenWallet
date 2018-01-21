export interface addressInfo {
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
  tokenInfo: string //exists if specified address is a token contract address (same format as token info),
  tokens: [  //exists if specified address has any token balances
    {
      tokenInfo: string // token data (same format as token info),
      balance: number //token balance (as is, not reduced to a floating point value),
      totalIn: number //total incoming token value
      totalOut: number //total outgoing token value
    }
    ],
  countTxs: number //Total count of incoming and outcoming transactions (including creation one),
}
