import { AxiosInstance } from 'axios'
import { OneCallRequest } from './requests/oneCallRequest'
import { OneCallApiResponse } from './responses/oneCallApiResponse'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'

/**
 * One call api client
 */
export class OneCallApi {
  /**
     *
     * @param {AxiosInstance} httpClient
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (private httpClient: AxiosInstance) {}

  /**
     *
     * @param {OneCallRequest}request
     * @private
     * @return {unknown}
     */
  private buildParams (request : OneCallRequest) : unknown {
    const exclude = request.exclude
      ? request.exclude.reduce((acc:string, cur:string) => {
        if (acc != null) acc += ','
        acc += cur
        return acc
      })
      : undefined
    return {
      lat: request.lat,
      lon: request.lon,
      appid: request.appid,
      units: request.units,
      lang: request.lang,
      exclude
    }
  }

  /**
     *
     * @param {OneCallRequest} request
     * @return {OneCallApiResponse}
     */
  public async getData (request: OneCallRequest) : Promise<OneCallApiResponse> {
    const resp = await this.httpClient.get(BASE_URL, {
      params: this.buildParams(request)
    })
    return resp.data as OneCallApiResponse
  }
}
