import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import 'rxjs/add/observable/throw';

import Web3 from 'web3';

export interface EthAccount {
  publicKey: number;
  balance?: number
}

@Injectable()
export class WatcherProvider {

  public accounts: EthAccount[] = [];
  web3: any;

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
        this.loadAccounts();
      }
    });
  }

  verifyAccount(account: EthAccount): boolean {
    return this.web3.utils.isAddress(account.publicKey);
  }

  //TODO: implement reload method
}
