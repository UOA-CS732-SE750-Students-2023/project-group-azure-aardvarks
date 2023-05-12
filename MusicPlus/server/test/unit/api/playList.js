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
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${fakeUser.username}:${fakeUser.password}`)
    }
})

describe('GET /api/random/:num', function() {
    it('success', function(done){
        const num = 5
        chai.request(url)
            .get(`/api/random/${num}`)
            .end(function(err, res) {
                if (err){
                    console.log(err)
                    done()
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.be.an('array');
                expect(res.body.data.length).to.equal(num);
                res.body.data.forEach(item => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('owner');
                    expect(item.owner).to.have.property('createdAt');
                    expect(item.owner).to.have.property('updatedAt');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                })
                done()
            })
    })
})



describe('GET /api/playList/allPlayList', function() {
    it('get all play list', function(done){
        chai.request(url)
            .get(`/api/playList/allPlayList`)
            .end(function(err, res) {
                if (err){
                    console.log(err)
                    done()
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('array');
                res.body.data.forEach(item => {
                    expect(item).to.have.property('_id');
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('songs');
                    expect(item).to.have.property('owner');
                    expect(item).to.have.property('cover');
                })
                done()
            })
    })
})


describe('GET /api/playList/randomEnglish', function() {
    it('randomEnglishRecommedation', function(done){
        chai.request(url)
            .get(`/api/playList/randomEnglish`)
            .end(function(err, res) {
                if (err){
                    console.log(err)
                    done()
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body).to.have.property('data');
                
                res.body.data.data.forEach(item => {
                    expect(item).to.have.property('albums');
                    const album = item
                    album.forEach(x=>{
                        expect(x).to.have.property('songs');
                        expect(x).to.have.property('onSale');
                        expect(x).to.have.property('paid');
                        expect(x).to.have.property('mark');
                        expect(x).to.have.property('awardTags');
                        expect(x).to.have.property('companyId');
                    })
                })
                done()
            })
    })
})



