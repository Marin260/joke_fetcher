import { Request, Response } from 'express';

import { ChuckNorrisController } from '../routes';
describe('ChuckNorrisController tests', () => {
  const chuckApi = new ChuckNorrisController();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockRequest = () => {
    const req = { body: {}, params: {} };
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  };

  const mockResponse = () => {
    const res = { send: {}, status: {}, json: {} };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  // test correct health check
  test('GET /chuck-norris/health-check/', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await chuckApi.test(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Everything up and running...',
    });
  });

  // db fail health check
  test('GET /chuck-norris/health-check/', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const dbMock = {
      authenticate: jest
        .fn()
        .mockRejectedValue(new Error('DB connection problem')),
    };
    const chuckApi2 = new ChuckNorrisController();
    await chuckApi2.test(req as Request, res as Response);
    // mock db fail
    expect(dbMock.authenticate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'connection to DB failed...',
    });
  });

  // TODO: mock database fail in health check...
  //test('GET /chuck-norris/', async () => {
  //  const req = mockRequest();
  //  const res = mockResponse();
  //  await chuckApi.get(req, res);
  //  await chuckApi.get(
  //    mockRequest({
  //      body: { authenticatedUser: 'john.doe@acme.com' },
  //    }) as Request,
  //    mockResponse(
  //      'A new joke has been sent to your email'
  //    ) as unknown as Response
  //  );
  //  expect(response).toEqual({
  //    message: 'A new joke has been sent to your email',
  //  });
  //});
});
