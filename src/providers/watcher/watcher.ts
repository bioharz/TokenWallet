import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {timeoutWith} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import Web3 from 'web3';
import { EthAccount } from '../../interfaces/ethAccount';
import { addressInfo } from '../../interfaces/ethPlorerInterfaces';

@Injectable()
export class WatcherProvider {

  public accounts: EthAccount[] = [];
  private web3: any;
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

      results.forEach((result: addressInfo, index) => {
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
