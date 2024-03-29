# openweathermap-client

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=curium-rocks_openweathermap-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=curium-rocks_openweathermap-client) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=curium-rocks_openweathermap-client&metric=security_rating)](https://sonarcloud.io/dashboard?id=curium-rocks_openweathermap-client)[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=curium-rocks_openweathermap-client&metric=coverage)](https://sonarcloud.io/dashboard?id=curium-rocks_openweathermap-client)


A typescript OpenWeatherMap client, [API docs located here](https://openweathermap.org/api).

APIs supported.
- OneCall
- Pollution
- CurrentWeather

API documentation for this library can be found [here](https://curium-rocks.github.io/openweathermap-client/)

## Example(s)

```typescript
import axios from "axios";
import {OwmClient} from '@curium.rocks/openweathermap-client';

const apiToken = process.env.OWM_TOKEN;
const owmClient = new OwmClient(axios);

const currentWeather = await owmClient.current.getCurrentWeather({
    appid: apiToken,
    city: 'London'
});

console.log('The current weather in London: ', currentWeather);

const currentWeatherNearArea = await owmClient.current.getCurrentWeatherNearby({
    appid: apiToken,
    lat: 29.422789,
    lon: -98.507065,
    cnt: 50
});

console.log('The current weather for areas nearby: ', currentWeatherNearArea);

const currentWeatherInRegion = await owmClient.current.getCurrentWeatherForArea({
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

const currentPollution = owmClient.pollution.getCurrentAirPollution({
    appid: apiToken,
    lat: 41.76106,
    lon: -85.94055
});
console.log('The current pollution levels: ', currentPollution);

const forecastedPollution = await owmClient.pollution.getForecastedAirPollution({
    appid: apiToken,
    lat: 41.76106,
    lon: -85.94055
});
console.log('The forecasted air pollution levels: ', forecastedPollution);

const historicalPollution = await owmClient.pollution.getHistoricalAirPollution({
    lat: 41.76106,
    lon: -85.94055,
    start: new Date(new Date().getDate()-1),
    end: new Date(),
    appid: apiToken
});
console.log('The pollution levels for the past day: ', historicalPollution);

const allInOne = await owmClient.onecall.getDate({
    lat: 41.76106,
    lon: -85.94055,
    appid: apiToken
});
console.log('The combined summary data is: ', allInOne);
```
