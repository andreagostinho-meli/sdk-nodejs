import { RestClient } from '@src/utils/restClient';

import type { CancelPaymentIntentResponse } from '../commonTypes';
import type { CancelPaymentIntent } from './types';

export default function cancelPaymentIntent({
	device_id,
	payment_intent_id,
	config,
}: CancelPaymentIntent): Promise<CancelPaymentIntentResponse> {
	return RestClient.fetch<CancelPaymentIntentResponse>(
		`/point/integration-api/devices/${device_id}/payment-intents/${payment_intent_id}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}
