import * as dotenv from 'dotenv';
import { JokeFetcherApp } from './chuck-norris-api';

dotenv.config();

const chuckNorrisApi = new JokeFetcherApp();
chuckNorrisApi.start(3000);
