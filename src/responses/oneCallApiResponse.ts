import {Weather} from "../models/weather";

export interface OneCallApiResponse {
    lat: number;
    lon: number;
    timezone: string;
    "timezone_offset": number;
    current: CurrentWeatherOne;
    minutely: Array<MinuteForecast>;
    hourly: Array<HourlyForecast>;
    daily: Array<DailyForecast>;
    alerts?: Array<Alert>;
}
export interface Alert {
    "sender_name": string;
    event: string;
    start: number;
    end: number;
    description: string;
}
export interface TempForecast {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}
export interface FeelsLikeForecast {
    day: number,
    night: number,
    eve: number,
    morn: number
}
export interface MinuteForecast {
    dt: number;
    precipitation: number;
}

export interface BaseForecast {
    dt: number;
    pressure: number;
    humidity: number;
    "dew_point": number;
    uvi: number;
    clouds: number;
    visibility: number;
    "wind_speed": number;
    "wind_deg": number;
    "wind_gust": number;
    weather: Array<Weather>;
    pop: number;
}

export interface HourlyForecast extends BaseForecast {
    temp: number;
    "feels_like": number;
}
export interface DailyForecast extends BaseForecast {
    rain: number;
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    "moon_phase": number;
    temp: TempForecast;
    "feels_like": FeelsLikeForecast;

}
export interface Precipitation {
    "1h": number;
}
export interface CurrentWeatherOne {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    "feels_like": number;
    pressure: number;
    humidity: number;
    "dew_point": number;
    uvi: number;
    clouds: number;
    visibility: number;
    "wind_speed": number;
    "wind_deg": number;
    "weather": Array<Weather>;
    rain?: Precipitation;
    snow?: Precipitation;
}