import {PollutionApi} from "./pollutionApi";
# openweathermap-client

A typescript OpenWeatherMap client

## Example

```typescript
import axios from "axios";
import {CurrentWeatherApi, PollutionApi} from '@curium.rocks/openweathermap-client';

const apiToken = process.env.OWM_TOKEN;
const currentApi = new CurrentWeatherApi(axios);

const currentWeather = await currentApi.getCurrentWeather({
    appid: apiToken,
    city: 'London'
});

console.log('The current weather in London: ', currentWeather);

const currentWeatherNearArea = await currentApi.getCurrentWeatherNearby({
    appid: apiToken,
    lat: 29.422789,
    lon: -98.507065,
    cnt: 50
});

console.log('The current weather for areas nearby: ', currentWeatherNearArea);

const currentWeatherInRegion = await currentApi.getCurrentWeatherForArea({
    appid: apiToken,
    bbox: [
        {
            lat: 41.76106,
            lon: -89.45617,
        },
        {
            lat: 42.69255,
            lon: -85.94055
        }
    ]
});

console.log('The current weather data for the bounding area: ', currentWeatherInRegion);

const pollutionApi = new PollutionApi(axios);

const currentPollution = pollutionApi.getCurrentAirPollution({
    appid: apiToken,
    lat: 41.76106,
    lon: -85.94055
});
console.log('The current pollution levels: ', currentPollution);

const forecastedPollution = await pollutionApi.getForecastedAirPollution({
    appid: apiToken,
    lat: 41.76106,
    lon: -85.94055
});
console.log('The forecasted air pollution levels: ', forecastedPollution);

const historicalPollution = await pollutionApi({
    lat: 41.76106,
    lon: -85.94055,
    start: new Date(new Date().getDate()-1),
    end: new Date(),
    appid: apiToken
});
console.log('The pollution levels for the past day: ', historicalPollution);
```