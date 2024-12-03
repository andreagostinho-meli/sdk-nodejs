/**
 * Mercado Pago Refund Partial Order.
 *
 * @see {@link [TODO: insert Order documentation URL] Documentation }.
  */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

// Creates an order and returns its ID.
async function createOrder(): Promise<string> {
	try {
		const orderResponse = await order.create({
			body: {
				type: 'online',
				processing_mode: 'automatic',
				total_amount: '100.00',
				external_reference: 'ext_ref_1234',
				payer:{
					email: 'jota2@testuser.com'
				},
				transactions: {
					payments: [
						{
							amount: '100.00',
							payment_method: {
								id: 'master',
								type: 'credit_card',
								token: '<CARD_TOKEN>',
								installments: 1
							}
						}
					]
				}
			},
			requestOptions: {
				idempotencyKey: '<IDEMPOTENCY_KEY>',
			}
		});
		console.log('Order created successfully:', orderResponse);
		return orderResponse.id; 
	} catch (error) {
		console.error('Error creating order:', error);
	}
}

// Create an Order and then Refund the partial amount of the order.
(async () => {
	try {
		const orderId = await createOrder(); 
		const refundedOrder = await order.refund({
			id: orderId, 
			body: {
				transactions: [
					{
						id: '<transaction_id>',
						amount: '25.00'
					}
				]
			},
			requestOptions: {
				idempotencyKey: '<IDEMPOTENCY_KEY>',
			}
		});
		console.log('Order refund successfully:', refundedOrder);
	} catch (error) {
		console.error('Error refunding order:', error); 
	}
})();