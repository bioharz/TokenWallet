import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WatcherProvider} from "../../providers/watcher/watcher";

/**
 * Generated class for the AddWatcherAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-watcher-account',
  templateUrl: 'add-watcher-account.html',
})
export class AddWatcherAccountPage {

  private publicKey: string;
  private isValid: boolean = false;
  private badAddress: boolean = false;
  private noInternet: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private watcherProvider: WatcherProvider) {
  }

  /*
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWatcherAccountPage');
  }*/

  addPublicKey() {

    this.badAddress = false;
    this.noInternet = false;
    this.isValid = true;

    let account = {
      publicKey: this.publicKey,
    };


    /*
    this.watcherProvider.verifyPublicKey(account).subscribe((result) => {

      this.isValid = false;

      if (result.success) {
        this.watcherProvider.addPublicKey(account);
        this.navCtrl.pop();
      } else {
        this.badAddress = true;
      }

    }, (err) => {

      this.noInternet = true;
      this.isValid = false;

    });
    */

  }


}
