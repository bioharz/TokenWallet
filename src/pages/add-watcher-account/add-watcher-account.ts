import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WatcherProvider} from "../../providers/watcher/watcher";
import {EthAccount} from "../../interfaces/ethAccount";

@IonicPage()
@Component({
  selector: 'page-add-watcher-account',
  templateUrl: 'add-watcher-account.html',
})
export class AddWatcherAccountPage {

  private publicKey: number;
  private accountName: string;
  private badAddress: boolean = false;
  private buttonSpinner: boolean = false; //TODO: may we have to remove this because the next page push is "to fast"

  constructor(public navCtrl: NavController, public navParams: NavParams, private watcherProvider: WatcherProvider) {

  }

  addPublicKey() {
    this.buttonSpinner = true;
    let account: EthAccount = {publicKey: this.publicKey, name:this.accountName};

    if (this.watcherProvider.verifyAccount(account)) {
      this.watcherProvider.addAccount(account);
      this.navCtrl.pop();
    } else {
      this.buttonSpinner = false;
      this.badAddress = true;
    }
  }

}
