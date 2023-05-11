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

describe('GET /api/music/play/:id', function(){
    it('success', function(done){
        chai.request(url)
            .get('/api/music/play/1974443814')
            .end(function(err, res) {
                if (err) {
                    console.log(err)
                }
                expect(res.status).to.equal(200);
                done();
            });
    });
})

describe('GET /api/music/image/:id', function(){
    it('success', function(done){
        chai.request(url)
            .get('/api/music/image/1974443814')
            .end(function(err, res) {
                if (err) {
                    console.log(err)
                }
                expect(res.status).to.equal(200);
                done();
            });
    });
})

describe('GET /api/music/lyric/:id', function(){
    it('success', function(done){
        chai.request(url)
            .get('/api/music/lyric/1974443814')
            .end(function(err, res) {
                if (err) {
                    console.log(err)
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body).to.have.deep.property('data');
                done();
            });
    });
})

describe('GET /api/music/detail/:id', function(){
    it('success', function(){
        chai.request(url)
            .get('/api/music/detail/1974443814')
            .timeout(10000)
            .end(function(err, res) {
                if (err) {
                    console.log(err)
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body).to.have.deep.property('data');
                expect(res.body.data).to.have.deep.property('name');
                expect(res.body.data).to.have.deep.property('singer');
                expect(res.body.data.singer).to.be.an('array');
                res.body.data.singer.forEach((singer) => {
                    expect(singer).to.have.deep.property('name');
                    expect(singer).to.have.deep.property('id');
                    expect(singer).to.have.deep.property('tns');
                    expect(singer).to.have.deep.property('alias');
                })
                expect(res.body.data).to.have.deep.property('album');
                expect(res.body.data.album).to.have.deep.property('id');
                expect(res.body.data.album).to.have.deep.property('name');
                expect(res.body.data.album).to.have.deep.property('picUrl');
                expect(res.body.data.album).to.have.deep.property('tns');
                expect(res.body.data.album.tns).to.be.an('array');
                expect(res.body.data.album).to.have.deep.property('pic_str');
                expect(res.body.data.album).to.have.deep.property('pic');

            });
    });
})