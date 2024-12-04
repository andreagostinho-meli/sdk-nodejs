import { RestClient } from '@src/utils/restClient';
import { OrderDeleteTransactionClient } from './types';

interface DeleteTransactionResponse {
  success: boolean;
  message?: string;
  status?: number;
}

interface ResponseWithJSON extends Response {
  json: () => Promise<any>;
}

export default async function deleteTransaction({ id, transactionId, config }: OrderDeleteTransactionClient): Promise<DeleteTransactionResponse> {
	return RestClient.fetch(
		`/v1/orders/${id}/transactions/${transactionId}`,
		{
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	).then((response: ResponseWithJSON) => {
		if (response.status === 204) {
			return {
				success: true,
			};
		}

		return response.json().then((errorData) => {
			if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
				return {
					success: false,
					message: errorData.errors[0].message,
					status: response.status,
				};
			} else {
				return {
					success: false,
					message: errorData.message,
					status: response.status,
				};
			}
		});
	});
}