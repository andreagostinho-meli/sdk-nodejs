
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CaptureOrderData = {
  id: string;
  requestOptions?: Options;
}

export declare type CaptureOrderClient = CaptureOrderData & {
  config: MercadoPagoConfig
}
