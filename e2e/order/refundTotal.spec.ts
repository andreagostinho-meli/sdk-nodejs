import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';
import { createCardToken } from '@src/mocks/createCardToken';

const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });

function createBodyOrder(token: string): OrderCreateData {
	return {
		body: {
			type: 'online',
			processing_mode: 'automatic',
			total_amount: '200.00',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '200.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: token,
							installments: 1
						}
					}
				]
			},
			payer: {
				email: 'test_1731350184@testuser.com'
			}
		}
	};
}

describe('Refund Total Order Integration test', () => {
	test('should refund the total amount of an Order successfully', async () => {
		const cardToken = await createCardToken(config.access_token);
		const token = cardToken.id;
		const body = createBodyOrder(token); 

		const orderClient = new Order(mercadoPagoConfig);
		const order = await orderClient.create(body);
		const orderId = order.id;
		const refundedTotalOrder = await orderClient.refund({ id: orderId });

		expect(refundedTotalOrder.id).toBeTruthy();
		expect(refundedTotalOrder.id).toBe(orderId);
		expect(refundedTotalOrder.status).toBe('refunded');
		expect(refundedTotalOrder.status_detail).toBe('refunded');
		expect(refundedTotalOrder.transactions.refunds[0].amount).toBe('200.00');
		expect(refundedTotalOrder.transactions.refunds[0].status).toBe('processed');
	});
});