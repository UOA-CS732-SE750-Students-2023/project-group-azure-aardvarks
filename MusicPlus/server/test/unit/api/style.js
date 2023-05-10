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


describe('getStyleSongs function', function() {
    it('success', async function() {
         await getStyleSongs(1010)
    })
})

describe('GET /api/style/allStyle', function() {
    it('success', function(done){
        chai.request(url)
            .get('/api/style/allStyle')
            .end(function(err, res) {
                if (err) {
                    console.log(err)
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.be.an('array');
                res.body.data.forEach(item => {
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('enName');
                    item.childStyle.forEach(child => {
                        expect(child).to.have.property('name');
                        expect(child).to.have.property('id');
                        expect(child).to.have.property('enName');
                        expect(child).to.have.property('picUrl');
                    })
                });
                done();
            });
    })
})

describe('GET /api/style/songs/:id', function() {
    it('success', function(done){
        chai.request(url)
            .get('/api/style/songs/1010')
            .end(function(err, res) {
                if (err){
                    console.log(err)
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.be.an('array');
                done();
            })
    })
})

describe('GET /api/style/preference', function() {
    it('success', function(done){
        chai.request(url)
            .get('/api/style/preference')
            .auth(fakeUser.username, fakeUser.password, {type: 'basic'})
            .end(function(err, res) {
                if (err){
                    console.log(err)
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.have.property('_id');
                expect(res.body.data).to.have.property('name');
                expect(res.body.data).to.have.property('private');
                expect(res.body.data.songs).to.be.an('array');
                expect(res.body.data).to.have.property('createAt');
                expect(res.body.data).to.have.property('updatedAt');
                expect(res.body.data.owner).to.have.property('_id');
                expect(res.body.data.owner).to.have.property('username');
                expect(res.body.data.owner).to.have.property('email');
                expect(res.body.data.owner).to.have.property('favoriteMusic');
                expect(res.body.data.owner.favoritePlayList).to.be.an('array');
                expect(res.body.data.owner.musicGenre).to.be.an('array');

                done();
            });
    });
});


describe('POST /api/style/setPreference/:id', function() {
    it('success', function(done){
        chai.request(url)
            .post('/api/style/setPreference/1108')
            .auth(fakeUser.username, fakeUser.password, {type: 'basic'})
            .end(function(err, res) {
                if(err){
                    console.log(err)
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.have.property('_id');
                expect(res.body.data).to.have.deep.property('username', user.data.data.username);
                expect(res.body.data).to.have.deep.property('password', user.data.data.password);
                expect(res.body.data).to.have.deep.property('email', user.data.data.email);
                expect(res.body.data).to.have.deep.property('lastName',user.data.data.lastName);
                expect(res.body.data).to.have.deep.property('firstName',user.data.data.firstName);
                expect(res.body.data.favoritePlayList).to.be.an('array');
                expect(res.body.data).property('favoriteMusic');
                expect(res.body.data).property('createdAt');
                expect(res.body.data).property('updatedAt');
                expect(res.body.data).to.have.property('address');
                expect(res.body.data).to.have.property('musicGenre');
                done();
            })
    })
})