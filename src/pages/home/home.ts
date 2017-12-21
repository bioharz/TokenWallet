import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import {WatcherProvider} from "../../providers/watcher/watcher";
import {AddWatcherAccountPage} from "../add-watcher-account/add-watcher-account";
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private watcherProvider: WatcherProvider ) {

  }

  addPublicAddress(): void {
    this.navCtrl.push('AddWatcherAccountPage');
  }
}
