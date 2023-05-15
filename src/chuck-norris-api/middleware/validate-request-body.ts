import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware::validateBody() - Validating request body');
    const attribute = req.body;
    const { error } = schema.validate(attribute);
    if (error) {
      const { details } = error;
      const stringifyErrorDetails = details.map((i) => i.message).join(', ');
      console.log(
        `Middleware::validateBody() - Error: ${stringifyErrorDetails}`
      );
      return res
        .status(401)
        .json({ error: `Invalid request body: ${stringifyErrorDetails}` });
    }
    next();
  };
};
