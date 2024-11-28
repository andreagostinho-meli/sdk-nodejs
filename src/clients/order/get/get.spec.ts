import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import get from './index';
import { OrderResponse } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Get Order', () => {
	test('should get Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const order_id = '01JDMS5325ZDWMESRB5G2541BD';
		
		// Mock Order Response
		const MockOrderResponse: OrderResponse = {
			api_response: {
				status: 200,
				headers: [
					'Content-Type',['application/json']
				]
			},
			id: order_id,
			status: '200',
			total_amount: '200.00',
		};
    
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(MockOrderResponse);
		const result = await get({ id: order_id, config });
		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JDMS5325ZDWMESRB5G2541BD',
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer access_token',
					'X-Sandbox': 'true'
				}
			}
		);
		expect(result).toEqual(MockOrderResponse);
	});
});