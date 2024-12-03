import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { OrderResponse } from '../commonTypes';
import refund from './index';

jest.mock('@utils/restClient');

describe('Refund Total Order', () => {
	test('should refund an Order completely', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JE6EZVK4FGMM4AYVQF23K17B';
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 201,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			status: 'refunded',
			status_detail: 'refunded',
			transactions: {
				refunds: [
					{
						id: 'ref_01JE6F05C365ADF8JSJ3W92FJ5',
						transaction_id: 'pay_01JE6EZVK4FGMM4AYVQGSGDG9W',
						reference_id: '01JE6F04N2RE5KEAK4HYYPJ4AK',
						amount: '100.00',
						status: 'processed',
					}
				]
			}
			
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await refund({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JE6EZVK4FGMM4AYVQF23K17B/refund',
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer access_token',
				}
			}
		);
		expect(result).toEqual(mockOrderResponse);
	});
});
