import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WatcherProvider} from "../../providers/watcher/watcher";
import {EthAccount} from "../../interfaces/ethAccount";
import {QrScannerPage} from "../qr-scanner/qr-scanner";

@IonicPage()
@Component({
  selector: 'page-add-watcher-account',
  templateUrl: 'add-watcher-account.html',
})
export class AddWatcherAccountPage {

  private publicKey: any; //usuay.. it's a hex number... buy the output of the QR scanner qr scanner output is a string and the were no build in hex parser so far...
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

  openQrScanner() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(QrScannerPage, {resolve: resolve});
    }).then(input => {
        this.publicKey = input;
    });
  }
}
