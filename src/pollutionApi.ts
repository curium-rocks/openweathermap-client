import {AxiosInstance} from "axios";
import {AirPollutionRequest} from "./requests/airPollutionRequest";
import {AirPollutionResponse} from "./responses/airPollutionResponse";
import {start} from "repl";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/air_pollution/forecast';
const HISTORY_URL = 'https://api.openweathermap.org/data/2.5/air_pollution/history'


/**
 * A client of https://openweathermap.org/api/air-pollution
 */
export class PollutionApi {

    /**
     *
     * @param {AxiosInstance} httpClient
     */
    constructor(private httpClient: AxiosInstance) {}

    /**
     *
     * @param {AirPollutionRequest} request
     * @public
     * @return {Promise<AirPollutionResponse>}
     */
    async getCurrentAirPollution(request: AirPollutionRequest) : Promise<AirPollutionResponse> {
        const resp = await this.httpClient.get(BASE_URL, {
            params: {
                lat: request.lat,
                lon: request.lon,
                appid: request.appid
            }
        });
        return resp.data as AirPollutionResponse;
    }

    /**
     *
     * @param {AirPollutionRequest} request
     * @return {Promise<AirPollutionResponse>}
     */
    async getForecastedAirPollution(request: AirPollutionRequest) : Promise<AirPollutionResponse> {
        const resp = await this.httpClient.get(FORECAST_URL, {
            params: {
                lat: request.lat,
                lon: request.lon,
                appid: request.appid
            }
        });
        return resp.data as AirPollutionResponse;
    }

    /**
     *
     * @param {AirPollutionRequest} request
     * @return {Promise<AirPollutionResponse>}
     */
    async getHistoricalAirPollution(request: AirPollutionRequest): Promise<AirPollutionResponse> {
        const resp = await this.httpClient.get(HISTORY_URL, {
            params: {
                lat: request.lat,
                lon: request.lon,
                appid: request.appid,
                start: Math.floor(((request.start as Date).getTime() / 1000)),
                end: Math.floor(((request.end as Date).getTime() / 1000))
            }
        });
        return resp.data as AirPollutionResponse;
    }

}