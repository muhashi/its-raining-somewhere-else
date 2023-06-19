import express from 'express';
import {getRainingCity} from './generateRainingCity.js';
import memoize from 'memoizee';

const app = express();
const port = process.env.PORT ?? 300w0;

const memoizedGetRainingCity = memoize(getRainingCity, {promise: true, maxAge: 60 * 60 * 1000});

app.get('/', async (req, res) => {
  const countryData = await memoizedGetRainingCity();

  res.json(countryData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
