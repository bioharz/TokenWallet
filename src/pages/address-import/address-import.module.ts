import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressImportPage } from './address-import';

@NgModule({
  declarations: [
    AddressImportPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressImportPage),
  ],
})
export class AddressImportPageModule {}
