import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { CreateOrderData } from '@src/clients/order/create/types';
import { createCardToken } from '@src/mocks/createCardToken';

const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });

function createBodyOrder(token: string): CreateOrderData {
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
			},
			type_config:{
				capture_mode: 'manual'
			}
		}
	};
}

describe('Capture Order integration test', () => {
	test('should capture an Order successfully', async () => {
		const cardTokenResponse = await createCardToken(config.access_token);
		const token = cardTokenResponse.id;
		const orderClient = new Order(mercadoPagoConfig);
		const body = createBodyOrder(token); 

		const order = await orderClient.create(body);
		const orderId = order.id;
		const processOrder = await orderClient.capture({ id: orderId });

		expect(processOrder.id).toBeTruthy();
		expect(processOrder.id).toBe(orderId);
		expect(processOrder.status).toBe('processed');
		expect(processOrder.status_detail).toBe('accredited');
		expect(processOrder.transactions.payments[0].amount).toBe('200.00');
		expect(processOrder.transactions.payments[0].status).toBe('processed');
		expect(processOrder.transactions.payments[0].status_detail).toBe('accredited');
	});
});