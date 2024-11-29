import create from './create';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { CreateOrderData } from './create/types';
import { OrderResponse } from './commonTypes';
import { CaptureOrderData } from './capture/types';
import capture from './capture';

/**
 * Mercado Pago Order.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class Order {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Create Order.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/create.ts Usage Example }.
   */
	create({ body, requestOptions }: CreateOrderData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
   * Capture Order.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/capture.ts Usage Example }.
   */
	capture({ id, requestOptions }: CaptureOrderData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, config: this.config });
	}
}
