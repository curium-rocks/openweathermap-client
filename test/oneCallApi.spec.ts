import { describe, it} from 'mocha';
import { expect } from 'chai';
import {OneCallApi} from "../src/oneCallApi";
import axios from 'axios';

describe( 'OneCallApi', function() {
    const apiToken = process.env.OWM_TOKEN as string;

    describe( 'getData()', function() {
        it( 'Should provide data', function() {
            const client = new OneCallApi(axios);
            client.getData({
                appid: apiToken,
                lat: 29.422789,
                lon: -98.507065
            }).then((resp)=>{
                expect(resp).exist;
            })
        });
    });
});