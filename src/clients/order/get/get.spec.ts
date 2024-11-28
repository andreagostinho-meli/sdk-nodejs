import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import get from './index'; // Importando a função get
import { OrderResponse } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Get Order', () => {
  test('should get Order', async () => {
    const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
    const orderId = '01JDMS5325ZDWMESRB5G2541BD'; // Exemplo de ID de pedido
    const spyFetch = jest.spyOn(RestClient, 'fetch');

    await get({ id: orderId, config });

    expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JDMS5325ZDWMESRB5G2541BD',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer access_token',
          'X-Sandbox': 'true'
        }
      }
    );
  });
});