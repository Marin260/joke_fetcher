import { Server } from '@overnightjs/core';
import { json } from 'express';
import * as routes from './routes';
import { db } from './../database-entities';

export class JokeFetcherApp extends Server {
  constructor() {
    super();
    this.app.use(json());
    this.addControllers(Object.values(routes).map((Route) => new Route()));
  }

  public async start(port: number) {
    console.log('JokeFetcherApp::start() - starting the app');
    db();

    this.app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  }
}
