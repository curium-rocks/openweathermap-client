# openweathermap-client

A typescript OpenWeatherMap client

## Example

```typescript
import 'axios';
import {CurrentWeatherApi} from '@curium.rocks/openweathermap-client';

const apiToken = process.env.OWM_TOKEN;
const currentApi = new CurrentWeatherApi(axios);

const currentWeather = await currentApi.getCurrentWeather({
    appid: apiToken,
    city: 'London'
});

console.log('The current weather in London: ', currentWeather);

const currentWeatherNearArea = currentApi.getCurrentWeatherNearby({
    appid: apiToken,
    lat:29.422789,
    lon:-98.507065,
    cnt: 50
});

console.log('The current weather for areas nearby: ', currentWeatherNearArea);

const currentWeatherInRegion = urrentApi.getCurrentWeatherForArea({
    appid: apiToken,
    bbox: [
        {
            lat: 41.76106872528616,
            lon: -89.4561767578125,
        },
        {
            lat: 42.69252994883861,
            lon: -85.9405517578125
        }
    ]
});

console.log('The current weather data for the bounding area: ', currentWeatherInRegion);
```