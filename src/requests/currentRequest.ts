import {Coordinate} from "../models/coordinate";

export interface CurrentRequest {
    appid: string;
    city?: string;
    zip?: string;
    countryCode?: string;
    lang?: string;
    units?: string;
    id?: number,
    lat?: number,
    lon?: number
}

export interface CurrentNearbyRequest {
    appid: string;
    lat: number;
    lon: number;
    cnt: number;
}

export interface CurrentBoundingRequest {
    appid: string;
    bbox: Array<Coordinate>;
}