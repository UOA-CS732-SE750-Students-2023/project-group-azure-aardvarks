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

describe('GET /api/singer/detail/:id', function() {
    it('success', function(done){
        const id = 6452
        chai.request(url)
            .get(`/api/singer/detail/${id}`)
            .end(function(err, res) {
                if(err){
                    console.log(err)
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.have.deep.property('id', id);
                expect(res.body.data).to.have.deep.property('name');
                expect(res.body.data).to.have.property('image');
                expect(res.body.data).to.have.property('musicSize');
                expect(res.body.data).to.have.property('albumSize');
                done()
            })
    })
})

describe('GET /album/:id/:pagenum/:pagesize', function (){
    it('success', function(done){
        const id = 6452
        const pagenum = 1
        const pagesize = 10
        chai.request(url)
            .get(`/api/singer/album/${id}/${pagenum}/${pagesize}`)
            .end(function(err, res) {
                if(err){
                    console.log(err)
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.be.an('array');
                res.body.data.forEach(item => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('picUrl');
                    expect(item).to.have.property('artist');
                    expect(item).to.have.property('size');
                })
                done()
            })
    })
})

describe('GET /songs/:id/:pagenum/:pagesize', function (){
    it('success', function(done){
        const id = 6452
        const pagenum = 1
        const pagesize = 10
        chai.request(url)
            .get(`/api/singer/songs/${id}/${pagenum}/${pagesize}`)
            .end(function(err, res) {
                if (err){
                    console.log(err)
                    done()
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.be.an('array');
                res.body.data.forEach(item => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('album');
                    expect(item).to.have.property('artists');
                })
                done();
            })
    })
})