import { describe, it} from 'mocha';
import { expect } from 'chai';
import {OwmClient} from "../src/owmClient";
import axios from 'axios';
import {CurrentWeatherApi} from "../src/currentWeatherApi";
import {PollutionApi} from "../src/pollutionApi";

describe( 'OwmClient', function() {
    const api = new OwmClient(axios);

    it( 'Should have a pollution API', function() {
        expect(api.pollution).to.not.be.null;
        expect(api.pollution).to.be.instanceof(PollutionApi);
    });
    it( 'Should have a current weather API', function() {
        expect(api.current).to.not.be.null;
        expect(api.current).to.be.instanceof(CurrentWeatherApi);
    })
});