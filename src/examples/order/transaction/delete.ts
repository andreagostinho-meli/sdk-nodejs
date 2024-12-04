/**
 * Mercado Pago Create Order transaction.
 *
 * @see {@link [TODO: insert Order documentation URL] Documentation }.
	*/

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';
  
const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });
  
const order = new Order(mercadoPagoConfig);
  
order.deleteTransaction({
	id: '<ORDER_ID>',
	transactionId: '<TRANSACTION_ID>',
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	}
}).then(console.log).catch(console.error);
  