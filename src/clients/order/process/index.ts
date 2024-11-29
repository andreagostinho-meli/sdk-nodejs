import { RestClient } from '@src/utils/restClient';
import { ProcessOrderClient } from './types';
import { OrderResponse } from '../commonTypes';

export default function processOrder({ id, config }: 
  ProcessOrderClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/process`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'X-Sandbox': 'true',
			},
			...config.options
		}
	);
}