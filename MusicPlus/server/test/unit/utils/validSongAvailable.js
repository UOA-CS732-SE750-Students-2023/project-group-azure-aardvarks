import * as assert from "assert";
import {formatDateTime} from "../../../src/utils/commonUtils.js";
import vaildSongAvailable from "../../../src/utils/vaildSongAvailable.js";
import * as dotenv from 'dotenv';
import * as request from 'supertest'

dotenv.config()
describe('Available song check', async function() {
    it('invalid song', async function() {
        assert.equal(
            await vaildSongAvailable(6731),
            "Song ID Error!"
        );
    });
    it('valid song', async function() {
        assert.equal(
            await vaildSongAvailable(33894312),
            true
        );
    });
});