import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import * as routes from './routes';
import { db } from './../database-entities';

export class JokeFetcherApp extends Server {
  constructor() {
    super();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
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
