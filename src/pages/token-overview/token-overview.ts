import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {EthAccount} from "../../interfaces/ethAccount";
import {UtilsProvider} from "../../providers/utils/utils";
import {WatcherProvider} from "../../providers/watcher/watcher";

@IonicPage()
@Component({
  selector: 'page-token-overview',
  templateUrl: 'token-overview.html',
})
export class TokenOverviewPage {

  public ethAccount: EthAccount;

  private firstFetch: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider, private watcherProvider: WatcherProvider, private toastCtrl: ToastController) {
  }

  refreshCurrentAccount(refresher): void {
    this.firstFetch = false;
    let hasFetched: boolean = this.watcherProvider.fetchDetails(refresher);
    if (!hasFetched) {
      this.toastMessage("I'm still fetching Data, be patient please");
    }
  }

  toastMessage(message: string) {
    if (message.length > 0) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
      });
      toast.present();
    }
  }

  ionViewDidLoad() {
    this.ethAccount = this.navParams.get('ethAccount');
  }

}
