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
