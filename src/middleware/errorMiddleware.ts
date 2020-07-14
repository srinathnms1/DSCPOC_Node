import { Request, Response } from 'express';

import HttpException from '../exceptions/httpException';

const errorMiddleware = (error: HttpException, _request: Request, response: Response) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status)
    .send({
      status: status,
      message: message,
    });
};

export default errorMiddleware;