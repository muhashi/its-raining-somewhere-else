import cities from 'cities.json' assert { type: "json" };
import arrayShuffle from 'array-shuffle';
import {setTimeout} from 'node:timers/promises';
import got from 'got';

const MAX_NUMBER_CITIES = 400;
const delayMs = 200;

type CityData = {
    lat: string,
    lng: string,
    name: string,
    country: string,
}

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

export async function getRainingCity(): Promise<object | null> {
    const randomCities = arrayShuffle(cities as readonly CityData[]);
    const maxLength = Math.min(MAX_NUMBER_CITIES, randomCities.length);

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

        if (currentRain > 0) {
            return {rainMm: currentRain, ...randomCities[i]};
        }

        await setTimeout(delayMs);
    }

    return null;
}
