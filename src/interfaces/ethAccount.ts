import {AddressInfo} from "./ethPlorerInterfaces";

export interface EthAccount {
  publicKey: number;
  name: string;
  addressInfo?: AddressInfo;
}
