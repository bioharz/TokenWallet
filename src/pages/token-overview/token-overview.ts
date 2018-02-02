import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EthAccount} from "../../interfaces/ethAccount";
import {UtilsProvider} from "../../providers/utils/utils";

@IonicPage()
@Component({
  selector: 'page-token-overview',
  templateUrl: 'token-overview.html',
})
export class TokenOverviewPage {

  public ethAccount: EthAccount;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider) {
  }

  ionViewDidLoad() {
    this.ethAccount = this.navParams.get('ethAccount');
  }

}
