import {AxiosInstance} from 'axios';
import {CityWeather} from "./models/cityWeather";
import {CurrentBoundingRequest, CurrentNearbyRequest, CurrentRequest} from "./requests/currentRequest";
import {MultiCityResponse} from "./responses/multiCityResponse";


const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const BBOX_URL = 'https://api.openweathermap.org/data/2.5/box/city';
const CIRCLE_URL = 'https://api.openweathermap.org/data/2.5/find';


/**
 * A client of https://openweathermap.org/current#cities 
 */
export class CurrentWeatherApi {
    /**
     * 
     * @param {AxiosInstance} httpClient 
     */
    constructor(private httpClient:AxiosInstance) {

    }

    /**
     *
     * @param {CurrentRequest} req
     * @private
     * @return {string}
     */
    private static buildQuery(req: CurrentRequest): string|undefined {
        if(req.zip == null && req.countryCode == null && req.city == null) return undefined;
        let query = req.city;
        if (req.zip) query += `,${req.zip}`;
        if (req.countryCode) query += `,${req.countryCode}`;
        return query;
    }

    /**
     *
     * @param {any} currentRequest
     * @private
     * @return {unknown}
     */
    private static buildParams(currentRequest: CurrentRequest) : unknown {
        return {
            units: currentRequest.units,
            lang: currentRequest.lang,
            lat: currentRequest.lat,
            lon: currentRequest.lon,
            q: CurrentWeatherApi.buildQuery(currentRequest),
            appid: currentRequest.appid,
            id: currentRequest.id
        };
    }

    /**
     *
     * @param {CurrentBoundingRequest} request
     * @private
     * @return {unknkown}
     */
    private static buildBboxParams(request: CurrentBoundingRequest) : unknown {
        return {
            appid: request.appid,
            bbox: request.bbox.map((val)=>{
                return `${val.lon},${val.lat}`;
            }).reduce((acc, cur)=>{
                if(acc != null) acc += ',';
                acc += cur;
                return acc;
            }),
            zoom: 10
        }
    }

    /**
     *
     * @param {CurrentNearbyRequest} request
     * @private
     * @return {unknown}
     */
    private static buildCircleParams(request: CurrentNearbyRequest) : unknown {
        return {
            appid: request.appid,
            cnt: request.cnt,
            lat: request.lat,
            lon: request.lon
        }
    }


    /**
     * Get the current weather for an area as described by the request
     * @param {CurrentRequest} request
     */
    public async getCurrentWeather(request: CurrentRequest): Promise<CityWeather> {
        const resp = await this.httpClient.get(BASE_URL, {
            params: CurrentWeatherApi.buildParams(request)
        });
        return resp.data as CityWeather;
    }


    /**
     *
     * @param {CurrentBoundingRequest} req
     * @return {Promise<CityWeather>}
     */
    public async getCurrentWeatherForArea(req:CurrentBoundingRequest) : Promise<MultiCityResponse> {
        const resp = await this.httpClient.get(BBOX_URL, {
            params: CurrentWeatherApi.buildBboxParams(req)
        });
        return resp.data as MultiCityResponse;
    }


    /**
     *
     * @param {CurrentNearbyRequest} req
     * @return {Promise<CityWeather>}
     */
    public async getCurrentWeatherNearby(req:CurrentNearbyRequest) : Promise<MultiCityResponse> {
        const resp = await this.httpClient.get(CIRCLE_URL, {
            params: CurrentWeatherApi.buildCircleParams(req)
        });
        return resp.data as MultiCityResponse;
    }


}