import { Request, Response } from 'express';

import { ChuckNorrisController } from '../routes';

describe('ChuckNorrisController tests', () => {
  const chuckApi = new ChuckNorrisController();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockRequest = (req?: { [key: string]: any }) => req;

  const mockResponse = (msg: string) =>
    ({
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnValue({ message: msg }),
    } as unknown as Response);

  test('GET /chuck-norris/health-check/', async () => {
    const response = await chuckApi.test(
      mockRequest({}) as Request,
      mockResponse('Everything up and running...')
    );

    expect(response).toEqual({ message: 'Everything up and running...' });
  });

  // TODO: mock database fail in health check...
  // test comment
  test('GET /chuck-norris/', async () => {
    const response = await chuckApi.get(
      mockRequest({
        body: { authenticatedUser: 'john.doe@acme.com' },
      }) as Request,
      mockResponse(
        'A new joke has been sent to your email'
      ) as unknown as Response
    );
    expect(response).toEqual({
      message: 'A new joke has been sent to your email',
    });
  });
});
