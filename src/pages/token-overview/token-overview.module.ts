import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TokenOverviewPage } from './token-overview';

@NgModule({
  declarations: [
    TokenOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(TokenOverviewPage),
  ],
})
export class TokenOverviewPageModule {}
