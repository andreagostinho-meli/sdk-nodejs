import MercadoPago from '@src/index';
import { config } from '../../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';
import { createCardToken } from '@src/mocks/createCardToken';
import { v4 as uuidv4 } from 'uuid';

describe('Delete Order transaction integration test', () => {
	test('should delete Order transaction', async () => {
		const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });
		const order = new Order(mercadoPagoConfig);
		const { id: cardToken } = await createCardToken(config.access_token);
		const createOrderRequestBody: OrderCreateData = {
			body: {
				type: 'online',
				processing_mode: 'manual',
				total_amount: '200.00',
				external_reference: 'ext_ref_1234',
				payer: {
					email: 'test_1731350184@testuser.com'
				},
				transactions: {
					payments: [
						{
							amount: '100.00',
							payment_method: {
								id: 'master',
								type: 'credit_card',
								token: cardToken,
								installments: 1,
							}
						},
						{
							amount: '100.00',
							payment_method: {
								id: 'pix',
								type: 'bank_transfer',
							}
						}
					]
				},
			},
			requestOptions: {
				idempotencyKey: uuidv4(),
			},
		};

		const orderResponse = await order.create(createOrderRequestBody);

		const mercadoPagoConfigDelete = new MercadoPago({ accessToken: config.access_token });
		const orderDelete = new Order(mercadoPagoConfigDelete);

		const deletedTransaction = await orderDelete.deleteTransaction({
			id: orderResponse.id,
			transactionId: orderResponse.transactions.payments[0].id,
			requestOptions: {
				idempotencyKey: uuidv4(),
			}
		});

		expect(deletedTransaction.api_response.status).toBe(200);
	}, 20000);
});
