import { Request, Response } from 'express';

import { ChuckNorrisController } from '../routes';
describe('ChuckNorrisController tests', () => {
  test('GET /health-check/', async () => {
    const chuckApi = new ChuckNorrisController();
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest
        .fn()
        .mockReturnValue({ message: 'Everything up and running...' }),
    };

    const response = await chuckApi.test(
      {} as Request,
      mockResponse as unknown as Response
    );

    expect(response).toEqual({ message: 'Everything up and running...' });
  });
});
