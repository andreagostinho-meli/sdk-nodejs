import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData, RefundRequest } from '@src/clients/order/create/types';
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

describe('Refund Order Partially Integration test', () => {
	test('should refund partially an Order successfully', async () => {
		const cardToken = await createCardToken(config.access_token);
		const token = cardToken.id;
		const body = createBodyOrder(token); 

		const orderClient = new Order(mercadoPagoConfig);
		const order = await orderClient.create(body);
		const orderId = order.id;
		const transactionId = order.transactions.payments[0].id;
		const bodyRefund: RefundRequest = {
			transactions: [
				{
					id: transactionId,
					amount: '25.00'
				}
			]
		};
		const refundedPartialOrder = await orderClient.refund({ id: orderId, body: bodyRefund });

		expect(refundedPartialOrder.id).toBeTruthy();
		expect(refundedPartialOrder.id).toBe(orderId);
		expect(refundedPartialOrder.status).toBe('processed');
		expect(refundedPartialOrder.status_detail).toBe('partially_refunded');
		expect(refundedPartialOrder.transactions.refunds[0].amount).toBe('25.00');
		expect(refundedPartialOrder.transactions.refunds[0].status).toBe('processed');
	});
});