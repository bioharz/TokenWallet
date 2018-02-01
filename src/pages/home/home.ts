import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IonicPage} from 'ionic-angular';
import {WatcherProvider} from "../../providers/watcher/watcher";
import {AddWatcherAccountPage} from "../add-watcher-account/add-watcher-account";
import {ToastController} from 'ionic-angular';
import {TokenOverviewPage} from "../token-overview/token-overview";
import {EthAccount} from "../../interfaces/ethAccount";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private firstFetch: boolean = true; //ugly workaround: We cannot get programmatically access to the refresher...

  constructor(public navCtrl: NavController, private watcherProvider: WatcherProvider, private toastCtrl: ToastController) {

  }

  ionViewDidLoad(): void {
    this.watcherProvider.loadAccounts(true);
  }

  addPublicAddress(): void {
    this.navCtrl.push('AddWatcherAccountPage');
  }

  refreshAccounts(refresher): void {
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

  pushTokenPage(ethAccount: EthAccount) {
    this.navCtrl.push(TokenOverviewPage, {ethAccount: ethAccount});
  }


}
