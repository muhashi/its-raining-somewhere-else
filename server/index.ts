import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { getRainingCity, CityReturnData } from './generateRainingCity.js';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const ONE_HOUR = 1000 * 60 * 60;

let memoizedCountryData: CityReturnData | null = null;
getRainingCity().then((data) => memoizedCountryData = data);


app.use(cors({
  origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "*",
}));

setInterval(() => {
  getRainingCity().then((data) => memoizedCountryData = data);
}, ONE_HOUR);

app.get('/', (req, res) => {
  res.json(memoizedCountryData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
