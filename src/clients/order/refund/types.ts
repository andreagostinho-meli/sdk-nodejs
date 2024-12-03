import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import { RefundRequest } from '../create/types';

export declare type OrderRefundData = {
  id: string;
  requestOptions?: Options;
}

export declare type OrderRefundClient = {
  config: MercadoPagoConfig;
  id: string;
  body?: RefundRequest;
}

export { RefundRequest };
