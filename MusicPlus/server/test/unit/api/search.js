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

describe('GET /search/search/:id/:pagenum/:pagesize', function (){
    it('success', function(done){
        const keyword = "linken_park"
        const pagenum = 0
        const pagesize = 10
        chai.request(url)
            .get(`/api/search/search/${keyword}/${pagenum}/${pagesize}`)
            .end(function(err, res) {
                if(err){
                    console.log(err)
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.have.deep.property('song');
                expect(res.body.data.song).to.be.an('array');
                res.body.data.song.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('artists');
                    expect(item.artists).to.be.an('array');
                    item.artists.forEach((artist) => {
                        expect(artist).to.have.property('id');
                        expect(artist).to.have.property('name');
                    })
                })
                expect(res.body.data).to.have.property('singer');
                expect(res.body.data.singer).to.be.an('array');
                res.body.data.singer.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('picUrl');
                })
                expect(res.body.data).to.have.property('album');
                expect(res.body.data.album).to.be.an('array');
                res.body.data.album.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('picUrl');
                    expect(item).to.have.property('artist');
                    expect(item.artist).to.have.property('id');
                    expect(item.artist).to.have.property('name');
                    expect(item).to.have.property('picUrl');
                })
                done()
            })
    })
})

describe('GET /search/similarSongs/:id', function (){
    it('success', function(done){
        const id = 1974443814
        chai.request(url)
            .get(`/api/search/similarSongs/${id}`)
            .end(function(err, res) {
                if(err){
                    console.log(err)
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.have.property('song');
                expect(res.body.data.song).to.be.an('array');
                res.body.data.song.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('artists');
                    expect(item).to.have.property('picUrl');
                    expect(item.artists).to.be.an('array');
                    item.artists.forEach((artist) => {
                        expect(artist).to.have.property('id');
                        expect(artist).to.have.property('name');
                    })
                    expect(item).to.have.property('album');
                    expect(item.album).to.have.property('id');
                    expect(item.album).to.have.property('name');
                })
                done()
            })
    })
})

describe('GET /api/search', function (){
it('success', function(){
        const keyword = "linken_park"
        chai.request(url)
            .get(`/api/search/`)
            .send({keyword: keyword})
            .timeout(5000)
            .end(function(err, res) {
                if(err){
                    console.log(err)
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.have.deep.property('song');
                expect(res.body.data.song).to.be.an('array');
                res.body.data.song.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('artists');
                    expect(item.artists).to.be.an('array');
                    item.artists.forEach((artist) => {
                        expect(artist).to.have.property('id');
                        expect(artist).to.have.property('name');
                    })
                })
                expect(res.body.data).to.have.property('singer');
                expect(res.body.data.singer).to.be.an('array');
                res.body.data.singer.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('picUrl');
                })
                expect(res.body.data).to.have.property('album');
                expect(res.body.data.album).to.be.an('array');
                res.body.data.album.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('picUrl');
                    expect(item).to.have.property('artist');
                    expect(item.artist).to.have.property('id');
                    expect(item.artist).to.have.property('name');
                    expect(item).to.have.property('picUrl');
                })
            })
    })
})