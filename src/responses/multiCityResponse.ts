import { CityWeather } from '../models/cityWeather'

export interface MultiCityResponse {
    list: Array<CityWeather>;
    message: string;
    cod: string;
    count: number
}
