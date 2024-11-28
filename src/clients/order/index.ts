import create from './create';
import get from './get'; 

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { CreateOrderData, OrderResponse } from './create/types';
import { OrderGetData } from './get/types';

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
   * Get Order.
   *
   * @param {OrderGetData} params - Object containing the order ID.
   * @returns {Promise<OrderResponse>} - Promise resolving to the order response.
   */
  get({ id, requestOptions }: OrderGetData): Promise<OrderResponse> {
    this.config.options = { ...this.config.options, ...requestOptions };
    return this.get({ id, config: this.config }); // Chama a função get passando o ID e a configuração
  }
}
