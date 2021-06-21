import {AxiosInstance} from "axios";
import {PollutionApi} from "./pollutionApi";
import {CurrentWeatherApi} from "./currentWeatherApi";
import {OneCallApi} from "./oneCallApi";

/**
 * General OwmClient that contains all of the sub API clients
 */
export class OwmClient {

    public readonly pollution: PollutionApi;
    public readonly current: CurrentWeatherApi;
    public readonly onecall: OneCallApi;

    /**
     *
     * @param {AxiosInstance} httpClient
     */
    constructor(private httpClient: AxiosInstance) {
        this.pollution = new PollutionApi(httpClient);
        this.current = new CurrentWeatherApi(httpClient);
        this.onecall = new OneCallApi(httpClient);
    }
}