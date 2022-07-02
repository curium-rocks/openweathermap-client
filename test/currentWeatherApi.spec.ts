import { describe, it} from 'mocha';
import { should } from 'chai';
import { CurrentWeatherApi } from '../src/currentWeatherApi';
import axios from 'axios';
import {CityWeather} from "../src/models/cityWeather";

describe( 'CurrentWeatherAPI', function() {
    const apiToken = process.env.OWM_TOKEN as string;
    const runPremiumTests = process.env.OWM_PREMIUM_TESTS === 'true';
    const basicAsserts = (resp:CityWeather) => {
        should().exist(resp);
        should().exist(resp.coord);
        should().exist(resp.id);
        should().exist(resp.clouds);
        should().exist(resp.dt);
        should().exist(resp.main);
        should().exist(resp.name);
        should().exist(resp.wind);
    };
    describe( 'getCurrentWeather()', function() {
        if (runPremiumTests) {
            it( 'Should provide information with just city', function() {
                const currentApi = new CurrentWeatherApi(axios);
                return currentApi.getCurrentWeather({
                    appid: apiToken,
                    city: 'San Antonio'
                }).then((resp)=>{
                    basicAsserts(resp);
                });
            });
            it('Should allow searching with city and zip', function() {
                const currentApi = new CurrentWeatherApi(axios);
                return currentApi.getCurrentWeather({
                    appid: apiToken,
                    city: 'San Antonio',
                    zip: '78245'
                }).then((resp)=>{
                    basicAsserts(resp);
                })
            });
            it('Should allow searching with city, zip and country code', function() {
                const currentApi = new CurrentWeatherApi(axios);
                return currentApi.getCurrentWeather({
                    appid: apiToken,
                    city: 'San Antonio',
                    zip: '78245',
                    countryCode: 'US'
                }).then((resp)=>{
                    basicAsserts(resp);
                })
            });
            it('Should allow fetching by id', function() {
                const currentApi = new CurrentWeatherApi(axios);
                return currentApi.getCurrentWeather({
                    appid: apiToken,
                    id: 3872395
                }).then((resp)=>{
                    basicAsserts(resp);
                });
            });
            it('Should allow fetching by lat and long', function() {
                const currentApi = new CurrentWeatherApi(axios);
                return currentApi.getCurrentWeather({
                    appid: apiToken,
                    lat:29.422789,
                    lon:-98.507065
                }).then((resp)=>{
                    basicAsserts(resp);
                });
            });
            it('Should allow changing unit type', function() {
                const currentApi = new CurrentWeatherApi(axios);
                return currentApi.getCurrentWeather({
                    appid: apiToken,
                    city: 'San Antonio',
                    units: 'metric'
                }).then((resp)=>{
                    basicAsserts(resp);
                })
            });
            it('Should allow changing lang', function() {
                const currentApi = new CurrentWeatherApi(axios);
                return currentApi.getCurrentWeather({
                    appid: apiToken,
                    city: 'San Antonio',
                    lang: 'it'
                }).then((resp)=>{
                    basicAsserts(resp);
                })
            });
        }
    });
    describe('getCurrentWeatherForArea()', function(){
        if (runPremiumTests) {
            it('Should provide weather for bounding area', function(){
                const currentApi = new CurrentWeatherApi(axios);
                return currentApi.getCurrentWeatherForArea({
                    appid: apiToken,
                    bbox: [
                        {
                            lat: 41.76106872528616,
                            lon: -89.4561767578125,
                        },
                        {
                            lat: 42.69252994883861,
                            lon: -85.9405517578125
                        }
                    ]
                }).then((resp)=>{
                    resp.list.forEach(basicAsserts);
                })
            });
        }
    });
    describe('getCurrentWeatherNearby()', function(){
        if(runPremiumTests) {
            it('Should provide weather for things near the point', function(){
                const currentApi = new CurrentWeatherApi(axios);
                return currentApi.getCurrentWeatherNearby({
                    appid: apiToken,
                    lat:29.422789,
                    lon:-98.507065,
                    cnt: 50
                }).then((resp)=>{
                    resp.list.forEach(basicAsserts);
                })
            });
        }
    });
});