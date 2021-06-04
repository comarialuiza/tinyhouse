import express from 'express';
import { listings } from './listings';

const app = express();
const port = 9000;

app.get('/', (_req, res) => res.send(listings));

app.listen(port);
console.log('i am running!');