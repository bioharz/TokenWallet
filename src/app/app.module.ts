import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { QrScannerProvider } from '../providers/qr-scanner/qr-scanner';

import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
  declarations: [
    MyApp,
    //HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QrScannerProvider,
    QRScanner
  ]
})
export class AppModule {}
