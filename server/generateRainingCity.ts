import arrayShuffle from 'array-shuffle';
import cities from 'cities.json' assert { type: "json" };
import got from 'got';
import { setTimeout } from 'node:timers/promises';

const MAX_NUMBER_CITIES = 400;
const MIN_RAIN_MM = 2;
const delayMs = 200;

type CityData = {
    lat: string,
    lng: string,
    name: string,
    country: string,
}

export type CityReturnData = CityData & { rainMm: number };

type RainData = {
    hourly: {
        time: string[],
        rain: number[],
    },
}

// rounded down to nearest hour, slices of seconds and ms
function getCurrentISOTimeString() {
    const d = new Date();
    d.setMinutes(0, 0);
    return d.toISOString().slice(0, -8);
}

export async function getRainingCity(): Promise<CityReturnData | null> {
    const randomCities = arrayShuffle(cities as readonly CityData[]);
    const maxLength = Math.min(MAX_NUMBER_CITIES, randomCities.length);
    let currentMaxRainCity: CityReturnData | null = null;

    for (let i = 0; i < maxLength; i++) {
        const {lat, lng} = randomCities[i];

        if (!lat || !lng) continue;
        
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=rain`;

        const res: RainData = await got(url).json();
        if (!res || !res?.hourly || !res?.hourly?.rain) continue;
        const currentTime = getCurrentISOTimeString();
        const {time, rain} = res.hourly;

        const index = time.findIndex((timeString) => timeString === currentTime);

        if (index === -1 || index >= rain.length) continue;

        const currentRain = rain[index];
        const returnCityData = {rainMm: currentRain, ...randomCities[i]};

        if (currentRain >= MIN_RAIN_MM) {
            return returnCityData;
        } else if (!currentMaxRainCity || currentRain > currentMaxRainCity.rainMm) {
            currentMaxRainCity = returnCityData;
        }

        await setTimeout(delayMs);
    }

    return currentMaxRainCity;
}
