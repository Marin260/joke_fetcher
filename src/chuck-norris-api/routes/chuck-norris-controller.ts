import { Controller, Get, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';

import { EmailPayload, EmailService } from '../services/email-service';
import { validateJWT } from '../middleware/jwt-check';
import { db } from './../../database-entities';

@Controller('chuck-norris')
export class ChuckNorrisController {
  @Get('')
  @Middleware([validateJWT])
  async get(req: Request, res: Response) {
    console.log('ChuckNorrisController::get() - Enter');
    const { authenticatedUser } = req.body;

    // fetch joke
    const fetchChuckNorrisJoke = await fetch(
      'https://api.chucknorris.io/jokes/random'
    );
    const joke = await fetchChuckNorrisJoke.json();

    // sending an email to the registered user
    const emailService = new EmailService();
    await emailService.sendEmail(authenticatedUser, {
      text: joke.value,
      html: `<p>${joke.value}</p>`,
    } as EmailPayload);

    return res
      .status(200)
      .json({ message: 'A new joke has been sent to your email' });
  }

  @Get('health-check')
  async test(req: Request, res: Response) {
    console.log('ChuckNorrisController::test() - Enter');
    // db health-check
    await db().authenticate();

    // perform other checks if needed...

    return res.status(200).json({ message: 'Everything up and running...' });
  }
}
