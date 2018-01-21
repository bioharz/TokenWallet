import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {timeoutWith} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import Web3 from 'web3';

export interface EthAccount {
  publicKey: number;
  name: string;
  balance?: number
}

export interface getAddressInfoInterface {
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

@Injectable()
export class WatcherProvider {

  public accounts: EthAccount[] = [];
  web3: any;
  public detailsUnavailable: boolean = false;
  private apiPath: string = "https://api.ethplorer.io/";
  private apiKey: string = "freekey";

  constructor(private http: HttpClient, private storage: Storage) {
    this.web3 = new Web3(this.web3);
  }

  addAccount(account: EthAccount): void {
    this.accounts.push(account);
    this.loadAccounts();
    this.saveAccounts();
  }

  removeAccount(account: EthAccount): void {

    this.accounts.splice(this.accounts.indexOf(account), 1);
    this.loadAccounts();
    this.saveAccounts();
  }

  saveAccounts(): void {
    this.storage.set('Accounts', this.accounts);
  }

  loadAccounts(): void {
    this.storage.get('Accounts').then(accounts => {
      if (accounts !== null) {
        this.accounts = accounts;
        this.fetchDetails();
      }
    });
  }

  verifyAccount(account: EthAccount): boolean {
    return this.web3.utils.isAddress(account.publicKey);
  }

  fetchDetails(refresher?): void {

    this.detailsUnavailable = false;
    let requests = [];

    for (let account of this.accounts) {
      let request = this.http.get(this.apiPath + 'getAddressInfo/' + account.publicKey + '?apiKey=' + this.apiKey);
      requests.push(request);
    }

    forkJoin(requests).pipe(
      timeoutWith(5000, Observable.throw(new Error('Failed to fetch details.')))
    ).subscribe(results => {

      results.forEach((result: getAddressInfoInterface, index) => {
        this.accounts[index].balance = result.ETH.balance;
      });

      if (typeof(refresher) !== 'undefined') {
        refresher.complete();
      }

      this.saveAccounts();

    }, err => {

      this.detailsUnavailable = true;

      if (typeof(refresher) !== 'undefined') {
        refresher.complete();
      }

    });

  }

}
