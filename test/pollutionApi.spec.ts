import { describe, it} from 'mocha';
import { should } from 'chai';
import {PollutionApi} from "../src/pollutionApi";
import axios from "axios";

describe( 'PollutionApi', function() {
    const apiToken = process.env.OWM_TOKEN as string;
    this.timeout(30000);
    describe( 'getCurrentAirPollution()', function() {
        it( 'Should provide pollution levels', function() {
            const api = new PollutionApi(axios);
            return api.getCurrentAirPollution({
                lat: 29.422789,
                lon: -98.507065,
                appid: apiToken
            }).then((res) => {
                should().exist(res.coord);
                should().equal(res.coord.lat, 29.4228);
                should().equal(res.coord.lon, -98.5071);
                should().exist(res.list);
            });
        });
    });
    describe('getForecastedAirPollution()', function() {
        it('Should provide a forecast', function() {
            const api = new PollutionApi(axios);
            return api.getForecastedAirPollution({
                lat: 29.422789,
                lon: -98.507065,
                appid: apiToken
            }).then((res) => {
                should().exist(res.coord);
                should().equal(res.coord.lat, 29.4228);
                should().equal(res.coord.lon, -98.5071);
                should().exist(res.list);
            });
        });
    });
    describe('getHistoricalAirPollution()', function() {
        it( 'Should provide data', function() {
            // eslint-disable-next-line no-invalid-this
            const api = new PollutionApi(axios);
            return api.getHistoricalAirPollution({
                lat: 29.422789,
                lon: -98.507065,
                start: new Date(new Date().getDate()-1),
                end: new Date(),
                appid: apiToken
            }).then((res) => {
                should().exist(res.coord);
                should().equal(res.coord.lat, 29.4228);
                should().equal(res.coord.lon, -98.5071);
                should().exist(res.list);
            });
        });
    });
});