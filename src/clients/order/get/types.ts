import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type OrderGetData = {
  id: string | number;
  requestOptions?: Options;
}

export declare interface OrderGetClient extends OrderGetData {
  config: MercadoPagoConfig;
}

