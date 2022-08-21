export interface AirPollutionRequest {
    appid: string;
    lat: number;
    lon: number;
    start?: Date,
    end?: Date
}
