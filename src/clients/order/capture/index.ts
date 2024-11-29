import { RestClient } from '@src/utils/restClient';
import { CaptureOrderClient } from './types';
import { OrderResponse } from '../commonTypes';

export default function capture({ id, config }: 
  CaptureOrderClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/capture`,
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