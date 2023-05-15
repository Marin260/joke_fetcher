import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { validateBody } from '../middleware/validate-request-body';
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import Joi from 'joi';

import { ChuckUser } from '../../database-entities/entities';
import { validateJWT } from '../middleware/jwt-check';
import jwt from 'jsonwebtoken';

@Controller('')
export class AuthController {
  @Post('reg')
  @Middleware([
    validateBody(
      Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).alphanum().required(),
      })
    ),
  ])
  async register(req: Request, res: Response) {
    console.log('AuthController::register() - Enter');
    const { firstName, lastName, email, password } = req.body;
    const { salt, hash } = hashUserPassword(password);

    // creating new user
    try {
      const newUser = ChuckUser.build({
        firstName: firstName,
        lastName: lastName,
        email: email,
        salt: salt,
        password: hash,
      });
      await newUser.save();
    } catch (error) {
      console.log('AuthController::register() - Error: User already exists');
      return res.status(400).json({ error: 'User already exits' });
    }
    const token = createJWT(email);
    return res
      .status(200)
      .json({ message: 'User registered succesfully', token: token });
  }

  @Post('auth')
  @Middleware([
    validateBody(
      Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).alphanum().required(),
      })
    ),
  ])
  async authenticate(req: Request, res: Response) {
    console.log('AuthController::authenticate() - Enter');

    const { email, password } = req.body;
    if (!(await checkPassword(email, password)))
      return res.status(400).json({ error: 'wrong password' });

    const token = createJWT(email);
    return res
      .status(200)
      .json({ message: 'User registered authenticated', token: token });
  }

  @Get('test-token')
  @Middleware([validateJWT])
  tokenTest(req: Request, res: Response) {
    console.log('AuthController::tokenTest() - Enter');
    return res.status(200).json({ message: 'valid token' });
  }
}

const hashUserPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 128, 'sha512')
    .toString('hex');
  return { salt, hash };
};

const checkPassword = async (email: string, password: string) => {
  const user = (await ChuckUser.findOne({ where: { email: email } }))
    ?.dataValues;

  const inputHash = crypto
    .pbkdf2Sync(password, user?.salt, 1000, 128, 'sha512')
    .toString('hex');

  return inputHash === user?.password;
};

const createJWT = (user: string) => {
  // TODO: could expand with refresh token...

  // note: if/when expanding the payload -> update JwtPayload interface
  const token = jwt.sign(
    { name: user },
    process.env.JWT_SECRET ? process.env.JWT_SECRET : 'super-secret-key',
    { expiresIn: '1h' }
  );
  return token;
};
