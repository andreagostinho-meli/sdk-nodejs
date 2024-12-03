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

export default async function deleteTransaction(
	{ id, transactionId, config }: OrderDeleteTransactionClient
): Promise<DeleteTransactionResponse> {
	try {
		const response: ResponseWithJSON = await RestClient.fetch(
			`/v1/orders/${id}/transactions/${transactionId}`,
			{
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${config.accessToken}`,
				},
				...config.options
			}
		);

		if (response.status === 204) {
			return {
				success: true,
				message: 'Transação deletada com sucesso',
			};
		}

		const errorData = await response.json();

		if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
			return {
				success: false,
				message: errorData.errors[0].message || 'Error deleting transaction',
				status: response.status,
			};
		} else {
			return {
				success: false,
				message: errorData.message || 'Unknown error while deleting transaction',
				status: response.status,
			};
		}
	} catch (error) {
		return {
			success: false,
			message: 'Communication error: ' + (error instanceof Error ? error.message : 'unknown error'),
		};
	}
}