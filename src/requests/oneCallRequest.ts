export interface OneCallRequest {
    appid: string;
    lat: number;
    lon: number;
    units?: string;
    lang?: string;
    exclude?: Array<string>;
}
