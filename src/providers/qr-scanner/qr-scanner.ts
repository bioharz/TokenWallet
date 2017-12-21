//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';


/*
  Generated class for the QrScannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrScannerProvider {

  constructor(/*public http: HttpClient*/private qrScanner: QRScanner) {
    console.log('Hello QrScannerProvider Provider');



  }

}
