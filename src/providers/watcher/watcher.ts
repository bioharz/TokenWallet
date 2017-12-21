import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { timeoutWith } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

interface Account {
  publicKey: string;
  balance?: number
}

@Injectable()
export class WatcherProvider {

  public accounts: Account[] = [];

  constructor(private http: HttpClient, private storage: Storage) {

  }

  addPublicKey(account: Account): void {

    this.accounts.push(account);
    this.loadAccounts();
    this.saveAccounts();
  }

  removeAccount(account: Account): void {

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

  verifyPublicKey(account)/* :Observable<any>*/  {

    return true //TODO

    /*
    https://ethereum.stackexchange.com/questions/1374/how-can-i-check-if-an-ethereum-address-is-valid

     */
  }

  //TODO: implement reload method

}
