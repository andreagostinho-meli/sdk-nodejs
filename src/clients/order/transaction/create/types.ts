// API version: b950ae02-4f49-4686-9ad3-7929b21b6495

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import { PaymentRequest } from '../../commonTypes';

export declare type OrderCreateTransactionClient = {
	id: string;
	body: OrderCreateTransactionRequest;
	config: MercadoPagoConfig;
}

export declare type OrderCreateTransactionData = {
	id: string;
	body: OrderCreateTransactionRequest;
	requestOptions?: Options;
}

export declare type OrderCreateTransactionRequest = {
	payments?: PaymentRequest[];
}
