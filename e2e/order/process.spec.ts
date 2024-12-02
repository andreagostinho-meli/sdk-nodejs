import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { CreateOrderData } from '@src/clients/order/create/types';
import fetch from 'node-fetch';

const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });

async function generateToken(): Promise<string> {
	const cardDetails = {
		card_number: '5031433215406351',
		expiration_year: '2025',
		expiration_month: '12',
		security_code: '123',
		cardholder: {
			name: 'APRO',
			identification: {
				type: 'CPF',
				number: '19119119100'
			}
		}
	};

	const response = await fetch(`https://api.mercadopago.com/v1/card_tokens?public_key=${config.public_key}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(cardDetails)
	});

	if (!response.ok) {
		const errorDetails = await response.json();
		throw new Error(`Failed to generate token: ${response.statusText} - ${JSON.stringify(errorDetails)}`);
	}

	const data = await response.json();
	return data.id;
}

async function createBodyOrder(token: string): Promise<CreateOrderData> {
	return {
		body: {
			type: 'online',
			processing_mode: 'manual',
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

describe('Process Order integration test', () => {
	test('should process an Order successfully', async () => {
		const token = await generateToken();
		const orderClient = new Order(mercadoPagoConfig);
		const body = await createBodyOrder(token); 

		const order = await orderClient.create(body);
		const orderId = order.id;
		const processOrder = await orderClient.process({ id: orderId });

		expect(processOrder.id).toBeTruthy();
		expect(processOrder.id).toBe(orderId);
		expect(processOrder.type).toBe('online');
		expect(processOrder.total_amount).toBe('200.00');
		expect(processOrder.status).toBe('processed');
		expect(processOrder.status_detail).toBe('accredited');
		expect(processOrder.external_reference).toBe('ext_ref_1234');
		expect(processOrder.transactions.payments[0].amount).toBe('200.00');
		expect(processOrder.transactions.payments[0].payment_method.id).toBe('master');
	});
});