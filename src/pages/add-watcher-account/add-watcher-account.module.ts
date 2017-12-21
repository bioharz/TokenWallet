import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddWatcherAccountPage } from './add-watcher-account';

@NgModule({
  declarations: [
    AddWatcherAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AddWatcherAccountPage),
  ],
})
export class AddWatcherAccountPageModule {}
