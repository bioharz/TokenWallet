import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {timeoutWith} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import Web3 from 'web3';
import {EthAccount} from '../../interfaces/ethAccount';
import {AddressInfo} from '../../interfaces/ethPlorerInterfaces';
import {Refresher} from "ionic-angular";
import {CmcStat} from "../../interfaces/cmcStat";

@Injectable()
export class WatcherProvider {

  public accounts: EthAccount[] = [];
  private web3: any;
  public detailsUnavailable: boolean = false;
  private apiPath: string = "https://api.ethplorer.io/";
  private apiKey: string = "freekey";
  public isFetching: boolean = false;
  public cmcStat: CmcStat[] = [];
  private apiPathCMC: string = "https://api.coinmarketcap.com/v1/ticker/";

  constructor(private http: HttpClient, private storage: Storage) {
    this.web3 = new Web3(this.web3);
  }

  addAccount(account: EthAccount): void {
    this.loadAccounts().then(() => {
      this.accounts.push(account);
      this.saveAccounts();
      this.fetchDetails();
    });
  }

  removeAccount(account: EthAccount): void {

    this.accounts.splice(this.accounts.indexOf(account), 1);
    //this.loadAccounts(); //TODO: I'm not really sure if we need this line...
    this.saveAccounts();
  }

  saveAccounts(): void {
    this.storage.set('Accounts', this.accounts);
  }

  loadAccounts(fetchData?: boolean): Promise<null> {

    return new Promise(resolve => {
      this.storage.get('Accounts').then(accounts => {
        if (accounts !== null) {
          this.accounts = accounts;
          if (fetchData) {
            this.fetchDetails();
          }
        }
        resolve();
      }, reason => {
        console.warn("failed to load from storage: " + reason);
        resolve();
      });
    });
  }

  verifyAccount(account: EthAccount): boolean {
    return this.web3.utils.isAddress(account.publicKey);
  }

  fetchDetails(refresher?: Refresher): boolean {
    //TODO: We are working with parallel threats to fetch data. The server has limited capacities.. may we switch to serial fetching...

    if (!this.isFetching) {
      this.isFetching = true;

      this.detailsUnavailable = false;
      let requests = [];

      this.http.get<CmcStat[]>(this.apiPathCMC + 'ethereum/').subscribe(data => {
        this.cmcStat = data;
      });

      for (let account of this.accounts) {
        let request = this.http.get(this.apiPath + 'getAddressInfo/' + account.publicKey + '?apiKey=' + this.apiKey);
        requests.push(request);
      }

      forkJoin(requests).pipe(
        timeoutWith(20000, Observable.throw(new Error('Failed to fetch details.')))
      ).subscribe(results => {

        results.forEach((result: AddressInfo, index) => {
          this.accounts[index].addressInfo = result;
        });

        if (typeof(refresher) !== 'undefined') {
          refresher.complete();
        }

        this.saveAccounts();
        this.isFetching = false;

      }, err => {

        this.detailsUnavailable = true;

        if (typeof(refresher) !== 'undefined') {
          refresher.complete();
        }
        this.isFetching = false;

      });

      return true;
    } else {
      console.log("fetchDetails: Dont stress me, I'm still fetching data...");
      if (typeof(refresher) !== 'undefined') {
        refresher.complete();
        return false;
      }
    }
  }

}
