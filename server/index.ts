import express from 'express';
import memoize from 'memoizee';
import { getRainingCity } from './generateRainingCity.js';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const memoizedGetRainingCity = memoize(getRainingCity, {promise: true, maxAge: 60 * 60 * 1000});

app.get('/', async (req, res) => {
  const countryData = await memoizedGetRainingCity();

  res.json(countryData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
