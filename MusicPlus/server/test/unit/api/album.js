import * as dotenv from 'dotenv';
import {imgBLOB} from "../../fakeData/img.js";
import * as request from 'supertest'
import chai from 'chai';
import chaiHttp from "chai-http";
import axios from "axios";
import * as assert from "assert";
import {getStyleSongs} from "../../../src/routes/api/style.js";

chai.use(chaiHttp);
dotenv.config()

const expect = chai.expect;

const fakeUser = {
    username: 'testuser',
    email: 'testemail@example.com',
    password: 'testpassword'
    // "avatar": imgBLOB
}

const url = 'http://127.0.0.1:3000'
const user = await axios.get(url + '/api/user/logIn', {
    headers: {
        'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
        'Authorization': 'Basic ' + btoa(`${fakeUser.username}:${fakeUser.password}`)
    }
})

describe('GET /api/album/:id', function() {
    it('success', function(done){
        const id = 150127127
        chai.request(url)
            .get(`/api/album/${id}`)
            .end(function(err, res) {
                if (err){
                    console.log(err)
                    done()
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data.album).to.have.deep.property('id');
                expect(res.body.data.album).to.have.deep.property('name');
                expect(res.body.data.album).to.have.deep.property('picUrl');
                expect(res.body.data.album).to.have.deep.property('size');
                expect(res.body.data.album).to.have.deep.property('artist');
                expect(res.body.data.album.artist).to.have.deep.property('name');
                expect(res.body.data.album.artist).to.have.deep.property('id');
                expect(res.body.data.album.artist).to.have.deep.property('picUrl');
                expect(res.body.data.songs).to.be.an('array');
                res.body.data.songs.forEach(item => {
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('artists');
                    expect(item.artists).to.be.an('array');
                    item.artists.forEach(artist => {
                        expect(artist).to.have.property('name');
                        expect(artist).to.have.property('id');
                    })
                })
                done()
            })
    })
})